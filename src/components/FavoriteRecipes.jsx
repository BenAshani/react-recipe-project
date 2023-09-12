import React, { useEffect, useState } from "react";
import "./FavoriteRecipes.css";

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const localData = localStorage.getItem("favoriteRecipe");
    if (localData) {
      setFavoriteRecipes(JSON.parse(localData));
    }
  }, []);

  const removeFromFavorites = (index) => {
    const updatedFavorites = [...favoriteRecipes];
    updatedFavorites.splice(index, 1);

    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem("favoriteRecipe", JSON.stringify(updatedFavorites));

    setIsDelete(true);

    setTimeout(() => {
      setIsDelete(false);
    }, 400);
  };

  return (
    <div className="favorite-recipes-container">
      <h2>My Favorite Recipes</h2>
      <ul className="favorite-ul">
        <div className="favorite-recipes">
          {favoriteRecipes.map((recipe, index) => (
            <li key={index} className="recipes-li">
              <img src={recipe.image} alt={recipe.title} />
              <h2>{recipe.title}</h2>
              <p>Cooking Time: {recipe.readyInMinutes} minutes</p>
              <div className="ingredients-container">
                <h3>Steps:</h3>
                <ol>
                  {recipe.analyzedInstructions[0]?.steps.map((step, i) => (
                    <li key={i}>{step.step}</li>
                  ))}
                </ol> 
                
                <div
                  className={`delete-button ${isDelete ? "clicked" : ""}`}
                  onClick={() => removeFromFavorites(index)}
                >
                  <img src="images/dislike.png" alt="Remove" />
                  <p>Remove from My Favorites</p>
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
