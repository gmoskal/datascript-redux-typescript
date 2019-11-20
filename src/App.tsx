import * as React from "react"
import { connect } from "react-redux"
import { TodoForm, TodoList } from "./components/"
import { getMapDispatch } from "./utils/store"
import * as store from "./store"

type ActionProps = ReturnType<typeof mapDispatch>
type StateProps = { todos: Todo[] }

const App: React.FC<ActionProps & StateProps> = p => (
    <>
        <TodoForm onAddSubmit={p.addTodo} />
        <TodoList todos={p.todos} onToggle={p.toggleTodo} onRemove={p.removeTodo} />
    </>
)

const mapState: MapState<StateProps> = db => ({ todos: store.getTodosCmd(db) })
const mapDispatch = getMapDispatch(store.actions, ["addTodo", "toggleTodo", "removeTodo"])
export const ReduxApp = connect(mapState, mapDispatch)(App)

export const ReactApp: React.FC = () => {
    const [db, setDb] = React.useState(store.initialState)
    const [todos, setTodos] = React.useState<Todo[]>([])
    const actions: ActionProps = {
        addTodo: text => setDb(store.addTodoCmd(db, text)),
        toggleTodo: (todo: Todo) => setDb(store.toggleTodoCmd(db, todo)),
        removeTodo: (todo: Todo) => setDb(store.removeTodoCmd(db, todo))
    }

    React.useEffect(() => setTodos(store.getTodosCmd(db)), [db])

    return <App todos={todos} {...actions} />
}
