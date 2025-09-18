import { NavLink } from 'react-router-dom';
import { TodoList } from '../modules/todo-list/todo-list';

const TodoRegular = () => {
    return (
        <div className="relative mx-auto max-w-[1200px]">
            <TodoList />
            <button className="absolute top-3 right-5 p-3 rounded border border-teal-500 cursor-pointer">
                <NavLink end to="/">
                    Main page
                </NavLink>
            </button>
        </div>
    );
};

export default TodoRegular;
