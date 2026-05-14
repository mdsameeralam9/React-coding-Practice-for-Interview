import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import FileExplorer from "./FileExplorer";

const FileExplorerLayout = () => {
  const [isOverBorder, setIsOverBorder] = useState(false);
  // Sidebar width state
  const [leftWidth, setLeftWidth] = useState(40);
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);

  const handleMuseOver = () => {
    setIsOverBorder(true);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsOverBorder(false);
    }
  };

  // Start resize
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      // Calculate width percentage
      const newWidth = (e.clientX / window.innerWidth) * 100;

      // Min and Max width
      if (newWidth >= 20 && newWidth <= 80) {
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsOverBorder(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="flex w-full h-screen">
      {/* LEFT SIDEBAR */}
      <div
        className="bg-gray-500 py-1 px-3 text-white relative"
        style={{ width: `${leftWidth}%` }}
      >
        <h1>Explorer</h1>

        <div className="flex gap-0.5 items-center border-b">
          <ChevronDown />
          <span>MyWealth UI</span>
        </div>

        <FileExplorer />

        {/* RESIZER */}
        <div
          className={`absolute top-0 right-0 h-full w-1 cursor-col-resize
          ${isOverBorder || isDragging ? "bg-blue-700" : "bg-gray-500"}`}
          onMouseOver={handleMuseOver}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white" style={{ width: `${100 - leftWidth}%` }}>
        Right
      </div>
    </div>
  );
};

export default FileExplorerLayout;
