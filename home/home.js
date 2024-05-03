// Search meal
const inputEle = document.querySelector('main input');
const searchResultEle = document.querySelector('#search-result');
inputEle.addEventListener('input', () => {
    searchMeal(inputEle.value);
});
async function searchMeal(mealName) {
    if (mealName !== '') {
        searchResultEle.innerHTML = '';
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName.replace(' ', '_')}`);
        const data = await response.json();
        const meals = data.meals;
        if (meals != null) {
            meals.forEach(meal => {
                if (meal != null) {
                    const result =
                        `<div class="list-group-item list-group-item-action list-group-item-success" aria-current="true">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${meal.strMeal}</h5>
                                <button class="btn btn-success">Add to favorites</button>
                            </div>
                            <p class="mb-1">${meal.strArea}</p>
                            <small>${meal.strCategory}</small>
                        </div>`
                    searchResultEle.insertAdjacentHTML('beforeend', result);
                }
            });
        } else {
            const result =
                `<div class="list-group-item list-group-item-success" aria-current="true">
                <p class="mb-1">No result found. Try a different meal.</p>
            </div>`
            searchResultEle.insertAdjacentHTML('beforeend', result);
        }
    } else {
        searchResultEle.innerHTML = '';
    }
}

searchResultEle.addEventListener('click', (event) => {
    // click listener in meal name for redirection to meal detail page
    if (event.target.tagName === 'H5') {
        const mealName = event.target.textContent;
        // Passing the meal name in the query parameter
        const redirectUrl = `../meal-detail/meal-detail.html?meal=${encodeURIComponent(mealName)}`;
        window.location.href = redirectUrl;
    } else if (event.target.tagName === 'BUTTON') {
        const mealName = event.target.previousElementSibling.textContent;
        addToLocalStorage(mealName);
    }
});

// Storing the fav meals in an array
// const favorites = [];
// function addtoFavMeal(mealName) {
//     favorites.push(mealName);
//     addToLocalStorage(mealName);
// }

// Storinging the favorites to the local storage for data persistence
function addToLocalStorage(mealName){
    localStorage.setItem(mealName, mealName);
    // const favoritesStr = JSON.stringify(favorites); //This approach also works but removing a specific item from the favorites array would not reflect in localStorage
    // localStorage.setItem('fav', favoritesStr);
}