const BASE_URL = 'http://localhost:3000';

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
};

export const todoListApi = {
    getTodoList: (
        { page }: { page: number },
        {
            signal,
        }: {
            signal: AbortSignal;
        } /* (добавляем signal на случай отмены запроса, например при резком уходе со страницы сразу после запроса - приходит во встроенном мета-обьекте, здесь деструктурирован) */,
    ) => {
        return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
            /* (формат запроса по документации(страница и количество элементов прописываются с нижним подчеркиванием, автоматически пересчитываются из полученного ответа и возвращается обьект с нужными элементами, страницой, общим количеством и т.д)) */
            signal,
        }).then((res) => res.json() as Promise<IPaginatedResult<ITodoDto>>);
    },
};
