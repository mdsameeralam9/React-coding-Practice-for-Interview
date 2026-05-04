import React, { useState, useRef, type ChangeEvent } from "react";
import "./styles.css";

interface Position {
  x: number;
  y: number;
}

interface Note {
  id: number;
  text: string;
  color: string;
  position: Position;
  isDragging: boolean;
  offset: Position;
}

const COLORS: string[] = [
  "#FFFA65",
  "#FF9AA2",
  "#FFB7B2",
  "#FFDAC1",
  "#E2F0CB",
  "#B5EAD7",
  "#C7CEEA",
];
const NOTE_WIDTH = 200;
const NOTE_HEIGHT = 150;
const GAP = 15;
const COLUMNS = 3;

function getRandomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function getGridPosition(index: number): Position {
  const col = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);
  return {
    x: col * (NOTE_WIDTH + GAP),
    y: row * (NOTE_HEIGHT + GAP),
  };
}

const StickyNote: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const bringNoteToFront = (id: number): void => {
    setNotes((prevNotes) => {
      const noteToFront = prevNotes.find((n) => n.id === id);
      if (!noteToFront) return prevNotes;
      const filtered = prevNotes.filter((n) => n.id !== id);
      return [...filtered, noteToFront];
    });
  };

  const addNote = (): void => {
    const occupiedPositions = new Set(
      notes.map((n) => `${n.position.x},${n.position.y}`),
    );
    let index = 0;
    let position: Position | null = null;

    while (true) {
      const pos = getGridPosition(index);
      const key = `${pos.x},${pos.y}`;
      if (!occupiedPositions.has(key)) {
        position = pos;
        break;
      }
      index++;
    }

    const newNote: Note = {
      id: Date.now(),
      text: "",
      color: getRandomColor(),
      position,
      isDragging: false,
      offset: { x: 0, y: 0 },
    };
    setNotes((prev) => [...prev, newNote]);
  };

  const removeNote = (id: number): void => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const updateText = (id: number, text: string): void => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, text } : n)));
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number,
  ): void => {
    const target = e.target as HTMLElement;
    if (target.tagName === "TEXTAREA" || target.closest("button")) return;

    e.preventDefault();
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    bringNoteToFront(id);

    const offsetX = e.clientX - containerRect.left - note.position.x;
    const offsetY = e.clientY - containerRect.top - note.position.y;

    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, isDragging: true, offset: { x: offsetX, y: offsetY } }
          : n,
      ),
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const draggingNote = notes.find((n) => n.isDragging);
    if (!draggingNote || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let x = e.clientX - containerRect.left - draggingNote.offset.x;
    let y = e.clientY - containerRect.top - draggingNote.offset.y;

    // Boundary constraints
    const maxX = containerRect.width - NOTE_WIDTH;
    const maxY = containerRect.height - NOTE_HEIGHT;
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    setNotes((prev) =>
      prev.map((n) =>
        n.id === draggingNote.id ? { ...n, position: { x, y } } : n,
      ),
    );
  };

  const handleMouseUp = (): void => {
    setNotes((prev) => prev.map((n) => ({ ...n, isDragging: false })));
  };

  return (
    <div
      className="container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {notes.map((note, index) => (
          <div
            key={note.id}
            className="note"
            style={{
              backgroundColor: note.color,
              left: note.position.x,
              top: note.position.y,
              zIndex: index + 1,
            }}
            onMouseDown={(e) => handleMouseDown(e, note.id)}
          >
            <button className="close-btn" onClick={() => removeNote(note.id)}>
              x
            </button>
            <textarea
              className="note-textarea"
              placeholder="Enter Text"
              value={note.text}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                updateText(note.id, e.target.value)
              }
            />
          </div>
        ))}
      </div>
      <button className="add-note-btn" onClick={addNote}>
        +
      </button>
    </div>
  );
};

export default StickyNote;
