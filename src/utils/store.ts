import { mapObject, pickObject } from "./map"

type Actions = SMap<Function>
type ActionsProps<T extends Actions> = { [P in keyof T]: FMapped<T[P], void> }

export const getMapDispatch = <T extends Actions, K extends keyof T>(
    actions: T,
    keys: K[]
): MapDispatch<ActionsProps<Pick<T, K>>> => dispatch =>
    mapObject(pickObject(actions, keys), (_, value) => (...args: any) => dispatch(value(...args)))

export const getMapDispatch2 = <T extends Actions, K extends keyof T, T2 extends Actions, K2 extends keyof T2>(
    actions: T,
    keys: K[],
    actions2: T2,
    keys2: K2[]
) => getMapDispatch({ ...actions, ...actions2 }, [...keys, ...keys2])
