export async function fetchMealData() {
  try {
    const response = await fetch("https://localhost:3000/meals");
    if (!response.ok) {
      throw new Error("Failed to fectch neals");
    }
    const resData = await response.json();
    return resData;
  } catch (error) {
    console.error(error.message);
  }
}
