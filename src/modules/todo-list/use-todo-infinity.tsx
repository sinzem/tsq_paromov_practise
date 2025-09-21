import { useInfiniteQuery } from '@tanstack/react-query';
import { todoListApi } from './api';
import { useIntersection } from '../../shared/hooks';

/* (выносим часть логики - подгрузку страниц, реф и элемент с ним - в хук) */
export function useTodoInf() {
    const {
        data: todoItems,
        error,
        isLoading /* (статус загрузки) */,
        // isPlaceholderData,
        fetchNextPage /* (встроенная функция подгрузит следующую страницу) */,
        hasNextPage /* (флаг - есть ли следующая страница) */,
        isFetchingNextPage /* (флаг загрузки следующей страницы) */,
    } = useInfiniteQuery({
        /* (специально для бесконечного листа) */
        ...todoListApi.getTodoListInfinityQueryOptions() /* (логику ниже вынесли в отдельную функцию для оптимизации) */,
        // queryKey: ['tasks', 'list'],
        // queryFn: (meta) =>
        //     todoListApi.getTodoList(
        //         {
        //             page: meta.pageParam,
        //         } /* (в д.с страницу берем из встроенного обьекта данных) */,
        //         meta,
        //     ) /* (в запрос передаем встроенный мета-обьект, из него в запросе в опциях используем поле signal - автоматически прервет запрос(незавершенный) если пользователь покинет страницу например) */,
        // initialPageParam: 1 /* (инициализируем страницы - с первой в д.с) */,
        // getNextPageParam: (result) =>
        //     result.next /* (получаем параметры страницы для следующего запроса) */,
        // // getPreviousPageParam: () => {}  /* (если работаем в обратном направлении, получаем параметры для предыдущей страницы) */
        // select: (result) =>
        //     result.pages.flatMap(
        //         (page) => page.data,
        //     ) /* (для подготовки результатов запроса к отрисовке - страницы приходят в виде массивов, делаем из них один массив) */,
    });

    /* (добавляем реф в конец листа, хук-observer отследит появление его на странице и запустит переданную в него функцию(для подгрузки следующей страницы)) */
    const cursorRef = useIntersection(() => {
        fetchNextPage();
    });

    /* (верстка блока с рефом - желательно вынести в отдельный компонент - пустой блок внизу страницы, подключенный к обсерверу, при появлении в window запустит подгрузку элементов для следующей страницы) */
    const cursor = (
        <div className="flex gap-2 mt-5 min-h-1" ref={cursorRef}>
            {!hasNextPage && <div>End of todos feed</div>}
            {isFetchingNextPage && <div>Loading...</div>}
        </div>
    );

    return {
        error,
        todoItems,
        isLoading,
        cursor,
    };
}
