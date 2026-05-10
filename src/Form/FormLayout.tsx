import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";

type Todo = {
  id: number;
  title: string;
  userId?: number;
  completed?: boolean;
};

const FormLayout = () => {
  const todoRef = useRef<HTMLInputElement | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  // GET TODOS
  const fetchTodoList = async (): Promise<Todo[]> => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=10",
    );
    return res.data;
  };

  const {
    isPending,
    error,
    data = [],
  } = useQuery<Todo[]>({
    queryKey: ["todoList"],
    queryFn: fetchTodoList,
  });

  // ➜ ADD TODO
  const addMutation = useMutation({
    mutationFn: (newTodo: Todo) =>
      axios.post<Todo>("https://jsonplaceholder.typicode.com/todos", newTodo),

    onSuccess: (res) => {
      queryClient.setQueryData<Todo[]>(["todoList"], (old = []) => [
        res.data,
        ...old,
      ]);
    },
  });

  // ➜ DELETE TODO
  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`),

    onSuccess: (_, id) => {
      queryClient.setQueryData<Todo[]>(["todoList"], (old = []) =>
        old.filter((item) => item.id !== id),
      );
    },
  });

  // ➜ UPDATE TODO
  const updateMutation = useMutation({
    mutationFn: (updated: Todo) =>
      axios.put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${updated.id}`,
        updated,
      ),

    onSuccess: (res) => {
      queryClient.setQueryData<Todo[]>(["todoList"], (old = []) =>
        old.map((item) => (item.id === editId ? res.data : item)),
      );
    },
  });

  // HANDLE SUBMIT (ADD / UPDATE)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = todoRef.current?.value.trim();
    if (!value) return;

    if (editId !== null) {
      updateMutation.mutate({
        id: editId,
        title: value,
      });

      setEditId(null);
    } else {
      addMutation.mutate({
        id: Date.now(),
        title: value,
        userId: 1,
        completed: false,
      });
    }

    if (todoRef.current) {
      todoRef.current.value = "";
    }
  };

  return (
    <div className="border w-100 h-120 p-2 m-4 flex flex-col">
      {/* FORM */}
      <form className="flex gap-1 items-center" onSubmit={handleSubmit}>
        <input
          ref={todoRef}
          type="text"
          className="border flex-2 px-2 py-1"
          placeholder="Enter Todo"
        />

        <button className="bg-blue-900 text-white px-3 py-1 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* LIST */}
      <div className="flex-1 overflow-hidden mt-2">
        {isPending && <h2>Loading...</h2>}
        {error && <h2>Error...</h2>}

        <ul className="h-full overflow-y-auto flex flex-col gap-1">
          {data.map((item) => (
            <li
              key={item.id}
              className="flex justify-between bg-lime-100 p-2 rounded"
            >
              <p className="flex-1">{item.title}</p>

              {/* EDIT */}
              <button
                onClick={() => {
                  if (todoRef.current) {
                    todoRef.current.value = item.title;
                  }
                  setEditId(item.id);
                }}
                className="bg-blue-400 text-white px-2 mx-1 rounded"
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteMutation.mutate(item.id)}
                className="bg-red-500 text-white px-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormLayout;
