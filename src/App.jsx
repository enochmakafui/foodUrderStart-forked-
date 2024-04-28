import { useEffect, useState } from "react";
import Header from "./components/Header";
import Products from "./components/Product";

function App() {
  const [mealData, setMealData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/meals");
        const resData = await response.json();
        console.log(resData);
        setMealData(resData);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    fetchMeals();
  }, []);

  return (
    <>
      <Header />
      <Products mealData={mealData} isLoading={isLoading} />
    </>
  );
}

export default App;
