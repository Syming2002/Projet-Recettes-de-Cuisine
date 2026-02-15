const sectionContent = document.getElementById("section-content");

const formRecipe = document.getElementById("form-recipe");
const inputTitle = document.getElementById("input-title");
const inputCategory = document.getElementById("input-category");
const textAreaRecipeDetails = document.getElementById("textarea-recipe-details");

const addRecipeButton = document.getElementById("btn-add-recipe");

const searchDish = document.getElementById("search-dish");

const apply = document.getElementById("apply");

const divFavoriteRecipe = document.getElementById("div-recipe-favorite");

let favoriteRecipes = JSON.parse(localStorage.getItem("favorites")) || [];

let recipeId = 0;


function searchAndSortRecipes() {
    const categoryDish = document.getElementById("category-dish");

    const searchDishValue = searchDish.value.toLowerCase();
    const categoryDishValue = categoryDish.value;
    let result = recipes;


    if (categoryDishValue !== "all") {
        result = result.filter(r => r.categoryDish === categoryDishValue)
    }

    if (searchDishValue) {
        result = result.filter(r => r.title.toLowerCase().includes(searchDishValue));
    }

    displayFavorites(result);
}

searchDish.addEventListener("input", searchAndSortRecipes);

apply.addEventListener("click", searchAndSortRecipes);

class Favorites {
    constructor() {
        const savedRecipes = localStorage.getItem("favorites");
        this.recipes = savedRecipes ? JSON.parse(savedRecipes) : [];
    }

    addRecipe(recipe) {
        if (!this.recipes.some(r => r.id === recipe.id)) {
            this.recipes.push(recipe);
            this.save();
        }
    }

    removeRecipe(recipeId) {
        this.recipes = this.recipes.filter(r => r.id !== recipeId);
        this.save(); 
    }

    getAllRecipes() {
        return this.recipes;
    }

    save() {
        localStorage.setItem("favorites", JSON.stringify(this.recipes))
    }

    isFavourite(recipeId) {
        return this.recipes.some(r => r.id === recipeId);
    }

    toggleFavourite(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe) {
            recipe.favorite = !recipe.favorite;
        }
    }
}

const favoritesRecipes = new Favorites();

function displayFavorites(recipeArray) {
    divFavoriteRecipe.innerHTML = "";

    recipeArray.forEach(recipe => {
        if (favoritesRecipes.isFavourite(recipe.id)) {
        const divRecipe = document.createElement("div");

        const h3RecipeTitle = document.createElement("h3");
        const recipeDetails = document.createElement("p");
        const starButton = document.createElement("button");
        const deleteCross = document.createElement("button");

        starButton.classList.add("star-button");
        deleteCross.classList.add("delete-button");

        h3RecipeTitle.textContent = recipe.title;
        recipeDetails.textContent = recipe.details;

        starButton.textContent = favoritesRecipes.isFavourite(recipe.id) ? "⭐" : "☆";

        deleteCross.textContent = "✖";
        deleteCross.style.fontSize = "32px";

        h3RecipeTitle.style.textAlign = "center";
        recipeDetails.style.textAlign = "center";

        h3RecipeTitle.style.marginTop = "25px";
        recipeDetails.style.marginBottom = "25px";


        starButton.addEventListener("click", () => {
            if (favoritesRecipes.isFavourite(recipe.id)) {
                favoritesRecipes.removeRecipe(recipe.id);
            } else {
                favoritesRecipes.addRecipe(recipe);
            }

            displayFavorites(recipeArray);
        });

        deleteCross.addEventListener("click", () => {
            divRecipe.remove();
            recipeArray.splice(recipe.id - 1, 1);
            localStorage.setItem("recipes", JSON.stringify(recipeArray))
            localStorage.setItem("favorites", JSON.stringify(recipeArray));
        });

        divRecipe.append(h3RecipeTitle, recipeDetails, starButton, deleteCross);
        divFavoriteRecipe.appendChild(divRecipe);
    }
    });
}

displayFavorites(favoriteRecipes);