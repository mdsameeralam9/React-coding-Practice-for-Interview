```jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, useSearchParams } from "react-router-dom";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // -----------------------------------------
  // 1. READ QUERY PARAMETERS FROM URL
  // -----------------------------------------

  const category = searchParams.get("category") || "all";
  const color = searchParams.get("color") || "all";
  const page = Number(searchParams.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // -----------------------------------------
  // 2. CALL API WHEN QUERY PARAMETER CHANGES
  // -----------------------------------------

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        // Create API URL
        const apiUrl =
          `/api/products?category=${category}` +
          `&color=${color}` +
          `&page=${page}`;

        console.log("API URL:", apiUrl);

        /*
          REAL API:

          const response = await fetch(apiUrl);
          const data = await response.json();
          setProducts(data);
        */

        // -----------------------------------------
        // MOCK API
        // -----------------------------------------

        await new Promise((resolve) => setTimeout(resolve, 700));

        const allProducts = [
          {
            id: 1,
            name: "Black Running Shoes",
            category: "shoes",
            color: "black",
            price: 1200,
          },
          {
            id: 2,
            name: "White Running Shoes",
            category: "shoes",
            color: "white",
            price: 1500,
          },
          {
            id: 3,
            name: "Black T-Shirt",
            category: "shirts",
            color: "black",
            price: 700,
          },
          {
            id: 4,
            name: "Blue T-Shirt",
            category: "shirts",
            color: "blue",
            price: 800,
          },
          {
            id: 5,
            name: "Black Jeans",
            category: "jeans",
            color: "black",
            price: 1800,
          },
        ];

        // Filter products based on query parameters
        let filteredProducts = allProducts;

        if (category !== "all") {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === category
          );
        }

        if (color !== "all") {
          filteredProducts = filteredProducts.filter(
            (product) => product.color === color
          );
        }

        // Simulate pagination
        const productsPerPage = 2;

        const startIndex = (page - 1) * productsPerPage;

        const paginatedProducts = filteredProducts.slice(
          startIndex,
          startIndex + productsPerPage
        );

        setProducts(paginatedProducts);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, color, page]);

  // -----------------------------------------
  // 3. UPDATE QUERY PARAMETERS
  // -----------------------------------------

  const updateFilter = (key, value) => {
    setSearchParams((previousParams) => {
      const newParams = new URLSearchParams(previousParams);

      if (value === "all") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }

      // When filter changes, go back to page 1
      if (key !== "page") {
        newParams.set("page", "1");
      }

      return newParams;
    });
  };

  // -----------------------------------------
  // 4. UI
  // -----------------------------------------

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginTop: 0,
            marginBottom: "8px",
          }}
        >
          Product Listing
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "25px",
          }}
        >
          React Query Parameters Example
        </p>

        {/* -----------------------------------------
            CURRENT URL
        ----------------------------------------- */}

        <div
          style={{
            backgroundColor: "#f0f4ff",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "25px",
          }}
        >
          <strong>Current URL:</strong>

          <div
            style={{
              marginTop: "8px",
              color: "#333",
              wordBreak: "break-all",
            }}
          >
            {window.location.href}
          </div>
        </div>

        {/* -----------------------------------------
            FILTERS
        ----------------------------------------- */}

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          {/* CATEGORY */}

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "bold",
              }}
            >
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                updateFilter("category", e.target.value)
              }
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                minWidth: "150px",
              }}
            >
              <option value="all">All</option>
              <option value="shoes">Shoes</option>
              <option value="shirts">Shirts</option>
              <option value="jeans">Jeans</option>
            </select>
          </div>

          {/* COLOR */}

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "bold",
              }}
            >
              Color
            </label>

            <select
              value={color}
              onChange={(e) =>
                updateFilter("color", e.target.value)
              }
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                minWidth: "150px",
              }}
            >
              <option value="all">All</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="blue">Blue</option>
            </select>
          </div>
        </div>

        {/* -----------------------------------------
            QUERY PARAMETERS DISPLAY
        ----------------------------------------- */}

        <div
          style={{
            backgroundColor: "#f8f8f8",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "25px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>
            Query Parameters
          </h3>

          <div>category: {category}</div>
          <div>color: {color}</div>
          <div>page: {page}</div>
        </div>

        {/* -----------------------------------------
            PRODUCTS
        ----------------------------------------- */}

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
            }}
          >
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              color: "#777",
            }}
          >
            No products found.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  backgroundColor: "#fff",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                  }}
                >
                  {product.name}
                </h3>

                <p>
                  Category: {product.category}
                </p>

                <p>
                  Color: {product.color}
                </p>

                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  ₹{product.price}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* -----------------------------------------
            PAGINATION
        ----------------------------------------- */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <button
            disabled={page === 1}
            onClick={() =>
              updateFilter("page", String(page - 1))
            }
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "6px",
              cursor: page === 1 ? "not-allowed" : "pointer",
              opacity: page === 1 ? 0.5 : 1,
            }}
          >
            Previous
          </button>

          <div
            style={{
              padding: "10px 18px",
              backgroundColor: "#eee",
              borderRadius: "6px",
            }}
          >
            Page {page}
          </div>

          <button
            onClick={() =>
              updateFilter("page", String(page + 1))
            }
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------
// APP
// -----------------------------------------

export default function App() {
  return (
    <BrowserRouter>
      <Products />
    </BrowserRouter>
  );
}
```
