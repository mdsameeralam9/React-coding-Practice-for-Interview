import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart } from "../reduxStore/action";

function Products() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const products = useSelector((state) => state.products);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img
            className="product-image"
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
          />
          <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <button
              className="add-cart-button"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;