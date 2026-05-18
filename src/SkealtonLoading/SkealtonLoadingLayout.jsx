import React, { useEffect, useState } from "react";
import './st.css'

const SkealtonLoadingLayout = () => {
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setLoading((l) => !l);
//     }, 5000);

//     return () => clearInterval(id);
//   }, []);

  return <div>{loading ? <Loader /> : <Content />}</div>;
};

export default SkealtonLoadingLayout;

const Loader = () => {
  return (
    <div className="border h-40 w-50 flex items-center justify-center flex-col gap-3 p-4">
      <h1 className="text-gray-500">Loading</h1>
      <div className="skeleton w-30 h-10 rounded bg-gray-200"></div>
    </div>
  );
};


const Content = () => {
  return (
    <div className=" border h-40 w-50 flex items-center justify-center">
      <h1>My Name is Sameer</h1>
    </div>
  );
};
