import React, { useEffect, useState } from "react";

const ApiCallWithTimeOut = () => {
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [timer, setTimer] = useState(3000);

  const fetchData = async (timeout = timer) => {
    setLoader(true);
    setError(false);

    const controller = new AbortController();

    const timerId = setTimeout(() => {
      controller.abort();
    }, timeout);

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        signal: controller.signal,
      });

      clearTimeout(timerId);

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const users = await res.json();
      setData(users);
    } catch (err) {
      console.log("Error =>", err);

      if (err.name === "AbortError") {
        console.log("Request timed out and was aborted.");
      }

      setError(true);
    } finally {
      setLoader(false);
    }
  };

  const retryCall = () => {
    setTimer(6000); // update state (optional)
    fetchData(6000); // immediately use new timeout
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loader) {
    return <h1>Fetching data...</h1>;
  }

  if (error) {
    return (
      <div className="error">
        <h1>Something went Wrong...</h1>
        <button onClick={retryCall}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Users</h2>

      {data.map((user) => (
        <p key={user.id}>
          {user.id}. {user.name}
        </p>
      ))}
    </div>
  );
};

export default ApiCallWithTimeOut;
