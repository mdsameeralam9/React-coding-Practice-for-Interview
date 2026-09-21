import { useUpdateTodoMutation } from "../services/todoApi";

function EditTodo() {
  const [updateTodo] =
    useUpdateTodoMutation();

  const handleUpdate = async () => {
    await updateTodo({
      id: 1,
      userId: 1,
      title: "Updated Todo",
      completed: true,
    });
  };

  return (
    <button onClick={handleUpdate}>
      Update Todo
    </button>
  );
}

export default EditTodo;