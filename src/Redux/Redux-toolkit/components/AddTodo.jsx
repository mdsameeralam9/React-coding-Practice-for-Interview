import { useAddTodoMutation } from "../services/todoApi";

function AddTodo() {
  const [addTodo, { isLoading }] =
    useAddTodoMutation();

  const handleAdd = async () => {
    await addTodo({
      userId: 1,
      title: "Learn RTK Query",
      completed: false,
    });
  };

  return (
    <button onClick={handleAdd}>
      {isLoading ? "Adding..." : "Add Todo"}
    </button>
  );
}

export default AddTodo;