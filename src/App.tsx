import * as React from "react"
import { connect } from "react-redux"
import { TodoForm, TodoList } from "./components/"
import { getMapDispatch } from "./utils/store"
import { actions, initialState } from "./store"
import { addTodoCmd, toggleTodoCmd, getTodosCmd } from "./store"

type ActionProps = ReturnType<typeof mapDispatch>
type StateProps = { todos: Todo[] }

const App: React.FC<ActionProps & StateProps> = p => (
    <>
        <TodoForm onAddSubmit={p.addTodo} />
        <TodoList todos={p.todos} onToggle={p.toggleTodo} />
    </>
)

const mapState: MapState<StateProps> = db => ({ todos: getTodosCmd(db) })
const mapDispatch = getMapDispatch(actions, ["addTodo", "toggleTodo"])
export const ReduxApp = connect(mapState, mapDispatch)(App)

export const ReactApp: React.FC = () => {
    const [db, setDb] = React.useState(initialState)
    const [todos, setTodos] = React.useState<Todo[]>([])
    const actions: ActionProps = {
        addTodo: text => setDb(addTodoCmd(db, text)),
        toggleTodo: (todo: Todo) => setDb(toggleTodoCmd(db, todo))
    }

    React.useEffect(() => setTodos(getTodosCmd(db)), [db])

    return <App todos={todos} {...actions} />
}
