import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetail, startFetch, stopFetch } from "./Redux/actions/products";
import { useNavigate } from "react-router-dom";

const delay = () => new Promise((res, rej) => setTimeout(res, 4000));

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const fetchProducts = async () => {
    dispatch(startFetch(true));
    try {
      const API_URL = `https://dummyjson.com/products`;
      const resp = await fetch(API_URL);

      if (!resp?.ok) {
        throw new Error("failed to fetch data, something went wrong!");
      }

      const finalData = await resp.json();
      const { products = [] } = finalData ?? {};
      // await delay();
      if (products.length > 0) {
        dispatch({
          type: "ADD_PRODUCTS",
          payload: products,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "FAILED_PRODUCTS",
        payload: true,
      });
    } finally {
      dispatch(stopFetch(false));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const productDetailScreen = (id, product) => {
    navigate(`/${id}`, {state: product})
  }

  const state = useSelector((state) => state.products);
  const { loading = false, error = false, productsList = [] } = state ?? {};
  if (loading) return <h1>Loading...</h1>;
  if (!loading && error) return <h1>Something went wrong!</h1>;

  return (
    <div className="flex gap-2 justify-center items-center flex-wrap">
      {productsList?.map((product) => (
        <div
          onClick={() => productDetailScreen(product?.id, product)}
          key={product?.id}
          className="productWrapper w-50 h-75 border rounded flex flex-col gap-2 justify-center items-center"
        >
          <img
            src={product?.images?.[0]}
            loading="lazy"
            alt={product?.title}
            width={"100%"}
          />
          <p>{product?.title}</p>
          <p>$ {product?.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
