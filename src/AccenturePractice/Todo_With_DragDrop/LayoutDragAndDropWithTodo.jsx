import React from "react";
import "./style.css";
import FormLayout from "./components/FormLayout";
import ListLayout from "./components/ListLayout";
import DataProvider from './context/DataProvider';
import ErrorBoundry from './components/ErrorBoundry'

const LayoutDragAndDropWithTodo = () => {
  return (
    <DataProvider>
      <ErrorBoundry>
      <div className="Wrapper flex flex-col gap-3 p-2">
        <FormLayout />
        <ListLayout />
      </div>
      </ErrorBoundry>
    </DataProvider>
  );
};

export default LayoutDragAndDropWithTodo;
