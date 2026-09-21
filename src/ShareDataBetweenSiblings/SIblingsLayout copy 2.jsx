import React, { useState } from "react";

// -------------------------
// Layout 1
// -------------------------
const Layout1 = () => {
  const sendDataToLayout2 = () => {
    // Data we want to share
    const userId = 123;
    const name = "Sameer";
    const message = "Hello from Layout 1";

    // Create query parameters
    const params = new URLSearchParams();

    params.set("userId", userId);
    params.set("name", name);
    params.set("message", message);

    // Create new URL
    const newUrl = `${window.location.pathname}?${params.toString()}`;

    // Change URL without page reload
    window.history.pushState(null, "", newUrl);
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
      <h2 style={{ color: "#1976d2" }}>Layout 1</h2>

      <p>Click the button to add data to the URL.</p>

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
  // Read query parameters
  const params = new URLSearchParams(window.location.search);

  const userId = params.get("userId");
  const name = params.get("name");
  const message = params.get("message");

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
      <h2 style={{ color: "#388e3c" }}>Layout 2</h2>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <p>
          <strong>User ID:</strong> {userId || "No data"}
        </p>

        <p>
          <strong>Name:</strong> {name || "No data"}
        </p>

        <p>
          <strong>Message:</strong> {message || "No data"}
        </p>
      </div>
    </div>
  );
};

// -------------------------
// Parent
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
    backgroundColor: active ? "#673ab7" : "#e0e0e0",
    color: active ? "#fff" : "#333",
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
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
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
