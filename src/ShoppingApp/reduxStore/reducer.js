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

const INITIAL_STATE = {
  loading: false,
  products: [],
  cartItems: [],
  error: null,
};

export const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SUCCESS_REQUEST:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };

    case FAILED_REQUEST:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COMPLETED_REQUEST:
      return {
        ...state,
        loading: false,
      };

    case ADD_TO_CART: {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { ...action.payload, quantity: 1 },
        ],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
      };

    case INCREASE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case DECREASE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    default:
      return state;
  }
};