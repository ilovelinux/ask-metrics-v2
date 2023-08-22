import { AggregationPeriod, Metrics, Stat } from "./enums";

export class MetricsV2RequestOptions {
    startTime: number;
    endTime: number;
    maxResultsPerQuery?: number;
    nextToken?: string;
    metricQueries: Array<MetricQuery>;
}

export class MetricQuery {
    id: Object;
    label?: string;
    name: Metrics.AnyName;
    metricNamespace: Metrics.AnyNamespace;
    groupBy?: Object;
    aggregationPeriod: AggregationPeriod;
    stat?: Stat;
    dimensions?: Array<Dimension>;
}

export class Dimension {
    name: string;
    value: string;
}

export class MetricsV2Response {
    results : Array<Result>;
    paginationContext?: Object;
}

export class Result {
    data: Array<Data>;
    id: string;
    label: string;
    metricNamespace: Metrics.AnyNamespace;
    name: Metrics.AnyName;
    stat: string;
}

export class Data {
    timestamps: Array<number>;
    values: Array<number>;
    groupedBy?: GroupedBy;
}

export class GroupedBy {
    groupedByField: string;
    groupedByValue: string;
}