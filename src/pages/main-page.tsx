import { NavLink } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className="w-[100%] min-h-[100.1vh] p-40 text-xl text-bold">
            <nav className="flex flex-col gap-2">
                <li>
                    <NavLink end to="/todo_reg">
                        Regular Todo List
                    </NavLink>
                </li>
                <li>
                    <NavLink end to="/todo_inf">
                        Infinity Todo List
                    </NavLink>
                </li>
                <li>
                    <NavLink end to="/todo_create">
                        Create Todo
                    </NavLink>
                </li>
                <li>
                    <NavLink end to="/todo_delete">
                        Delete Todo
                    </NavLink>
                </li>
            </nav>
        </div>
    );
};

export default MainPage;
