import { useState } from "react";
import Header from "./components/Header";
import Products from "./components/Product";
import CartContextProvider from "./store/CartContext";
import Modal from "./components/Modal";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import OrderSubmit from "./components/orderSubmit";
import { fetchMealData } from "./http";
import { useFetch } from "./hooks/useFetch";
import Error from "./components/Error";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [showOrderComplete, setShowOrderComplete] = useState(false);
  const { fetchedData, isLoading, error, setError } = useFetch(fetchMealData);

  function handleShowModal() {
    setShowCart(!showCart);
  }
  function handleCloseModal() {
    setShowCart(false);
  }
  function handleShowCheckout() {
    setShowCheckOut(!showCheckOut);
  }
  function handleShowOrderComplete() {
    setShowOrderComplete(!showOrderComplete);
  }
  function handleError() {
    setError();
  }
  if (error) {
    return (
      <Modal open={true}>
        <Error
          title="An error occured "
          message={error.message}
          onClose={handleError}
        />
      </Modal>
    );
  }
  return (
    <>
      <CartContextProvider>
        {showCart && (
          <Modal open={showCart} onClose={handleCloseModal}>
            <Cart
              onCloseModal={handleShowModal}
              showCheckOut={handleShowCheckout}
            />
          </Modal>
        )}
        {showCheckOut && (
          <Modal open={showCheckOut} onClose={handleShowCheckout}>
            <CheckOut
              onClose={handleShowCheckout}
              showDone={handleShowOrderComplete}
            />
          </Modal>
        )}
        {showOrderComplete && (
          <Modal open={showOrderComplete} onClose={handleShowOrderComplete}>
            <OrderSubmit onClose={handleShowOrderComplete} />
          </Modal>
        )}
        <Header showCart={handleShowModal} />
        <Products mealData={fetchedData} isLoading={isLoading} />
      </CartContextProvider>
    </>
  );
}

export default App;
