import { useState } from "react";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../services/todoApi";

function TodoList() {
  const { data = [], isLoading, error } = useGetTodosQuery();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Something went wrong</h2>;

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditedTitle(todo.title);
  };

  const handleUpdate = async (todo) => {
    if (!editedTitle.trim()) return;

    await updateTodo({
      id: todo.id,
      userId: todo.userId,
      title: editedTitle.trim(),
      completed: todo.completed,
    });

    setEditingId(null);
    setEditedTitle("");
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Todo List</h2>
        <span className="text-sm text-gray-500">{data.length} items</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((todo) => {
              const isEditing = editingId === todo.id;

              return (
                <tr key={todo.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{todo.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {isEditing ? (
                      <input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      todo.title
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        todo.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {todo.completed ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {isEditing ? (
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleUpdate(todo)}
                          disabled={isUpdating}
                          className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                        >
                          {isUpdating ? "Updating..." : "Update"}
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditedTitle("");
                          }}
                          className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEdit(todo)}
                          className="rounded-md bg-amber-500 px-3 py-2 text-white hover:bg-amber-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(todo.id)}
                          disabled={isDeleting}
                          className="rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoList;