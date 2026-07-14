import {
  INITIATE_REQUEST,
  SUCCESS_REQUEST,
  FAILED_REQUEST,
  COMPLETED_REQUEST,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_CART_ITEM,
  DECREASE_CART_ITEM,
} from "./constant";

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: INITIATE_REQUEST });

    const res = await fetch("https://dummyjson.com/products?limit=10");
    if (!res.ok) throw new Error("Failed to fetch response");

    const apiResponse = await res.json();

    dispatch({
      type: SUCCESS_REQUEST,
      payload: apiResponse.products,
    });
  } catch (error) {
    dispatch({
      type: FAILED_REQUEST,
      payload: error.message,
    });
  } finally {
    dispatch({ type: COMPLETED_REQUEST });
  }
};

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const increaseCartItem = (productId) => ({
  type: INCREASE_CART_ITEM,
  payload: productId,
});

export const decreaseCartItem = (productId) => ({
  type: DECREASE_CART_ITEM,
  payload: productId,
});
