import { createContext, useReducer } from "react";

export const CartContext = createContext({
  orderItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseItemQuantity: () => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const itemExists = state.orders.some(
      (order) => order.id === action.meal.id,
    );
    if (itemExists) {
      return {
        orders: state.orders,
      };
    }
    action.meal.quantity = 1;
    const updatedOrders = [...state.orders, action.meal];
    return {
      orders: updatedOrders,
    };
  }
  if (action.type === "INCREASE_QUANTITY") {
    const updatedOrders = state.orders.map((order) => {
      if (order.id === action.id) {
        return {
          ...order,
          quantity: order.quantity + 1,
        };
      }
      return order;
    });
    return {
      orders: updatedOrders,
    };
  }
  if (action.type === "DELETE_ITEM") {
    const item = state.orders.find((order) => order.id === action.id);
    if (item && item.quantity === 1) {
      const updatedOrders = state.orders.filter(
        (order) => order.id !== action.id,
      );
      return {
        orders: updatedOrders,
      };
    } else if (item) {
      const updatedOrders = state.orders.map((order) => {
        if (order.id === action.id) {
          return {
            ...order,
            quantity: order.quantity - 1,
          };
        }
        return order;
      });
      return {
        orders: updatedOrders,
      };
    }
  }
  if (action.type === "CLEAR_ITEM") {
    return {
      orders: [],
    };
  }
}

export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    orders: [],
  });

  const totalPrice =
    cartState.orders.length > 0
      ? cartState.orders.reduce((total, order) => {
          return total + order.quantity * parseFloat(order.price);
        }, 0)
      : 0;

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
  function handleIncreaseItemQuantity(id) {
    cartDispatch({
      type: "INCREASE_QUANTITY",
      id: id,
    });
  }
  function handleClearCart() {
    cartDispatch({
      type: "CLEAR_ITEM",
    });
  }
  const ctxValues = {
    orderItems: cartState.orders,
    addToCart: handleAddItemToCart,
    removeFromCart: handleDeleteFromCart,
    increaseItemQuantity: handleIncreaseItemQuantity,
    totalPrice: totalPrice,
    clearCart: handleClearCart,
  };
  return (
    <CartContext.Provider value={ctxValues}>{children}</CartContext.Provider>
  );
}
