import { NavLink } from "react-router-dom";

export default function TodoFilters() {

    return (
        <nav className="filters">

            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "filter active" : "filter"
                }
            >
                All
            </NavLink>

            <NavLink
                to="/active"
                className={({ isActive }) =>
                    isActive ? "filter active" : "filter"
                }
            >
                Active
            </NavLink>

            <NavLink
                to="/completed"
                className={({ isActive }) =>
                    isActive ? "filter active" : "filter"
                }
            >
                Completed
            </NavLink>

        </nav>
    );
}