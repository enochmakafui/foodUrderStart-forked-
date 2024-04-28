export default function Products({ mealData, isLoading }) {
  return (
    <div id="meals">
      {isLoading && <p>fetching food data....</p>}
      {!isLoading &&
        mealData &&
        mealData.length > 0 &&
        mealData.map((meal) => (
          <article key={meal.id} className="meal-item">
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
            <h3>{meal.name}</h3>
            <p className="meal-item-price">{meal.price}</p>
            <p className="meal-item-description">{meal.description}</p>
            <button className="button meal-item-actions">Add to Cart</button>
          </article>
        ))}
    </div>
  );
}
