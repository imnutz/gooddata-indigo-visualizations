import React, { Component, PropTypes } from 'react';
import {
    getColumnChartData,
    getColumnChartOptions
} from './chartCreators';
import {
    getLineChartConfiguration
} from './highChartsCreators';

import ReactHighcharts from 'react-highcharts/bundle/highcharts';

export default class extends Component {
    static propTypes = {
        config: PropTypes.object.required,
        data: PropTypes.shape({
            isLoaded: PropTypes.bool.required,
            isLoading: PropTypes.bool.required,
            isLoadError: PropTypes.bool.required,
            headers: PropTypes.arrayOf(PropTypes.object),
            rawData: PropTypes.arrayOf(PropTypes.array)
        })
    };

    render() {
        let { config, data } = this.props;
        let chartOptions,
            hcOptions,
            component;
        if (config.type === 'column') {
            chartOptions = getColumnChartOptions(config, data);
            chartOptions.data = getColumnChartData(config, data);
            hcOptions = getLineChartConfiguration(chartOptions);
            component = <ReactHighcharts config={hcOptions} />;
        }
        return (<div className="indigo-component">
            <h2>Chart</h2>
            {component}
            <h2>ChartOptions</h2>
            <pre>
                {JSON.stringify(chartOptions, null, 2)}
            </pre>
            <h2>hcOptions</h2>
            <pre>
                {JSON.stringify(hcOptions, null, 2)}
            </pre>
        </div>);
    }
}
