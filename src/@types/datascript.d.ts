type SimpleValue = boolean | string | number
type Datum = { e: string | number; a: string; v: SimpleValue; tx: number; op?: boolean }

type DatascriptDB = {}
type DatascriptQuery<T> = string & { __resultTuple: T }

type DatascriptSchemaKeys = ":db/valueType" | ":db/cardinality" | ":db/unique" | ":db/index" | ":db/fulltext"
type DatascriptSchema = Partial<Record<DatascriptSchemaKeys, string>>

type DatumEntity = [number, string, SimpleValue]
type Entity<T> = { get: <K extends keyof T>(attr: DPath<T, K>) => T[K] }
declare module "datascript" {
    export const db: (db: DatascriptDB) => DatascriptDB
    export const conn_from_db: (db: DatascriptDB) => DatascriptDB

    export const empty_db: (schema?: SMap<DatascriptSchema>) => DatascriptDB
    export const create_conn: (schema: SMap<DatascriptSchema>) => DatascriptDB

    export function db_with(db: DatascriptDB, sth: Array<any[]>): DatascriptDB
    export function db_with(db: DatascriptDB, sth: Array<Object>): DatascriptDB
    export function init_db(source: DatumEntity[]): DatascriptDB
    export function init_db(source: Datum[]): DatascriptDB
    export const q: <T>(query: DatascriptQuery<T>, db: DatascriptDB, ...args: SimpleValue[]) => Array<T>
    export const entity: <T>(db: DatascriptDB, e: number | string) => Entity<T>
    export const filter: (db: DatascriptDB, cb: (db: DatascriptDB, d: Datum) => boolean) => DatascriptDB
}
