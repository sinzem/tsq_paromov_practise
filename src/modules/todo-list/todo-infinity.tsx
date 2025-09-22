import { useTodoInfinity } from '../../shared/hooks';

export function TodoInfinity() {
    /* (всю логику получения данных для листа вынесли в отдельный хук) */
    const { todoItems, error, cursor } = useTodoInfinity();

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    if (error) {
        return <div>error: {JSON.stringify(error)}</div>;
    }

    return (
        <div className="p-5 mx-auto max-w-[1200px] mt-10">
            <h1 className="text-3xl font-bold underline">Todo List</h1>
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
            {cursor}
        </div>
    );
}
