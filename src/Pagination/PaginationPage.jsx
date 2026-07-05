import React, { useState } from "react";
import "./style.css";

const PaginationPage = () => {
  const [currPage, setCurrPage] = useState(2);
  const TOTAL = 10;

  const onPageClick = (pageNo) => {
    setCurrPage(pageNo);
  };

  return (
    <div className="PaginationPage">
      <Pagination
        currPage={currPage}
        totalPage={TOTAL}
        onPageClick={onPageClick}
      />
    </div>
  );
};

export default PaginationPage;

function Pagination({ currPage, totalPage, onPageClick }) {
  const pages = [];

  const addPage = (page) => {
    if (page >= 1 && page <= totalPage && !pages.includes(page)) {
      pages.push(page);
    }
  };

  addPage(1);
  addPage(currPage - 1);
  addPage(currPage);
  addPage(currPage + 1);
  addPage(totalPage);

  pages.sort((a, b) => a - b);

  const items = [];
  for (let i = 0; i < pages.length; i++) {
    if (i > 0 && pages[i] - pages[i - 1] > 1) {
      items.push("...");
    }
    items.push(pages[i]);
  }

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      {items.map((item, index) =>
        item === "..." ? (
          <span key={`dots-${index}`}>...</span>
        ) : (
          <button
            key={item}
            onClick={() => onPageClick(item)}
            style={{
              fontWeight: item === currPage ? "bold" : "normal",
              textDecoration: item === currPage ? "underline" : "none",
            }}
          >
            {item}
          </button>
        ),
      )}
    </div>
  );
}

{
  /**

Question 2: Pagination Component
Build:
<Pagination
 currPage={1}
 totalPage={10}
 onPageClick={() => {}}
/>
Rules:
Always show the first page
Always show the last page
Show current page
Show current page — 1
Show current page + 1
Show "…" whenever pages are skipped
Examples:
Current Page = 1
1 2 ... 10
Current Page = 5
•
•
•
•
•
•
•
•
•
•
•
•
•
•
1 ... 4 5 6 ... 10
Current Page = 9
1 ... 8 9 10
The interviewer focused heavily on:
Edge cases
Reusable component design
Rendering logic
User experience
    
    
*/
}
