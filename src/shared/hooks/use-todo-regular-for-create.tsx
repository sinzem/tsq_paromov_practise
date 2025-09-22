import { useQuery } from '@tanstack/react-query';
import { todoListApi } from '../api/api';

/* (будет использован при создании todo) */
export function useTodoRegularForCreate() {
    const {
        data: todoItems,
        error,
        isLoading,
        refetch /* (в случае добавления todo нужно повторить запрос для обновления данных в кеше) */,
    } = useQuery({
        ...todoListApi.getTodoListQueryOptionsNoPagination(),
        select: (data) =>
            data
                .slice()
                .reverse() /* (разворачиваем полученный массив для отработки добавления элементов) */,
        // select: (data) => data.toReverse(),  /* (для этого toReverse короче, но TS ругается) */
    });

    return {
        error,
        isLoading,
        todoItems,
        refetch,
    };
}
