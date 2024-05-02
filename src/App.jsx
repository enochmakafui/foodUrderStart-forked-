import { useEffect, useState } from "react";
import Header from "./components/Header";
import Products from "./components/Product";
import CartContextProvider from "./store/CartContext";
import Modal from "./components/Modal";
import Cart from "./components/Cart";

function App() {
  const [mealData, setMealData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/meals");
        const resData = await response.json();
        setMealData(resData);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    fetchMeals();
  }, []);

  function handleShowModal() {
    setShowCart(!showCart);
  }
  function handleCloseModal() {
    setShowCart(false);
  }

  return (
    <>
      <CartContextProvider>
        {showCart && (
          <Modal open={showCart} onClose={handleCloseModal}>
            <Cart onCloseModal={handleShowModal} />
          </Modal>
        )}
        <Header showCart={handleShowModal} />
        <Products mealData={mealData} isLoading={isLoading} />
      </CartContextProvider>
    </>
  );
}

export default App;
