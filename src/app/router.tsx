import { Route, Routes } from 'react-router-dom';

import MainPage from '../pages/main-page';
import TodoRegularPage from '../pages/todo-regular-page';
import TodoInfinityPage from '../pages/todo-infinity-page';
import TodoCreatePage from '../pages/todo-create-page';
import TodoDeletePage from '../pages/todo-delete-page';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/todo_reg" element={<TodoRegularPage />} />
            <Route path="/todo_inf" element={<TodoInfinityPage />} />
            <Route path="/todo_create" element={<TodoCreatePage />} />
            <Route path="/todo_delete" element={<TodoDeletePage />} />
            <Route path="/" element={<MainPage />} />
        </Routes>
    );
};
