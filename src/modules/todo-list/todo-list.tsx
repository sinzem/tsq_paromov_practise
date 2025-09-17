import { useQuery } from '@tanstack/react-query';
import { todoListApi } from './api';
import { useState } from 'react';

export function TodoList() {
    const [page, setPage] = useState(1);

    const /* query */ {
            data: todoItems /* (обьект с полученными данными, запрос реализован в api.ts -  автоматически обработает полученный json-обьект и кроме массива элементов вернет общее количество, страницу и т.д) */,
            error,
            isPending,
        } = useQuery({
            /* (хук, сделает запрос согласно указанной функции(queryFn) и запишет ответ по ключу(queryKey), вернет обьект со множеством полей, нужные в д.с деструктурируем и применяем) */
            queryKey: ['tasks', 'list'],
            queryFn: (meta) =>
                todoListApi.getTodoList(
                    { page },
                    meta,
                ) /* (в запрос передаем встроенный мета-обьект, из него в запросе в опциях используем поле signal - автоматически прервет запрос(незавершенный) если пользователь покинет страницу например) */,
        });

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>error: {JSON.stringify(error)}</div>;
    }

    return (
        <div className="p-5 mx-auto max-w-[1200px] mt-10">
            <h1 className="text-3xl font-bold underline">Todo List</h1>
            <div className="flex flex-col gap-4 mt-5">
                {todoItems.data.map((todo) => (
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
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="p-3 rounded border border-teal-500 cursor-pointer"
                >
                    Prev
                </button>
                <button
                    onClick={() =>
                        setPage((p) => Math.max(p + 1, todoItems.pages))
                    }
                    className="p-3 rounded border border-teal-500 cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
