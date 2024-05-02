import { useContext } from "react";
import { CartContext } from "../store/CartContext";
export default function Cart({ onCloseModal }) {
  const { orderItems } = useContext(CartContext);
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {orderItems.length === 0 && <p>empty cart</p>}
      {orderItems.map((order) => (
        <ul key={order.id} className="cart-item">
          <li>
            <p>
              {order.name} - {order.quantity || 1} x ${order.price}
            </p>
          </li>
          <li className="cart-item-actions">
            <button>-</button>
            <span>{order.quantity || 1}</span>
            <button>+</button>
          </li>
        </ul>
      ))}
      <div className="cart-total">Total</div>
      <div className="modal-actions">
        <button className="text-button" onClick={() => onCloseModal()}>
          close
        </button>
        <button className="button">Go to checkout</button>
      </div>
    </div>
  );
}
