import assertUnreachable from '../utils/assertUnreachable';
import { type CompiledExploreJoin, type InlineError } from './explore';
import {
    DimensionType,
    MetricType,
    type CompiledDimension,
    type CompiledMetric,
    type Dimension,
    type Field,
} from './field';
import { type ChartSummary } from './savedCharts';
import { type TableBase } from './table';

export enum CatalogType {
    Table = 'table',
    Field = 'field',
}

export type CatalogSelection = {
    group: string;
    table?: string;
    field?: string;
};

export type ApiCatalogSearch = {
    search?: string;
    type?: CatalogType;
};
export type CatalogField = Pick<
    Field,
    'name' | 'fieldType' | 'tableLabel' | 'description'
> &
    Pick<Dimension, 'requiredAttributes'> & {
        type: CatalogType.Field;
        basicType?: string; // string, number, timestamp... used in metadata
        tableName: string;
        tableGroupLabel?: string;
    };

export type CatalogTable = Pick<
    TableBase,
    'name' | 'groupLabel' | 'description' | 'requiredAttributes'
> & {
    errors?: InlineError[]; // For explore errors
    type: CatalogType.Table;
    groupLabel?: string;
    joinedTables?: CompiledExploreJoin[]; // Matched type in explore
};

export type CatalogItem = CatalogField | CatalogTable;
export type ApiCatalogResults = CatalogItem[];

export type CatalogMetadata = {
    name: string;
    description: string | undefined;
    // TODO Tags
    modelName: string;
    source: string | undefined;
    fields: CatalogField[];
};
export type ApiCatalogMetadataResults = CatalogMetadata;

export type CatalogAnalytics = {
    charts: Pick<
        ChartSummary,
        | 'uuid'
        | 'name'
        | 'spaceUuid'
        | 'spaceName'
        | 'dashboardName'
        | 'dashboardUuid'
        | 'chartKind'
    >[];
};
export type ApiCatalogAnalyticsResults = CatalogAnalytics;

export const getBasicType = (
    field: CompiledDimension | CompiledMetric,
): string => {
    const { type } = field;
    switch (type) {
        case DimensionType.STRING:
        case MetricType.STRING:
            return 'string';

        case DimensionType.NUMBER:
        case MetricType.NUMBER:
        case MetricType.PERCENTILE:
        case MetricType.MEDIAN:
        case MetricType.AVERAGE:
        case MetricType.COUNT:
        case MetricType.COUNT_DISTINCT:
        case MetricType.SUM:
        case MetricType.MIN:
        case MetricType.MAX:
            return 'number';
        case DimensionType.DATE:
        case MetricType.DATE:
            return 'date';
        case DimensionType.TIMESTAMP:
        case MetricType.TIMESTAMP:
            return 'timestamp';
        case DimensionType.BOOLEAN:
        case MetricType.BOOLEAN:
            return 'boolean';
        default:
            return assertUnreachable(type, `Invalid field type ${type}`);
    }
};
