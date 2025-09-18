import { Route, Routes } from 'react-router-dom';

import MainPage from '../pages/main-page';
import TodoRegular from '../pages/todo-reg';

export const AppRouter = () => {
    // const idRand = () =>
    //     Math.ceil(Math.random() * 1000) * Math.ceil(Math.random() * 1000);

    return (
        <Routes>
            <Route
                path="/todo_reg"
                element={<TodoRegular />}
                // id={String(idRand())}
            />
            <Route
                path="/"
                element={<MainPage />}
                // id={String(idRand())}
            />
        </Routes>
    );
};
