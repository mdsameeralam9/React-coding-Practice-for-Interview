const INITIAL_STATE = {
  loading: false,
  productsList: [],
  error: false,
};

export const productsReducers = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_START_PRODUCTS":
      return {
        ...state,
        loading: payload,
      };

    case "ADD_PRODUCTS":
      return {
        ...state,
        productsList: payload,
      };

    case "FAILED_PRODUCTS":
      return {
        ...state,
        loading: payload,
      };

    case "FETCH_COMPLETED_PRODUCTS":
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};
