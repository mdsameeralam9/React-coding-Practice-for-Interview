import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import DeleteTodo from "./components/DeleteTodo";
import TodoList from "./components/TodoList";

const Layout = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>RTK Query CRUD</h1>

        <AddTodo />

        <EditTodo />

        <DeleteTodo />

        <hr />

        <TodoList />
      </div>
    </Provider>
  );
};

export default Layout;
