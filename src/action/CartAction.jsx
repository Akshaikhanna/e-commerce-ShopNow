export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const PURCHASE_PRODUCT = "PURCHASE_PRODUCT";
export const INCREMENT_ITEM_QUANTITY = "INCREMENT_ITEM_QUANTITY";
export const DECREMENT_ITEM_QUANTITY = "DECREMENT_ITEM_QUANTITY";

export const addToCartAction = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCartAction = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const purchaseProductAction = (productId, image, title, price) => ({
  type: PURCHASE_PRODUCT,
  payload: {
    productId,
    image,
    title,
    price,
  },
});

export const incrementItemQuantity = (itemId) => {
  return {
    type: INCREMENT_ITEM_QUANTITY,
    payload: itemId,
  };
};

export const decrementItemQuantity = (itemId) => {
  return {
    type: DECREMENT_ITEM_QUANTITY,
    payload: itemId,
  };
};
