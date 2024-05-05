import { useContext } from "react";
import { CartContext } from "../store/CartContext";

export default function CheckOut({ onClose, showDone }) {
  const { totalPrice, clearCart } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your logic for form submission
    onClose();
    showDone();
    clearCart();
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total Amount: ${totalPrice.toFixed(2)}</p>
      <form className="control" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input type="text" placeholder="John Doe" required />
        <label htmlFor="email">E-Mail Address</label>
        <input type="email" placeholder="john@exaample.com" required />
        <label htmlFor="Street">Street </label>
        <input type="text" placeholder="MaxStreet 12" required />
        <div className="control-row">
          <div>
            <label htmlFor="Postal-code">Postal Code</label>
            <input type="text" placeholder="1234" required />
          </div>
          <div>
            <label htmlFor="City">City</label>
            <input type="text" placeholder="Accra" required />
          </div>
        </div>
        <div className="modal-actions">
          <button className="text-button" onClick={() => onClose()}>
            close
          </button>
          <button className="button" type="submit">
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}
