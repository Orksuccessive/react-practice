import { useMemo } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";

import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Todo, Filter } from "./types/todo";

import "./App.css";


function TodoApp() {

    const [todos, setTodos] =
        useLocalStorage<Todo[]>("todos", []);

    const location = useLocation();


    const filter: Filter =
        location.pathname === "/active"
            ? "active"
            : location.pathname === "/completed"
                ? "completed"
                : "all";


    function addTodo(text: string) {

        const newTodo: Todo = {
            id: Date.now(),
            text,
            completed: false
        };

        setTodos(previousTodos => [
            ...previousTodos,
            newTodo
        ]);
    }


    function toggleTodo(id: number) {

        setTodos(previousTodos =>
            previousTodos.map(todo =>
                todo.id === id
                    ? {
                        ...todo,
                        completed: !todo.completed
                    }
                    : todo
            )
        );
    }


    function deleteTodo(id: number) {

        setTodos(previousTodos =>
            previousTodos.filter(
                todo => todo.id !== id
            )
        );
    }


    const filteredTodos = useMemo(() => {

        if (filter === "active") {
            return todos.filter(todo => !todo.completed);
        }

        if (filter === "completed") {
            return todos.filter(todo => todo.completed);
        }

        return todos;

    }, [todos, filter]);


    return (
        <main className="todo-container">

            <h1>Todo App</h1>

            <TodoForm onAdd={addTodo} />

            <TodoFilters />

            <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
            />

        </main>
    );
}


export default function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="*"
                    element={<TodoApp />}
                />

            </Routes>

        </BrowserRouter>
    );
}