import { NavLink } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className="w-[100%] h-[100vh] p-40 text-xl text-bold">
            <nav>
                <li>
                    <NavLink end to="/todo_reg">
                        Regular Todo List
                    </NavLink>
                </li>
            </nav>
        </div>
    );
};

export default MainPage;
