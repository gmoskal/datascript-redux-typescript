type DPath<T = any, K extends keyof T = any> = string & { __object: T; __field: T[K] }

type InputType = "text" | "password" | "number"

type RefType = { valueType: "ref"; groupAttribute: DPath; valueAttribute: DPath; uuidAttribute: DPath }
type ValueType = { valueType: "boolean" | "string" | "number" } | RefType
type DisplayType = "star" | "currency" | "password" | "none" | "string" | "number" | "dropdown"

type Cardinality = "one" | "many"

type Schema = ValueType & {
    cardinality: Cardinality
    ident?: DPath
    inputType?: InputType
    displayType: DisplayType
    displayName?: string
    validationType?: ValidationType
    isOptional?: true
}

type ObjectSchema<T> = Casted<T, Schema>
type V<T> = { "?": T }
type QParam<T> = SimpleValue | V<T>
