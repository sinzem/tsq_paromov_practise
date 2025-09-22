import { NavLink } from 'react-router-dom';
import { TodoRegular } from '../modules/todo-list/todo-regular';

const TodoRegularPage = () => {
    return (
        <div className="relative mx-auto max-w-[1200px] min-h-[100.1vh]">
            <TodoRegular />
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

export default TodoRegularPage;
