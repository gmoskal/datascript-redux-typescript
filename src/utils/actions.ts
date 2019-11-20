export function createAction<A extends string>(type: A): TypedAction<A>
export function createAction<P, A extends string>(type: A, payload: P): TypePayloadAction<A, P>
export function createAction(type: any, payload?: any) {
    return payload !== undefined ? { type, payload } : { type }
}
