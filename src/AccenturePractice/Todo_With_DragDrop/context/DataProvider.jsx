import React, {
  useState,
  createContext,
  useCallback,
  useContext,
  useMemo,
  use,
} from "react";

// create contex
const DataContext = createContext(null);

// custome hook to consume context data
export const useDataContext = () => {
  // const val = useContext(DataContext)
  const val = use(DataContext);
  if (!val) throw new Error("Need DataContext");
  return val;
};

// DataProvider
const DataProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [todoState, setTodoState] = useState([]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  // add Todo
  const addTodo = useCallback((data) => {
    console.log(data)
    const { status: key = "", task: value = "" } = data;
    const updatedValue = { key, value, id: Date.now() };
    setTodoState(state => ([...state, updatedValue]));
  }, []);

  const data = useMemo(() => {
    return {
      onClose,
      onOpen,
      open,
      addTodo,
      todoState
    };
  }, [onClose, onOpen, open, addTodo, todoState]);

  // console.log(data);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataProvider;
