import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { setProductDetail, setProductDetailInitiaState } from "./Redux/actions/products";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const dispatch = useDispatch();
  const productSinge = useSelector(state => state.product);
  const { product={}, loading=false } = productSinge
  const data = useLocation();
  // const { state: product } = data ?? {};
  const { id } = useParams();

  useEffect(() => {
    dispatch(setProductDetail(id));
    return () => {
      dispatch(setProductDetailInitiaState())
    };
  }, [id]);

  //if(loading) return <h1>Fetching Single Product</h1>
  return (
    <div>
      {" "}
      <div
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
    </div>
  );
};

export default Product;
