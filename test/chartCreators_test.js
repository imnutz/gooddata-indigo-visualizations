import {
    propertiesToHeaders,
    getIndices,
    isMetricNamesInSeries,
    getLegendLayout,
    getCategoryAxisLabel,
    getMetricAxisLabel,
    showInPercent
} from '../src/chartCreators';

import {
    _transformMetrics
} from '../src/transformation';

describe('chartCreators', () => {
    let config, mockData, mockHeaders;
    beforeEach(() => {
        config = {
            type: 'column',
            x: 'healthdata_finish.aci81lMifn6q',
            y: 'metricValues',
            color: 'metricNames',
            colorPalette: [
                'rgb(00,131,255)'
            ],
            selection: null,
            visible: true,
            orderBy: [],
            where: {}
        };
        mockData = _transformMetrics({ headers: [
            {
                type: 'attrLabel',
                id: 'healthdata_finish.aci81lMifn6q',
                uri: '/gdc/md/zro9kxjp2hejksfug8qemqwx6d92c940/obj/2577',
                title: 'Quarter/Year (Health Data_finish)'
            },
            {
                type: 'metric',
                id: 'c54rxxM5coY6',
                uri: '/gdc/md/zro9kxjp2hejksfug8qemqwx6d92c940/obj/2647',
                title: 'Average kilometers',
                format: '#,##0.00'
            }
        ], rawData: [] });
        mockHeaders = mockData.headers;
    });

    describe('propertiesToHeaders', () => {
        it('converts vis ctrl properties to header format', () => {
            const res = propertiesToHeaders(config, mockHeaders);
            expect(res.x).to.eql({
                type: 'attrLabel',
                id: 'healthdata_finish.aci81lMifn6q',
                uri: '/gdc/md/zro9kxjp2hejksfug8qemqwx6d92c940/obj/2577',
                title: 'Quarter/Year (Health Data_finish)'
            });
            expect(res.y).to.eql({
                id: 'metricValues',
                type: 'metric',
                uri: '/metricValues',
                format: '#,##0.00',
                title: 'Average kilometers'
            });
        });
    });

    describe('getIndices', () => {
        it('return indices from config', () => {
            expect(getIndices(config, mockData.headers))
                .to.eql({ category: 0, series: 1, metric: 2 });
        });
    });

    describe('isMetricNamesInSeries', () => {
        it('works', () => {
            expect(isMetricNamesInSeries(config, mockHeaders)).to.be(false);
            config.y = 'metricNames';
            config.color = 'metricValues';
            expect(isMetricNamesInSeries(config, mockHeaders)).to.be(true);
        });
    });

    describe('getLegendLayout', () => {
        it('works', () => {
            expect(getLegendLayout(config, mockHeaders)).to.be('vertical');
            config.y = 'metricNames';
            config.color = 'metricValues';
            expect(getLegendLayout(config, mockHeaders)).to.be('horizontal');
        });
    });

    describe('getCategoryAxisLabel', () => {
        it('works', () => {
            expect(getCategoryAxisLabel(config, mockHeaders))
                .to.be('Quarter/Year (Health Data_finish)');
            mockHeaders[0].title = undefined;
            expect(getCategoryAxisLabel(config, mockHeaders)).to.be('');
        });
    });

    describe('getMetricAxisLabel', () => {
        it('works', () => {
            expect(getMetricAxisLabel(config, mockHeaders)).to.be('Average kilometers');
            mockHeaders[1].metrics = [];
            expect(getMetricAxisLabel(config, mockHeaders)).to.be('Average kilometers');
        });
    });

    describe('showInPercent', () => {
        it('works', () => {
            expect(showInPercent(config, mockHeaders)).to.be(false);
            mockHeaders[2].format = '#,##0.00 %';
            expect(showInPercent(config, mockHeaders)).to.be(true);
        });
    });
});
