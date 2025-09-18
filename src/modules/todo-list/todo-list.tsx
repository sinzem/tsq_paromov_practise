import {
    keepPreviousData,
    // useInfiniteQuery,
    useQuery,
} from '@tanstack/react-query';
import { todoListApi } from './api';
import { useState } from 'react';

export function TodoList() {
    const [page, setPage] = useState(1);
    const [enabled, setEnabled] = useState(true);

    const /* query */ {
            data: todoItems /* (обьект с полученными данными, запрос реализован в api.ts -  автоматически обработает полученный json-обьект и кроме массива элементов вернет общее количество, страницу и т.д) */,
            error,
            // isPending /* (boolean статус получения данных) */,
            // status /* (строковый статус получения данных (pending/error/success)) */,
            // isFetching, /* (boolean состояние запроса - именно работы fetch или axios) */
            // fetchStatus /* (строковое состояние запроса - fetching/pause/idle) */,
            // isLoading, /* (статус загрузки) */
            isPlaceholderData /* (состояние - показывается ли placeholder, eсли он подключен(ниже в опциях) - в д.с идентичен isFetching) */,
        } = useQuery({
            /* (хук, сделает запрос согласно указанной функции(queryFn) и запишет ответ по ключу(queryKey), вернет обьект со множеством полей, нужные в д.с деструктурируем и применяем) */
            queryKey: [
                'tasks',
                'list',
                { page },
            ] /* (к значению ключа добавляем page, иначе будет возвращать только первую из кеша) */,
            queryFn: (meta) =>
                todoListApi.getTodoList(
                    { page },
                    meta,
                ) /* (в запрос передаем встроенный мета-обьект, из него в запросе в опциях используем поле signal - автоматически прервет запрос(незавершенный) если пользователь покинет страницу например) */,
            placeholderData: keepPreviousData /* (placeholder отрисует заданные значения при обновлении ключа(переходе между страницами) - вместо лоадера, можно задать свое значение, функцию, в д.с - встроенное значение, которое хранит предыдущее до загрузки новых данных) */,
            // initialData: "", /* (значение, которое отобразится при инициализации, как пример, при первой загрузке можно получить напрямую из бд или localStorage) */
            enabled: enabled /* (опция для блокировки запроса, для примера ниже реализована кнопка) */,
        });

    // const {
    //     data: todoItems,
    //     error,
    //     status,
    //     fetchStatus,
    //     isPlaceholderData,
    // } = useInfiniteQuery({
    //     queryKey: ['tasks', 'list', { page }],
    //     queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
    //     enabled: enabled,
    //     initialPageParam: 1,
    //     getNextPageParam: (result) => result.next,
    // });

    // if (status === 'pending' || fetchStatus === 'fetching') {
    //     /* ( === isLoading) */
    //     return <div>Loading...</div>;
    // }

    if (error) {
        return <div>error: {JSON.stringify(error)}</div>;
    }

    return (
        <div className="p-5 mx-auto max-w-[1200px] mt-10">
            <h1 className="text-3xl font-bold underline">Todo List</h1>
            <div
                className={
                    'flex flex-col gap-4 mt-5' +
                    (isPlaceholderData ? ' opacity-50' : '')
                }
            >
                {todoItems?.data.map((todo) => (
                    <div
                        className="border border-slate-300 rounded p-3"
                        key={todo.id}
                    >
                        {todo.text}
                    </div>
                ))}
            </div>
            <div className="flex gap-2 mt-5">
                <button
                    onClick={() => setEnabled((e) => !e)}
                    className="p-3 rounded border border-teal-500 cursor-pointer"
                >
                    Toggle enabled
                </button>
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="p-3 rounded border border-teal-500 cursor-pointer"
                >
                    Prev
                </button>
                <button
                    onClick={() =>
                        setPage((p) => Math.min(p + 1, todoItems?.pages ?? 1))
                    }
                    className="p-3 rounded border border-teal-500 cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
