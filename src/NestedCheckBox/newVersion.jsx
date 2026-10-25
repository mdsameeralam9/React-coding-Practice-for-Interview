import React, { useState, useRef, useEffect } from 'react';

const checkboxConfig = [
  {
    id: 1,
    label: 'Frontend',
    checked: false,
    children: [
      { id: 2, label: 'React', checked: false },
      { id: 3, label: 'JavaScript', checked: false },
      {
        id: 4,
        label: 'CSS',
        checked: false,
        children: [
          { id: 5, label: 'Flexbox', checked: false },
          { id: 6, label: 'Grid', checked: false },
        ],
      },
    ],
  },
  {
    id: 7,
    label: 'Backend',
    checked: false,
    children: [
      { id: 8, label: 'Node.js', checked: false },
      { id: 9, label: 'Express.js', checked: false },
    ],
  },
];

function initializeTree(items) {
  return items.map((item) => ({
    ...item,
    indeterminate: false,
    children: item.children ? initializeTree(item.children) : undefined,
  }));
}

function setChildrenChecked(node, checked) {
  return {
    ...node,
    checked,
    indeterminate: false,
    children: node.children?.map((child) => setChildrenChecked(child, checked)),
  };
}

function updateTree(items, targetId, checked) {
  function updateNode(node) {
    if (node.id === targetId) {
      return setChildrenChecked(node, checked);
    }

    let updated = { ...node };

    if (node.children?.length) {
      updated.children = node.children.map(updateNode);

      const children = updated.children;

      const allChecked = children.every((child) => child.checked);

      const anyChecked = children.some(
        (child) => child.checked || child.indeterminate
      );

      updated.checked = allChecked;
      updated.indeterminate = anyChecked && !allChecked;
    }

    return updated;
  }

  return items.map(updateNode);
}

function CheckboxItem({ item, onToggle }) {
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = item.indeterminate;
    }
  }, [item.indeterminate]);

  return (
    <li style={{ margin: '10px 0', listStyle: 'none' }}>
      <label>
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={item.checked}
          onChange={(e) => onToggle(item.id, e.target.checked)}
        />{' '}
        {item.label}
      </label>

      {item.children?.length > 0 && (
        <ul style={{ paddingLeft: 25 }}>
          {item.children.map((child) => (
            <CheckboxItem key={child.id} item={child} onToggle={onToggle} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function App() {
  const [tree, setTree] = useState(() => initializeTree(checkboxConfig));

  const handleToggle = (id, checked) => {
    setTree((prev) => updateTree(prev, id, checked));
  };

  return (
    <div>
      <h2>Nested Checkbox Tree</h2>

      <ul style={{ paddingLeft: 0 }}>
        {tree.map((item) => (
          <CheckboxItem key={item.id} item={item} onToggle={handleToggle} />
        ))}
      </ul>
    </div>
  );
}
