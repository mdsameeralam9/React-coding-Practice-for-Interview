import { Heart } from "lucide-react";
import React, { use, useState, useOptimistic, startTransition } from "react";

const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return data.products;
};

const productsPromise = fetchProducts();

const ProductList = () => {
  const productsList = use(productsPromise);

  // Actual server-confirmed state
  const [likedProducts, setLikedProducts] = useState([]);

  // Optimistic state
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likedProducts,
    (currentLikes, productId) => {
      return currentLikes.includes(productId)
        ? currentLikes.filter((id) => id !== productId)
        : [...currentLikes, productId];
    },
  );

  const handleLikeDislike = (productId) => {
    startTransition(async () => {
      // UI updates immediately
      addOptimisticLike(productId);

      try {
        // Simulate slow API
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("API failed");
        }

        // Update actual state after success
        setLikedProducts((prev) =>
          prev.includes(productId)
            ? prev.filter((id) => id !== productId)
            : [...prev, productId],
        );
      } catch (error) {
        console.error("Like API failed:", error);

        // No rollback code needed.
        // Since likedProducts wasn't updated,
        // optimisticLikes automatically reverts.
      }
    });
  };

  return (
    <div className="p-4 flex flex-wrap gap-4 justify-center">
      {productsList.map((product) => {
        const isLiked = optimisticLikes.includes(product.id);

        return (
          <div key={product.id} className="border rounded p-3 w-60 shadow">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-32 object-cover rounded"
            />

            <h3 className="font-bold mt-2">{product.title}</h3>

            <p className="text-sm">${product.price}</p>

            <div className="flex justify-between items-center mt-2">
              <span>⭐ {product.rating}</span>

              <button
                onClick={() => handleLikeDislike(product.id)}
                className="cursor-pointer"
              >
                <Heart
                  size={22}
                  color={isLiked ? "red" : "black"}
                  fill={isLiked ? "red" : "none"}
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
