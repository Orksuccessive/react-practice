import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TodoList({
    todos,
    onToggle,
    onDelete
}: TodoListProps) {

    if (todos.length === 0) {
        return <p className="empty">No todos found.</p>;
    }

    return (
        <ul className="todo-list">

            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}

        </ul>
    );
}