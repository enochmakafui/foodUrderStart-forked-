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

function App() {
  // const [mealData, setMealData] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [showOrderComplete, setShowOrderComplete] = useState(false);
  const { fetchedData, isLoading } = useFetch(fetchMealData);

  // useEffect(() => {
  //   async function fetchMeals() {
  //     setIsLoading(true);
  //     try {
  //       const data = await fetchMealData();
  //       setMealData(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setIsLoading(false);
  //   }

  //   fetchMeals();
  // }, []);

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
