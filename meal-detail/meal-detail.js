const mealNameEle = document.querySelector('#meal-name');
const mealImgEle = document.querySelector('#meal-img img');
const instructionEle = document.querySelector('#instructions');
const youtubeEle = document.querySelector('#youtube');
// Exporting the displayMealDetails function and call it from home.js when a meal from search result is clicked
async function displayMealDetails() {
    // accessing the query paramater
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const mealName = urlParams.get('meal');
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName.replace(' ', '_')}`);
    const data = await response.json();
    const meal = data.meals[0];
    mealNameEle.textContent = meal.strMeal;
    mealImgEle.src = meal.strMealThumb;
    instructionEle.textContent = meal.strInstructions;
    youtubeEle.href=meal.strYoutube;
}

displayMealDetails();