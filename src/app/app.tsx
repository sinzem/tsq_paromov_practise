import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/query-client";
import { TodoList } from "../modules/todo-list/todo-list";


export function App() {

  return (
    <QueryClientProvider client={queryClient}> {/* (создаем обертку над приложением, подключаем в нее клиента) */}
      <TodoList />
    </QueryClientProvider>
  
  )
}

