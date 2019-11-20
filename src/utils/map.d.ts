type OMap<TKey extends string, TValue> = { [K in TKey]?: TValue }
type TMap<TKey extends string, TValue> = { [K in TKey]: TValue }
type SMap<TValue> = TMap<string, TValue>
