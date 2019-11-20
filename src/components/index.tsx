import * as React from "react"

type TodoProps = Todo & { onClick: () => void }
export const Todo: React.FC<TodoProps> = p => (
    <li
        onClick={p.onClick}
        style={{
            textDecoration: p.completed ? "line-through" : "none",
            cursor: p.completed ? "default" : "pointer"
        }}>
        {p.text}
    </li>
)

type TodoListProps = {
    onToggle: (todo: Todo) => void
    todos: Todo[]
}
export const TodoList: React.FC<TodoListProps> = p => (
    <ul>
        {p.todos.map(t => (
            <Todo key={t.uuid} {...t} onClick={() => p.onToggle(t)} />
        ))}
    </ul>
)

type TodoFormProps = { onAddSubmit: (text: string) => void }
export const TodoForm: React.FC<TodoFormProps> = p => {
    const [text, setText] = React.useState("")
    const submit = () => {
        p.onAddSubmit(text)
        setText("")
    }
    return (
        <>
            <input type="text" value={text} onChange={e => setText((e.target.value || "").trim())} />
            <button onClick={submit}>Add</button>
        </>
    )
}
