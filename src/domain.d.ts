type Storable<T> = { uuid: string; createdAt: number } & T
type Todo = Storable<{ completed?: boolean; text: string }>
type DPaths = { todo: Todo }
