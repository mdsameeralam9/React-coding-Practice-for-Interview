import React, { useState } from 'react';

function TodoBoard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Learn React Hooks',
      status: 'todo',
    },
    {
      id: 2,
      title: 'Practice JavaScript Arrays',
      status: 'todo',
    },
    {
      id: 3,
      title: 'Build Todo List',
      status: 'todo',
    },
    {
      id: 4,
      title: 'Learn React Query',
      status: 'in-progress',
    },
    {
      id: 5,
      title: 'Implement Drag and Drop',
      status: 'in-progress',
    },
    {
      id: 6,
      title: 'Build Search Feature',
      status: 'in-progress',
    },
    {
      id: 7,
      title: 'Practice useMemo',
      status: 'done',
    },
    {
      id: 8,
      title: 'Practice useCallback',
      status: 'done',
    },
    {
      id: 9,
      title: 'Build Modal Component',
      status: 'done',
    },
    {
      id: 10,
      title: 'Review React Interview Questions',
      status: 'done',
    },
  ]);

  const [draggedTask, setDraggedTask] = useState(null);

  const statuses = [
    {
      id: 'todo',
      title: 'To Do',
    },
    {
      id: 'in-progress',
      title: 'In Progress',
    },
    {
      id: 'done',
      title: 'Done',
    },
  ];

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status } : task
      )
    );

    setDraggedTask(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        padding: '20px',
        alignItems: 'flex-start',
      }}
    >
      {statuses.map((status) => (
        <div
          key={status.id}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(status.id)}
          style={{
            width: '300px',
            minHeight: '400px',
            padding: '16px',
            background: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <h3>{status.title}</h3>

          {tasks
            .filter((task) => task.status === status.id)
            .map((task) => (
              <div
                key={task.id}
                draggable={true}
                onDragStart={() => handleDragStart(task)}
                style={{
                  padding: '12px',
                  marginBottom: '10px',
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  cursor: 'grab',
                }}
              >
                {task.title}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default TodoBoard;
