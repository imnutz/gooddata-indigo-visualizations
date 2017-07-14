import { compact, uniqBy, map, times, constant, set, sortBy } from 'lodash';

// get unique elements for given index regarding their interal id
function getElements(data, index) {
    return uniqBy(map(data.rawData, index), 'id');
}

// get series data
function getSeries(data, seriesNames, categories, indices) {
    const seriesData = seriesNames.reduce((acc, series) => {
        return set(acc, series.id, times(categories.length, constant(null)));
    }, {});

    // prepare data points
    if (indices.series !== -1) {
        if (indices.category !== -1) {
            const categoriesIndex = categories.reduce((acc, category, idx) => {
                return category ? set(acc, category.id, idx) : acc;
            }, {});

            data.rawData.forEach((dataRow) => {
                const categoryItemIndex = categoriesIndex[dataRow[indices.category].id];
                set(seriesData, [dataRow[indices.series].id, categoryItemIndex], dataRow[indices.metric]);
                set(seriesData, [dataRow[indices.series].id, categoryItemIndex, 'drillEvent'], {
                    drillContext: dataRow.slice(0, -1)
                });
            });
        } else {
            data.rawData.forEach((dataRow) => {
                set(seriesData, [dataRow[indices.series].id, 0], dataRow[indices.metric]);
                set(seriesData, [dataRow[indices.series].id, 0, 'drillEvent'], {
                    drillContext: dataRow.slice(0, -1)
                });
            });
        }
    }

    // return series in the same order as requested in seriesNames
    return seriesNames.map((name, index) => {
        return {
            name: name.value,
            legendIndex: index,
            data: seriesData[name.id]
        };
    });
}

/**
 * Get highcharts-compatible charting data from the data which
 * already passed a metricNames+metricValues transformation
 * Needs configuration for categories/series and metric values
 *
 * Input
 * Example:
 * <pre>
 *
 *   Input
 *
 *     A  metricNames metricValues
 *    ------------------------------
 *     a       M1         1111    // first metric
 *     b       M1         1112
 *     c       M1         1121
 *     a       M2         2333    // second metric
 *     b       M2         2334
 *     c       M2         2345
 *
 *   Input configuration:
 *      sort: false,
 *      indices: {
 *          categories: 0,
 *          series: 1,
 *          metric: 2
 *      }
 *
 * </pre>
 *
 * Output
 * Example:
 *      {
 *          categories: ['a', 'b', 'c'],
 *          series: [
 *              {
 *                  name: 'M1',
 *                  data: [ { y: 1111 }, { y: 1112 }, { y: 1121 } ]
 *              },
 *              {
 *                  name: 'M2',
 *                  data: [ { y: 2333 }, { y: 2334 }, { y: 2345 } ]
 *              }
 *          ]
 *      }
 * <pre>
 *
 * </pre>
 **/
export function getChartData(data, configuration) {
    const indices = configuration.indices;

    const categories = getElements(data, indices.category);
    const seriesNames = getElements(data, indices.series);

    const seriesNamesSorted = configuration.sortSeries ? sortBy(seriesNames, 'value') : seriesNames;
    const seriesNamesCompact = compact(seriesNamesSorted);

    const seriesData = getSeries(data, seriesNamesCompact, categories, indices);

    return {
        categories: map(categories, 'value'),
        series: seriesData
    };
}
