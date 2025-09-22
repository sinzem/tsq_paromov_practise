import { useTodoCreate } from '../../shared/hooks';
import { useTodoRegularForCreate } from '../../shared/hooks';

export function TodoCreate() {
    const {
        todoItems,
        error,
        isLoading,
        // refetch /* (встроенная функция, сделает повторный запрос на сервер, можно добавить после успешной мутации для обновления листа, но неудобно, если функция мутации вынесена отдельно) */
    } = useTodoRegularForCreate();

    const {
        handleCreate,
    } = useTodoCreate(); /* (функцию мутации и добавления Todo вынесли в отдельный хук) */

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>error: {JSON.stringify(error)}</div>;
    }

    return (
        <div className="p-5 mx-auto max-w-[1200px] mt-10">
            <h1 className="text-3xl font-bold underline">Todo List</h1>

            <form className="flex gap-2 my-5" onSubmit={handleCreate}>
                <input
                    type="text"
                    name="text"
                    className="rounded p-2 border border-teal-500"
                />
                <button className="rounded p-2 border border-teal-500">
                    Create
                </button>
            </form>

            <div className={'flex flex-col gap-4 mt-5'}>
                {todoItems?.map((todo) => (
                    <div
                        className="border border-slate-300 rounded p-3"
                        key={todo.id}
                    >
                        {todo.text}
                    </div>
                ))}
            </div>
        </div>
    );
}
