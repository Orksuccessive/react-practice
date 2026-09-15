import { FormEvent, useState } from "react";

interface TodoFormProps {
    onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {

    const [text, setText] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        const trimmedText = text.trim();

        if (!trimmedText) {
            return;
        }

        onAdd(trimmedText);

        setText("");
    }

    return (
        <form onSubmit={handleSubmit} className="todo-form">

            <input
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Enter a todo..."
            />

            <button type="submit">
                Add
            </button>

        </form>
    );
}