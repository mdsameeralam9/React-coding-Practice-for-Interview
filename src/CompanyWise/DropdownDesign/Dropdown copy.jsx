import React, { useState, useRef, useEffect, useCallback, memo } from "react";

const Dropdown = memo(
  ({
    options = [],
    value,
    onChange,
    placeholder = "Select...",
    disabled = false,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const wrapperRef = useRef(null);
    const buttonRef = useRef(null);

    // -------------------------
    // Outside Click
    // -------------------------
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

    // -------------------------
    // Open / Close
    // -------------------------
    const toggleDropdown = useCallback(() => {
      if (disabled) return;

      setIsOpen((prev) => !prev);
    }, [disabled]);

    // -------------------------
    // Select Option
    // -------------------------
    const handleSelect = useCallback(
      (option) => {
        onChange(option);

        setIsOpen(false);

        buttonRef.current?.focus();
      },
      [onChange],
    );

    // -------------------------
    // Keyboard Navigation
    // -------------------------
    const handleKeyDown = (e) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();

          if (!isOpen) {
            setIsOpen(true);
            return;
          }

          setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));
          break;

        case "ArrowUp":
          e.preventDefault();

          setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          break;

        case "Enter":
        case " ":
          e.preventDefault();

          if (!isOpen) {
            setIsOpen(true);
            return;
          }

          if (highlightedIndex >= 0 && highlightedIndex < options.length) {
            handleSelect(options[highlightedIndex]);
          }
          break;

        case "Escape":
          setIsOpen(false);
          buttonRef.current?.focus();
          break;

        default:
          break;
      }
    };

    useEffect(() => {
      if (isOpen) {
        const selectedIndex = options.findIndex(
          (item) => item.value === value?.value,
        );

        setHighlightedIndex(selectedIndex);
      }
    }, [isOpen, options, value]);

    return (
      <div
        ref={wrapperRef}
        style={{
          width: "250px",
          position: "relative",
        }}
      >
        {/* Trigger */}

        <button
          ref={buttonRef}
          type="button"
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Dropdown"
          style={{
            border: "1px solid #ddd",
            width: "100%",
            padding: "10px",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          {value?.label || placeholder}
        </button>

        {/* Menu */}

        {isOpen && (
          <ul
            role="listbox"
            tabIndex={-1}
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              border: "1px solid #ddd",
              position: "absolute",
              width: "100%",
              background: "#fff",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 1000,
            }}
          >
            {options.length === 0 ? (
              <li
                style={{
                  padding: "10px",
                }}
              >
                No options available
              </li>
            ) : (
              options.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={value?.value === option.value}
                  onClick={() => handleSelect(option)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    background: highlightedIndex === index ? "#f1f1f1" : "#fff",
                  }}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    );
  },
);

export default Dropdown;
