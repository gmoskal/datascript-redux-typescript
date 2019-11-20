type SimpleValue = boolean | string | number
type Datum = { e: string | number; a: string; v: SimpleValue; tx: number; op?: boolean }

type DatascriptDB = {}
type DatascriptQuery<T> = string & { __resultTuple: T }

type DatascriptSchemaKeys = ":db/valueType" | ":db/cardinality" | ":db/unique" | ":db/index" | ":db/fulltext"
type DatascriptSchema = Partial<Record<DatascriptSchemaKeys, string>>

type DatumEntity = [number, string, SimpleValue]

declare module "datascript" {
    export const empty_db: (schema?: SMap<DatascriptSchema>) => DatascriptDB
    export function db_with(db: DatascriptDB, sth: Array<any[]>): DatascriptDB
    export function db_with(db: DatascriptDB, sth: Array<Object>): DatascriptDB
    export function init_db(source: DatumEntity[]): DatascriptDB
    export function init_db(source: Datum[]): DatascriptDB
    export const q: <T>(query: DatascriptQuery<T>, db: DatascriptDB, ...args: SimpleValue[]) => Array<T>
    export const pull: (db: DatascriptDB, q: string, ...args: any) => any
}
