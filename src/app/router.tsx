import { Route, Routes } from 'react-router-dom';

import MainPage from '../pages/main-page';
import TodoRegular from '../pages/todo-reg';
import TodoInfinity from '../pages/todo-inf';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/todo_reg" element={<TodoRegular />} />
            <Route path="/todo_inf" element={<TodoInfinity />} />
            <Route path="/" element={<MainPage />} />
        </Routes>
    );
};
