const sectionContent = document.getElementById("section-content");

const formRecipe = document.getElementById("form-recipe");
const inputTitle = document.getElementById("input-title");
const textAreaRecipeDetails = document.getElementById("textarea-recipe-details");

const addRecipeButton = document.getElementById("btn-add-recipe");

const searchDish = document.getElementById("search-dish");
const categoryDish = document.getElementById("category-dish");

const divNewRecipe = document.getElementById("div-new-recipe");

const recipeKey = "recipes";

const recipes = [];

function renderRecipe() {

}

formRecipe.addEventListener("submit", (e) => {
    e.preventDefault();

    const divRecipe = document.createElement("div");
    const inputTitleValue = inputTitle.value;
    const textAreaRecipeDetailsValue = textAreaRecipeDetails.value;

    if (!inputTitleValue || !textAreaRecipeDetailsValue) return;

    const h3RecipeTitle = document.createElement("h3");
    const recipeDetails = document.createElement('p');

    h3RecipeTitle.textContent = inputTitleValue;
    recipeDetails.textContent = textAreaRecipeDetailsValue;

    h3RecipeTitle.style.textAlign = "center";
    recipeDetails.style.textAlign = "center";

    h3RecipeTitle.style.marginTop = "25px";
    recipeDetails.style.marginBottom = "25px";

    divNewRecipe.appendChild(divRecipe);

    divRecipe.append(h3RecipeTitle, recipeDetails);

    localStorage.setItem(recipeKey, h3RecipeTitle.outerHTML);

    console.log("Recipe added");
});