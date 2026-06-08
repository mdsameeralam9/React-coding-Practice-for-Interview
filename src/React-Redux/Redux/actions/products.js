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
