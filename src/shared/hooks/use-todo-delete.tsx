import { todoListApi } from '../api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useTodoDelete = () => {
    const queryClient = useQueryClient();

    const deleteTodoMutation = useMutation({
        mutationFn: todoListApi.deleteTodo,
        async onSettled() {
            /* await  */ queryClient.invalidateQueries(
                /* (при удалении await не обязателен, но обновить состояние нужно) */
                // todoListApi.getTodoListQueryOptionsNoPagination(),
            {queryKey: [todoListApi.baseKey]} /* (инвалидацию лучше сделать по более общему ключу - не todo.id а общий todo) */   
        );
        },
        async onSuccess(/* data, variables, context */ _, deletedId) {
            /* (onSuccess принимает первым аргументом результат выполнения предыдущего(data, в д.с не нужна, но она идет первой, заменим на _), переменные, пришедшие в мутацию(variables - в д.с интересует id), и context) */
            // const todos = queryClient.getQueryData(
            //     todoListApi.getTodoListQueryOptionsNoPagination().queryKey,
            // ); /* (получаем предыдущие значения) */
            // if (todos) {
            //     /* (устанавливаем обратно этот же массив без обьекта с удаляемым id) */
            //     queryClient.setQueryData(
            //         todoListApi.getTodoListQueryOptionsNoPagination().queryKey,
            //         todos.filter((item) => item.id !== deletedId),
            //     );
            // }
            // ================================

            /* (более короткий вариант) */
            queryClient.setQueryData(
                todoListApi.getTodoListQueryOptionsNoPagination().queryKey,
                todos => todos?.filter((item) => item.id !== deletedId),
            );
            
        },
    });

    // const handleDelete = (id: string) => {
    //     deleteTodoMutation.mutate(id);
    // };

    // deleteTodoMutation.variables;

    return {
        // handleDelete,
        handleDelete:
            deleteTodoMutation.mutate /* (самый упрощенный вид функции удаления) */,
        getIsPending: (id: string) => 
            deleteTodoMutation.isPending && deleteTodoMutation.variables === id /* (6на выходе из мутации из variables можно получить также id элемента - в д.с для соответствия выделения(прозрачности) кнопки удаления по нужному id - без этого при удалении прозрачными становятся кнопки удаления в каждой карточке, а не только в удаляемой) */
    };
};
