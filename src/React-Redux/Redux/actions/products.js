export const startFetch = (payload) => {
  return {
    type: "FETCH_START_PRODUCTS",
    payload: payload,
  };
};

export const stopFetch = (payload) => {
  return {
    type: "FETCH_COMPLETED_PRODUCTS",
    payload: payload,
  };
};

// details
export const setProductDetailEnd = (payload) => {
  return {
    type: "FETCH_SINGLE_PRODUCT_STOP",
    payload: payload,
  };
};

export const setProductDetailStart = (payload) => {
  return {
    type: "FETCH_SINGLE_PRODUCT_START",
    payload: payload,
  };
};

export const setProductDetailErr = (payload) => {
  return {
    type: "FETCH_SINGLE_PRODUCT_ERROR",
    payload: payload,
  };
};

export const setProductDetailCompleted = (payload) => {
  return {
    type: "FETCH_SINGLE_PRODUCT_COMPLETED",
    payload: payload,
  };
};

export const setProductDetailInitiaState = () => {
  return {
    type: "FETCH_SINGLE_PRODUCT_NULL",
  };
};

export const setProductDetail = (id) => {
  return async (dispatch) => {
    dispatch(setProductDetailStart(true));
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      if (!res.ok) {
        throw new Error("failed to fetch details screen");
      }
      const resLast = await res.json();
      console.log(resLast);
      dispatch(setProductDetailCompleted(resLast));
    } catch (error) {
      dispatch(setProductDetailErr(true));
    } finally {
      dispatch(setProductDetailStart(false));
    }
  };
};
