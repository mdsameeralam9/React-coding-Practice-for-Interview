import React, { useEffect, useState } from "react";

// -------------------------
// Layout 1
// -------------------------
const Layout1 = () => {
  const sendDataToLayout2 = () => {
    // 1. Store data in browser history
    window.history.pushState(
      {
        userId: 123,
        name: "Sameer",
        message: "Hello from Layout 1",
      },
      "",
      window.location.pathname
    );

    // 2. Notify other components
    window.dispatchEvent(
      new PopStateEvent("popstate")
    );
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#e8f4ff",
        border: "1px solid #2196f3",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2 style={{ color: "#1976d2" }}>
        Layout 1
      </h2>

      <p>
        Click the button to send data to Layout 2.
      </p>

      <button
        onClick={sendDataToLayout2}
        style={{
          padding: "10px 18px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#1976d2",
          color: "#fff",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Send Data to Layout 2
      </button>
    </div>
  );
};

// -------------------------
// Layout 2
// -------------------------
const Layout2 = () => {
  const [data, setData] = useState(
    window.history.state
  );

  useEffect(() => {
    const handlePopState = () => {
      // Read updated data
      setData(window.history.state);
    };

    // Listen for popstate event
    window.addEventListener(
      "popstate",
      handlePopState
    );

    // Cleanup listener
    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f1f8e9",
        border: "1px solid #4caf50",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2 style={{ color: "#388e3c" }}>
        Layout 2
      </h2>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          marginTop: "15px",
        }}
      >
        <p>
          <strong>User ID:</strong>{" "}
          {data?.userId || "No data"}
        </p>

        <p>
          <strong>Name:</strong>{" "}
          {data?.name || "No data"}
        </p>

        <p>
          <strong>Message:</strong>{" "}
          {data?.message || "No data"}
        </p>
      </div>
    </div>
  );
};

// -------------------------
// Parent Component
// -------------------------
const SIblingsLayout = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabStyle = (active) => ({
    padding: "10px 20px",
    marginRight: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: active
      ? "#673ab7"
      : "#e0e0e0",
    color: active
      ? "#fff"
      : "#333",
  });

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fafafa",
        borderRadius: "12px",
        boxShadow:
          "0 4px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
          color: "#333",
        }}
      >
        Share Data Between Layout1 and Layout2
      </h1>

      {/* Tabs */}
      <div
        style={{
          borderBottom: "1px solid #ddd",
          paddingBottom: "15px",
        }}
      >
        <button
          onClick={() => setActiveTab(1)}
          style={tabStyle(activeTab === 1)}
        >
          Layout 1
        </button>

        <button
          onClick={() => setActiveTab(2)}
          style={tabStyle(activeTab === 2)}
        >
          Layout 2
        </button>
      </div>

      {/* Content */}
      {activeTab === 1 && <Layout1 />}

      {activeTab === 2 && <Layout2 />}
    </div>
  );
};

export default SIblingsLayout;