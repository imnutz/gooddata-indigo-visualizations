// (C) 2007-2018 GoodData Corporation
export const DRILL_EVENT_DATA_BY_MEASURE_URI = {
    drillContext: {
        element: 'primaryValue',
        intersection: [{
            header: {
                identifier: '',
                uri: '/gdc/md/project_id/obj/1'
            },
            id: 'm1',
            title: 'Lost'
        }],
        type: 'headline',
        value: '42470571.16'
    },
    executionContext: {
        measures: [{
            definition: {
                measure: {
                    item: {
                        uri: '/gdc/md/project_id/obj/1'
                    }
                }
            },
            localIdentifier: 'm1'
        }]
    }
};

export const DRILL_EVENT_DATA_BY_MEASURE_IDENTIFIER = {
    drillContext: {
        element: 'primaryValue',
        intersection: [{
            header: {
                identifier: 'metric.lost',
                uri: ''
            },
            id: 'm1',
            title: 'Lost'
        }],
        type: 'headline',
        value: '42470571.16'
    },
    executionContext: {
        measures: [{
            definition: {
                measure: {
                    item: {
                        identifier: 'metric.lost'
                    }
                }
            },
            localIdentifier: 'm1'
        }]
    }
};
