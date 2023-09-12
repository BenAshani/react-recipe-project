import { useEffect, useState } from "react";
import "./Recipe.css";

export default function Recipe({
  recipe,
  title,
  image,
  readyInMinutes,
  steps,
  setFavoriteRecipes,
  favoriteRecipes,
}) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const localData = localStorage.getItem("favoriteRecipe");
    if (localData) {
      setFavoriteRecipes(JSON.parse(localData));
    }
  }, []);

  const logObject = () => {
    const updatedFavorites = [...favoriteRecipes, recipe];
    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem("favoriteRecipe", JSON.stringify(updatedFavorites));

    setIsLiked(true);

    setTimeout(() => {
      setIsLiked(false);
    }, 400);
  };

  return (
    <div className="recipe-container">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>Ready in {readyInMinutes} minutes</p>
      {steps ? (
        <div className="recipe-steps">
          <h3>Instructions:</h3>
          <ol>
            {steps.map((step, index) => (
              <li key={index}>{step.step}</li>
            ))}
          </ol>
        </div>
      ) : (
        <p>No instructions available.</p>
      )}
      <hr />
      <div
        className={`like-button ${isLiked ? "clicked" : ""}`}
        onClick={logObject}
      >
        <img src="images/like.png" />
        <p>Add to My Favorite</p>
      </div>
    </div>
  );
}
