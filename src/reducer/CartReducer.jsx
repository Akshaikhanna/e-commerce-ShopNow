import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  PURCHASE_PRODUCT,
  INCREMENT_ITEM_QUANTITY,
  DECREMENT_ITEM_QUANTITY,
} from "../action/CartAction"; // Define your action types here

const initialState = {
  cartItems: [],
  purchaseHistory: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      newItem.quantity = 1;
      return {
        ...state,
        cartItems: [...state.cartItems, newItem],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case PURCHASE_PRODUCT:
      return {
        ...state,
        purchaseHistory: [
          ...state.purchaseHistory,
          {
            productId: action.payload.productId,
            image: action.payload.image,
            title: action.payload.title,
            price: action.payload.price,
          },
        ],
      };
    case INCREMENT_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };
    case DECREMENT_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload && item.quantity > 0) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export default cartReducer;
