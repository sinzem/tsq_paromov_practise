import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../shared/api/query-client';
// import { TodoList } from '../modules/todo-list/todo-list';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppRouter } from './router';
import { BrowserRouter } from 'react-router-dom';

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            {/* (создаем обертку над приложением, подключаем в нее клиента) */}
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
