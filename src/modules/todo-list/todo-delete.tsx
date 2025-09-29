import { useTodoCreate, useTodoDelete } from '../../shared/hooks';
import { useTodoRegularForCreate } from '../../shared/hooks';

export function TodoDelete() {
    const { todoItems, error, isLoading } = useTodoRegularForCreate();

    const createTodo = useTodoCreate();
    const deleteTodo = useTodoDelete();

    const { handleCreate } = useTodoCreate();

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
                <button
                    className="rounded p-2 border border-teal-500 disabled:opacity-50"
                    disabled={createTodo.isPending}
                >
                    Create
                </button>
            </form>

            <div className={'flex flex-col gap-4 mt-5'}>
                {todoItems?.map((todo) => (
                    <div
                        className="border border-slate-300 rounded p-3 flex justify-between"
                        key={todo.id}
                    >
                        {todo.text}

                        <button
                            // disabled={deleteTodo.getIsPending}
                            disabled={deleteTodo.getIsPending(todo.id)}
                            onClick={() => deleteTodo.handleDelete(todo.id)}
                            className="text-rose-500 font-bold disabled:text-rose-300 cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
