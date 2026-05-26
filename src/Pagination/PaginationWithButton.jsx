import React, { useMemo, useState } from "react";

let startIndex = 0;
let endIndex = 100;

const getData = () => {
  const arr = [];

  for (let i = startIndex + 1; i <= endIndex; i++) {
    arr.push({
      id: i,
      label: Date.now(),
    });
  }

  //   startIndex = endIndex;
  //   endIndex = endIndex + 10;

  return arr;
};

const PaginationWithButton = () => {
  const [data, setData] = useState(getData);
  const [page, setPage] = useState(1);
  const LIMIT = 10;

  const slicedData = useMemo(() => {
    const startIndex = (page - 1) * LIMIT;
    const endIndex = page * LIMIT;
    return data.slice(startIndex, endIndex);
  }, [page]);

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col gap-2">
      <h1>Pagination</h1>

      <div className="p-2 gap-2 itemsWrapper flex flex-wrap justify-between border w-[80%] h-[80%] overflow-auto">
        {slicedData.map((item) => (
          <div
            key={item.id}
            className="singleItem border h-30 w-20 flex flex-col gap-2 items-center justify-center"
          >
            <h1>{item.id}</h1>

            <h1 className="w-full break-words px-2">{item.label}</h1>
          </div>
        ))}
      </div>

      <div className="actions">
        <button
          className="border bg-blue-400 text-white px-4 py-0.5 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        {new Array(data?.length / LIMIT)
          .fill("")
          .map((_, index) => index + 1)
          .map((el) => (
            <button
              onClick={() => setPage(Number(el))}
              className={`border text-white px-4 py-0.5 cursor-pointer ${Number(el) === page ? "bg-blue-500" : "bg-gray-400"}`}
            >
              {el}
            </button>
          ))}
        <button
          disabled={data?.length / LIMIT === page}
          className="border bg-blue-400 text-white px-4 py-0.5 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationWithButton;
