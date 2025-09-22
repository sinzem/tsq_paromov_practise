import { Route, Routes } from 'react-router-dom';

import MainPage from '../pages/main-page';
import TodoRegularPage from '../pages/todo-regular-page';
import TodoInfinityPage from '../pages/todo-infinity-page';
import TodoCreatePage from '../pages/todo-create-page';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/todo_reg" element={<TodoRegularPage />} />
            <Route path="/todo_inf" element={<TodoInfinityPage />} />
            <Route path="/todo_create" element={<TodoCreatePage />} />
            <Route path="/" element={<MainPage />} />
        </Routes>
    );
};
