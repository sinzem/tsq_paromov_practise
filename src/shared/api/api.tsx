import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from './api-instance';

// const BASE_URL = 'http://localhost:3000';

export type IPaginatedResult<T> = {
    data: T[];
    first: number;
    items: number;
    last: number;
    next: number | null;
    pages: number;
    prev: number | null;
};

export type ITodoDto = {
    id: string;
    text: string;
    done: boolean;
    userId: string;
};

export const todoListApi = {
    // getTodoList: (  /* (get запрос вынесли в api-instance для оптимизации) */
    //     { page }: { page: number },
    //     {
    //         signal,
    //     }: {
    //         signal: AbortSignal;
    //     } /* (добавляем signal на случай отмены запроса, например при резком уходе со страницы сразу после запроса - приходит во встроенном мета-обьекте, здесь деструктурирован) */,
    // ) => {
    //     return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
    //         /* (формат запроса по документации(страница и количество элементов прописываются с нижним подчеркиванием, автоматически пересчитываются из полученного ответа и возвращается обьект с нужными элементами, страницой, общим количеством и т.д)) */
    //         signal,
    //     }).then((res) => res.json() as Promise<IPaginatedResult<ITodoDto>>);
    // },

    baseKey: 'tasks',

    getTodoListQueryOptions: ({ page }: { page: number }) => {
        /* (для оптимизации выносим общую логику из компонента) */
        return queryOptions({
            /* (queryOptions предназначен для получения уже типизированного обьекта на выходе) */
            queryKey: [todoListApi.baseKey, 'list', { page }],
            // queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
            queryFn: (meta) =>
                jsonApiInstance<IPaginatedResult<ITodoDto>>(
                    `/tasks?_page=${page}&_per_page=10`,
                    {
                        signal: meta.signal,
                    },
                ),
        });
    },

    getTodoListQueryOptionsNoPagination: () => {
        /* (будет использовано на странице создания todo, поэтому сохраняем по другому ключу) */
        return queryOptions({
            queryKey: [todoListApi.baseKey, 'list', 'create'],
            queryFn: (meta) =>
                jsonApiInstance<ITodoDto[]>(`/tasks`, {
                    signal: meta.signal,
                }),
        });
    },

    getTodoListInfinityQueryOptions: () => {
        /* (для оптимизации выносим общую логику из компонента) */
        return infiniteQueryOptions({
            /* (infiniteQueryOptions предназначен для получения уже типизированного обьекта на выходе) */
            queryKey: [todoListApi.baseKey, 'list'],
            // queryFn: (meta) =>
            //     todoListApi.getTodoList({ page: meta.pageParam }, meta),
            queryFn: (meta) =>
                jsonApiInstance<IPaginatedResult<ITodoDto>>(
                    `/tasks?_page=${meta.pageParam}&_per_page=10`,
                    {
                        signal: meta.signal,
                    },
                ),
            initialPageParam: 1,
            getNextPageParam: (result) => result.next,
            select: (result) => result.pages.flatMap((page) => page.data),
        });
    },

    createTodo: (/* { done, id, text, userId } */ data: ITodoDto) => {
        return jsonApiInstance<ITodoDto>(`/tasks`, {
            method: 'POST',
            json: data,
        });
    },

    updateTodo: (data: Partial<ITodoDto> & {id: string}) => { /* (в update нужно передать один аргумент, добавляем id к data) */
        return jsonApiInstance<ITodoDto>(`/tasks/${data.id}`, {
            method: 'PATCH',
            json: data,
        });
    },

    deleteTodo: (id: string) => {
        return jsonApiInstance(`/tasks/${id}`, {
            method: 'DELETE',
        });
    },
};
