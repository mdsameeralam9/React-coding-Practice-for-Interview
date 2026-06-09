const INITIAL_STATE = {
  product: null,
  loading: false,
  error: false,
};

export const productDetailReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_SINGLE_PRODUCT_START":
      return {
        ...state,
        loading: payload,
      };
    case "FETCH_SINGLE_PRODUCT_COMPLETED":
      return {
        ...state,
        product: payload,
      };
    case "FETCH_SINGLE_PRODUCT_ERROR":
      return {
        ...state,
        error: payload,
      };
    case "FETCH_SINGLE_PRODUCT_STOP":
      return {
        ...state,
        loading: payload,
      };

    case "FETCH_SINGLE_PRODUCT_NULL":
      return {
        product: null,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
};
