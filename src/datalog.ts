import * as ds from "datascript"
import { keys } from "./utils/map"

export function DPath<T extends keyof DPaths, K extends keyof DPaths[T]>(name: T, field: K) {
    return `:${name}${field ? `/${field}` : ""}` as DPath<DPaths[T], K>
}

export const Datum = (e: string | number, a: string, v: SimpleValue): Datum => ({ e, a, v, tx: 0, op: true })

export const datumField = (v: string): string | null => (!v || v.indexOf("/") === -1 ? null : v.split("/")[1])

export const toDatums = <T extends keyof DPaths>(k: T, o: DPaths[T], e = fakeEntitny()): Datum[] =>
    keys(o).map(ks => Datum(e, DPath(k, ks), o[ks] as any))

let counter = 1
export const fakeEntitny = () => counter++

const isVar = (v: any): v is V<any> => v && typeof v === "object" && v["?"]
const materialize = (s: QParam<any>) => (isVar(s) ? `?${s["?"]}` : typeof s === "number" ? `${s}` : `"${s}"`)

type A3<T> = Array<[T, T, T]>
type Entity<T> = T & { eid: string }

type DatumQuery<T> = A3<QParam<T>>
export const find = <T, Result extends any[]>(db: DatascriptDB) => <K extends DatumQuery<keyof Entity<T>>>(
    vars: Array<K extends A3<QParam<infer E>> ? (E extends undefined ? never : E) : never>,
    qdatums: K
): Result[] => {
    const findPart = vars.map(s => `?${s}`).join(" ")
    type InParam = { name: string; value: any }
    const inParams: InParam[] = []
    const queryDatums = qdatums.map(([e, a, v], index) => {
        const nextE = isVar(e) ? null : { name: `e${index}`, value: e }
        const nextV = isVar(v) ? null : { name: `v${index}`, value: v }
        if (nextE) inParams.push(nextE)
        if (nextV) inParams.push(nextV)
        return [nextE ? { "?": nextE.name } : e, a, nextV ? { "?": nextV.name } : v]
    })
    const wherePart = queryDatums.map(d => `[${d.map(materialize).join(" ")}]`).join(" ")
    const inPart = inParams.length === 0 ? "" : inParams.reduce((acc, v) => `${acc} ?${v.name}`, " :in $")
    const query = `[:find ${findPart}${inPart} :where ${wherePart}]` as DatascriptQuery<Result>
    return ds.q(query, db, ...inParams.map(i => i.value))
}

export const addObject = <T extends keyof DPaths>(
    db: DatascriptDB,
    key: T,
    o: DPaths[T],
    id: number | null = null
): DatascriptDB =>
    ds.db_with(
        db,
        keys(o).map(k => [":db/add", id === null ? -1 : id, DPath(key, k), o[k]])
    )

export const addDatums = (db: DatascriptDB, datums: Datum[]): DatascriptDB =>
    ds.db_with(
        db,
        datums.map(datum => [":db/add", datum.e, datum.a, datum.v])
    )

export const getAllDatums = (state: DatascriptDB) => (ds as any).q(`[:find ?e ?a ?v ?tx :where [?e ?a ?v ?tx]]`, state)
export const transact = ds.db_with
