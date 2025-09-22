import { nanoid } from 'nanoid';
import { todoListApi } from '../api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useTodoCreate = () => {
    const queryClient = useQueryClient(); /* (получаем глобальный обьект) */

    const createTodoMutation = useMutation({
        /* (функция мутации, возвращает мутацию, будет вывана в функции отправки формы, в д.с ключ не нужен(нужен, если хотим узнать статус мутации из другого компонента)) */
        mutationFn: todoListApi.createTodo,
    });

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); /* (отменит перезагрузку страницы, но понадобится обновить данные - refetch или invalidateQueries ниже(в случае успешной мутации)) */
        const formData = new FormData(e.currentTarget);

        const text = String(formData.get('text') ?? '');

        createTodoMutation.mutate(
            {
                /* (передаем обьект с данными для мутации) */
                id: nanoid() /* (функция библиотеки для генерации id) */,
                done: false,
                text: text,
                userId: '1',
            },
            {
                onSuccess() {
                    // refetch(); /* (сделает повторный запрос, но пренадлежит к useQuery - нужно прокидывать как пропс, лучше используем invalidateQueries) */
                    // queryClient.invalidateQueries({
                    //     queryKey: [todoListApi.baseKey],
                    // }); /* (invalidateQueries определит в глобальном обьекте по указанному ключу данные как невалидные и перезапросит их, если не указать ключ, перезапросит данные по всем ключам) */
                    queryClient.invalidateQueries(
                        todoListApi.getTodoListQueryOptionsNoPagination(),
                    ); /* (cамый лучший вариант для инвалидации - передать вместо ключа query-опции) */
                },
            },
        );
        // createTodoMutation.mutateAsync(); /* (асинхронный вариант mutate, в большинстве случаев достаточно обычной) */

        e.currentTarget.reset();
    };

    return {
        handleCreate,
    };
};
