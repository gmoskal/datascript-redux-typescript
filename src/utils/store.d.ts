type RootState = DatascriptDB
type MapStateToProps<TStateProps, TOwnProps, State> = (state: State, ownProps: TOwnProps) => TStateProps

type Action<T = any> = { type: T }
type MapDispatchToPropsFunction<TDispatchProps, TOwnProps> = (
    dispatch: Dispatch<Action>,
    ownProps: TOwnProps
) => TDispatchProps

type MapState<TS, TO = {}> = MapStateToProps<TS, TO, RootState>
type MapDispatch<TA, TO = {}> = MapDispatchToPropsFunction<TA, TO>

interface AnyAction extends Action {
    [extraProps: string]: any
}

interface Unsubscribe {
    (): void
}

interface Store<S = any, A extends Action = AnyAction> {
    dispatch: Dispatch<A>
    getState(): S
    subscribe(listener: () => void): Unsubscribe
    replaceReducer(nextReducer: Reducer<S, A>): void
}
