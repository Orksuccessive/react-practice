import type { Todo } from "../types/todo";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TodoItem({
    todo,
    onToggle,
    onDelete
}: TodoItemProps) {

    return (
        <li className="todo-item">

            <div className="todo-left">

                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />

                <span
                    className={
                        todo.completed
                            ? "completed"
                            : ""
                    }
                >
                    {todo.text}
                </span>

            </div>

            <button
                className="delete-button"
                onClick={() => onDelete(todo.id)}
            >
                Delete
            </button>

        </li>
    );
}