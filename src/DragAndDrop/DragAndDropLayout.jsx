import React, { useState } from "react";

const initialData = {
  todo: [
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build Kanban Board" },
  ],
  progress: [{ id: 3, text: "Practice Drag & Drop" }],
  done: [{ id: 4, text: "Setup Project" }],
};

export default function DragAndDropLayout() {
  const [boards, setBoards] = useState(initialData);

  const [dragItem, setDragItem] = useState(null);

  // Start Drag
  const handleDragStart = (item, sourceColumn) => {
    setDragItem({
      item,
      sourceColumn,
    });
  };

  // Drop Item
  const handleDrop = (targetColumn) => {
    if (!dragItem) return;

    const { item, sourceColumn } = dragItem;

    // Same column no need update
    if (sourceColumn === targetColumn) return;

    setBoards((prev) => {
      // Remove from source
      const sourceItems = prev[sourceColumn].filter(
        (task) => task.id !== item.id
      );

      // Add into target
      const targetItems = [...prev[targetColumn], item];

      return {
        ...prev,
        [sourceColumn]: sourceItems,
        [targetColumn]: targetItems,
      };
    });

    setDragItem(null);
  };

  return (
    <div style={styles.container}>
      {Object.entries(boards).map(([columnName, tasks]) => (
        <div
          key={columnName}
          style={styles.column}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(columnName)}
        >
          <h2 style={styles.heading}>
            {columnName.toUpperCase()}
          </h2>

          {tasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={() =>
                handleDragStart(task, columnName)
              }
              style={styles.card}
            >
              {task.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    minHeight: "100vh",
    background: "#f4f5f7",
  },

  column: {
    flex: 1,
    background: "#e2e4e6",
    padding: "15px",
    borderRadius: "10px",
    minHeight: "400px",
  },

  heading: {
    marginBottom: "15px",
  },

  card: {
    background: "white",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "10px",
    cursor: "grab",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};
