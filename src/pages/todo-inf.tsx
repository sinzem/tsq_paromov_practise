import { NavLink } from 'react-router-dom';
import { TodoInf } from '../modules/todo-list/todo-infinity';

const TodoInfinity = () => {
    return (
        <div className="relative mx-auto max-w-[1200px] min-h-[100.1vh]">
            <TodoInf />
            <NavLink
                end
                to="/"
                className="absolute top-3 right-5 p-3 rounded border border-teal-500 cursor-pointer"
            >
                Main page
            </NavLink>
        </div>
    );
};

export default TodoInfinity;
