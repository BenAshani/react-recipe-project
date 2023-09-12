import { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./Recipe";
import "./Search.css";

function Search() {
  let data;
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [vegan, setVegan] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  async function apiFetch() {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          import.meta.env.VITE_API_KEY
        }&includeIngredients=${ingredients}${diet ? `&diet=${diet}` : ""}${
          intolerances ? `&intolerances=${intolerances}` : ""
        }&number=12&addRecipeInformation=true`
      );
      data = response.data;
      console.log(data.results);
      setRecipes(data.results);
    } catch (error) {
      alert(`Error ${error}`);
    }
  }

  useEffect(() => {
    if (diet || intolerances) {
      apiFetch();
    }
  }, [diet, intolerances]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(vegan, vegetarian, glutenFree, dairyFree);
    updateChoices();
    apiFetch();
  };

  function updateChoices() {
    let newDiet = "";
    let newIntolerances = "";

    const diets = [
      vegan ? "vegan" : "",
      vegetarian ? "vegetarian" : "",
      glutenFree ? "Gluten Free" : "",
    ];
    const intolerances = [dairyFree ? "Dairy Free" : ""];

    newDiet = diets.filter((d) => d).join(",");
    setDiet(newDiet);
    newIntolerances = intolerances.filter((i) => i).join(", ");
    setIntolerances(newIntolerances);

    console.log(vegan, vegetarian, glutenFree, dairyFree);
    console.log(newDiet);
    console.log(diet);
  }

  return (
    <div className="container">
      <div className="search-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="search-btn">
            <input
              type="text"
              placeholder="Search Ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <input type="submit" value="Search" />
          </div>
          <p className="pForm">
            Vegan
            <input
              type="checkbox"
              className="checkform"
              checked={vegan}
              onChange={(e) => setVegan(e.target.checked)}
            />
          </p>
          <p className="pForm">
            Vegeterian
            <input
              type="checkbox"
              className="checkform"
              checked={vegetarian}
              onChange={(e) => setVegetarian(e.target.checked)}
            />
          </p>
          <p className="pForm">
            Gluten free
            <input
              type="checkbox"
              className="checkform"
              checked={glutenFree}
              onChange={(e) => setGlutenFree(e.target.checked)}
            />
          </p>
          <p className="pForm">
            Dairy Free
            <input
              type="checkbox"
              className="checkform"
              checked={dairyFree}
              onChange={(e) => setDairyFree(e.target.checked)}
            />
          </p>
        </form>
      </div>
      <div className="recipes-list">
        {recipes.map((recipe, index) => (
          <Recipe
            recipe={recipe}
            key={index}
            title={recipe.title}
            image={recipe.image}
            readyInMinutes={recipe.readyInMinutes}
            steps={recipe.analyzedInstructions[0]?.steps}
            favoriteRecipes={favoriteRecipes}
            setFavoriteRecipes={setFavoriteRecipes}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
