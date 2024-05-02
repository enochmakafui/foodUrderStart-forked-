import { createContext, useReducer } from "react";

export const CartContext = createContext({
  orderItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedOrders = [...state.orders, action.meal];
    console.log(action.meal);
    return {
      orders: updatedOrders,
    };
  }
  if (action.type === "DELETE_ITEM") {
  }
}

export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    orders: [],
  });
  function handleAddItemToCart(meal) {
    cartDispatch({
      type: "ADD_ITEM",
      meal: meal,
    });
  }
  function handleDeleteFromCart(id) {
    cartDispatch({
      type: "DELETE_ITEM",
      id: id,
    });
  }
  const ctxValues = {
    orderItems: cartState.orders,
    addToCart: handleAddItemToCart,
    removeFromCart: handleDeleteFromCart,
  };
  return (
    <CartContext.Provider value={ctxValues}>{children}</CartContext.Provider>
  );
}
