import { useDeleteTodoMutation } from "../services/todoApi";

function DeleteTodo() {
  const [deleteTodo] =
    useDeleteTodoMutation();

  const handleDelete = async () => {
    await deleteTodo(1);
  };

  return (
    <button onClick={handleDelete}>
      Delete Todo
    </button>
  );
}

export default DeleteTodo;