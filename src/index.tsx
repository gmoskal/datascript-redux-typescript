import * as React from "react"
import { render } from "react-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { reducer, initialState } from "./store"
import { ReactApp, ReduxApp } from "./App"

const { __REDUX_DEVTOOLS_EXTENSION__: installDevTools = () => (f: any) => f } = window as any
const store = createStore(reducer as any, initialState, installDevTools())

render(
    <Provider store={store}>
        <h4>Redux Datascript example</h4>
        <ReduxApp />
        <h4>React Hooks Datascript example</h4>
        <ReactApp />
    </Provider>,
    document.getElementById("root")
)
