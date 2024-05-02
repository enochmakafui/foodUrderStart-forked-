import { useContext } from "react";
import { CartContext } from "../store/CartContext";

export default function Cart({ onCloseModal }) {
  const { orderItems, removeFromCart, increaseItemQuantity } =
    useContext(CartContext);
  function calculateItemTotal(order) {
    const price = parseFloat(order.price);
    return order.quantity * price;
  }

  const totalPrice = orderItems.reduce((total, order) => {
    return total + calculateItemTotal(order);
  }, 0);
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {orderItems.length === 0 && <p>cart is empty</p>}
      {orderItems.map((order) => (
        <ul key={order.id} className="cart-item">
          <li>
            <p>
              {order.name} - {order.quantity} x ${order.quantity * order.price}
            </p>
          </li>
          <li className="cart-item-actions">
            <button onClick={() => removeFromCart(order.id)}>-</button>
            <span>{order.quantity}</span>
            <button onClick={() => increaseItemQuantity(order.id)}>+</button>
          </li>
        </ul>
      ))}
      <div className="cart-total">${totalPrice.toFixed(2)}</div>
      <div className="modal-actions">
        <button className="text-button" onClick={() => onCloseModal()}>
          close
        </button>
        <button className="button">Go to checkout</button>
      </div>
    </div>
  );
}
