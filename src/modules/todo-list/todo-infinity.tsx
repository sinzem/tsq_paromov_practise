import { useInfiniteQuery } from '@tanstack/react-query';
import { todoListApi } from './api';
import { useState } from 'react';

export function TodoInf() {
    const [enabled, setEnabled] = useState(true);

    const {
        data: todoItems,
        error,
        // isLoading, /* (статус загрузки) */
        isPlaceholderData,
        fetchNextPage /* (встроенная функция подгрузит следующую страницу) */,
        hasNextPage /* (флаг - есть ли следующая страница) */,
        isFetchingNextPage /* (флаг загрузки следующей страницы) */,
    } = useInfiniteQuery({
        /* (специально для бесконечного листа) */
        queryKey: ['tasks', 'list'],
        queryFn: (meta) =>
            todoListApi.getTodoList(
                {
                    page: meta.pageParam,
                } /* (в д.с страницу берем из встроенного обьекта данных) */,
                meta,
            ) /* (в запрос передаем встроенный мета-обьект, из него в запросе в опциях используем поле signal - автоматически прервет запрос(незавершенный) если пользователь покинет страницу например) */,
        enabled: enabled,
        initialPageParam: 1 /* (инициализируем страницы - с первой в д.с) */,
        getNextPageParam: (result) =>
            result.next /* (получаем параметры страницы для следующего запроса) */,
        // getPreviousPageParam: () => {}
    });

    // if (isLoading) {
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
            </div>
        </div>
    );
}
