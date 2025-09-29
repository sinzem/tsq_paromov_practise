import { todoListApi } from '../api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useTodoToggle = () => {
    const queryClient = useQueryClient(); 

    const updateTodoMutation = useMutation({
        mutationFn: todoListApi.updateTodo,
        // ==========================================
        // Простое обновление
        // async onSettled() {
        //     await queryClient.invalidateQueries(
        //         todoListApi.getTodoListQueryOptionsNoPagination(),
        //     );
        // } ,
        // ===========================================
        // Optimistic обновление - в начале мутации перезаписываем данные в глобальном обьекте, добавив мутацию и не дожидаясь окончания мутации
        onMutate: async newTodo => {
            await queryClient.cancelQueries({queryKey: [todoListApi.baseKey]}); /* (отменяем запросы по ключу(базовому)) */
            const previousTodos = queryClient.getQueryData(
                todoListApi.getTodoListQueryOptionsNoPagination().queryKey
            );  /* (сохраняем значение из глобального обьекта - по конкретному ключу - с id или страницей и т.п - передаем все эти параметры) */
            queryClient.setQueryData(
                todoListApi.getTodoListQueryOptionsNoPagination().queryKey,
                old => old?.map(todo => 
                    todo.id === newTodo.id ? {...todo, ...newTodo} : todo
                )
            ); /* (перезаписываем обьект по этому ключу в глобальном обьекте) */
            return { previousTodos }; /* (возвращаем начальное состояние на случай ошибки - передается в обьекте Context) */
        },
        onError: (/* err */_, /* newTodo */__, context) => { /* (в случае ошибки перезаписываем по ключу предыдущее значение) */
            queryClient.setQueryData(todoListApi.getTodoListQueryOptionsNoPagination().queryKey,
            context?.previousTodos);
        },
        onSettled: () => { /* (по окончании операции(позитивном или ошибке) инвалидируем состояние, лучше по базовому ключу) */
            queryClient.invalidateQueries({
                queryKey: [todoListApi.baseKey]
            })
        }
    });

    const toggleTodo = (id: string, done: boolean) => {
        updateTodoMutation.mutate({
                id,
                done: !done,
            });
    };

    return {
        toggleTodo
    };
};
