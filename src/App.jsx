import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

//components
import Search from "./components/Search";
import Recipe from "./components/Recipe";
import NavBar from "./components/NavBar";
import ContactUs from "./components/ContactUs";
import FavoriteRecipes from "./components/FavoriteRecipes";

function App() {
  const [recipes, setRecipe] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    const localData = localStorage.getItem("favoriteRecipe");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoriteRecipe", JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  return (
    <div className="app-container">
      <NavBar />
      <Routes>
        <Route
          path="search"
          element={
            <Search
              setRecipe={setRecipe}
              recipes={recipes}
              setFavoriteRecipes={setFavoriteRecipes}
              favoriteRecipes={favoriteRecipes}
            />
          }
        />
        <Route path="recipe" element={<Recipe />} />
        <Route path="contact" element={<ContactUs />} />
        <Route
          path="favorites"
          element={<FavoriteRecipes setFavoriteRecipes={setFavoriteRecipes} />}
        />
      </Routes>
    </div>
  );
}

export default App;
