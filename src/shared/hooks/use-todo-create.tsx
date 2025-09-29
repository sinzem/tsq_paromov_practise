import { nanoid } from 'nanoid';
import { todoListApi } from '../api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useTodoCreate = () => {
    const queryClient = useQueryClient(); /* (получаем глобальный обьект) */

    const createTodoMutation = useMutation({
        /* (функция мутации, возвращает мутацию, будет вывана в функции отправки формы, в д.с ключ не нужен(нужен, если хотим узнать статус мутации из другого компонента), также имеет большой набор встроенных полей и методов типа data, isPanding(возвращаем из этого хука для отрисовки лоадера), isPaused и т.п) */
        mutationFn: todoListApi.createTodo,
        // onSuccess() {
        //     /* (в случае успеха мутации обьявляем имеющиеся данные невалидными, для перезапроса, можно вызывать здесь или  в функции отправки запрса - пример ниже) */
        //     queryClient.invalidateQueries(
        //         todoListApi.getTodoListQueryOptionsNoPagination(),
        //     );
        // },
        // onError() {}  (в случае ошибки)
        async onSettled() {
            /* добавляем метки асинхронности для нормальной отрисовки, иначе элементы могут нестабильно отображаться(в д.с при мутации подключена прозрачность кнопки формы, без async она может несколько раз меняться во время мутации) */
            await queryClient.invalidateQueries(
                // todoListApi.getTodoListQueryOptionsNoPagination(),
                {queryKey: [todoListApi.baseKey]} /* (инвалидацию лучше производить по более общему ключу) */
            );
        } /* (onSettled - в любом случае, как finally, на всякий случай рекомендуется вызывать инвалидацию здесь) */,
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
                // onSuccess() {
                //     // refetch(); /* (сделает повторный запрос, но пренадлежит к useQuery - нужно прокидывать как пропс, лучше используем invalidateQueries) */
                //     // queryClient.invalidateQueries({
                //     //     queryKey: [todoListApi.baseKey],
                //     // }); /* (invalidateQueries определит в глобальном обьекте по указанному ключу данные как невалидные и перезапросит их, если не указать ключ, перезапросит данные по всем ключам) */
                //     // queryClient.invalidateQueries(
                //     //     todoListApi.getTodoListQueryOptionsNoPagination(),
                //     // ); /* (cамый лучший вариант для инвалидации - передать вместо ключа query-опции, можно также использовать по месту мутации непосредственно - в д.с в createTodoMutation) */
                // },
            },
        );
        // createTodoMutation.mutateAsync(); /* (асинхронный вариант mutate, в большинстве случаев достаточно обычной) */

        e.currentTarget.reset();
    };

    return {
        handleCreate,
        isPending: createTodoMutation.isPending,
    };
};
