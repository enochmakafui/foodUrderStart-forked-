import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import logoImage from "../assets/logo.jpg";
export default function Header({ showCart }) {
  const { orderItems } = useContext(CartContext);
  return (
    <div id="main-header">
      <div id="title">
        <img src={logoImage} alt="food picture" />
        <h1>React Food</h1>
      </div>
      <button
        onClick={() => {
          showCart();
          console.log("clicked");
        }}
      >
        {orderItems.length > 0 ? `Cart (${orderItems.length})` : "Cart"}
      </button>
    </div>
  );
}
