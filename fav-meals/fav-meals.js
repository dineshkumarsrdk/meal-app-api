const favListEle = document.querySelector('#fav-list');
// Accessing the fav meals from local storage
// const favMeals = localStorage.getItem('fav');
// const meals = JSON.parse(favMeals);

// Displaying all the favorite meals
function displayFavMeals() {
    favListEle.innerHTML = '';
    for(let i=0;;i++){
        let meal = localStorage.key(i);
        if (meal != null) {
            const mealItem =
                `<div class="list-group-item list-group-item-action list-group-item-light" aria-current="true">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">${meal}</h5>
                            <button class="btn btn-danger">Remove</button>
                        </div>
                </div>`
            favListEle.insertAdjacentHTML('beforeend', mealItem);
        }else {
            break;
        }
    }
    if(favListEle.innerHTML === '') {
        const result =
                `<div class="list-group-item list-group-item-light" aria-current="true">
                    <p class="mb-1" style="color:grey;">Add meals to your favorite list!</p>
                </div>`
        favListEle.insertAdjacentHTML('beforeend', result);
    }
}

// Remove meal from favorite list
function removeFromFav(mealName) {
    localStorage.removeItem(mealName);
    displayFavMeals();
}

// Adding click listeners to remove button and for redirection to meal detail page
favListEle.addEventListener('click', (event) => {
    // click listener in meal name for redirection to meal detail page
    if (event.target.tagName === 'H5') {
        const mealName = event.target.textContent;
        // Passing the meal name in the query parameter
        const redirectUrl = `../meal-detail/meal-detail.html?meal=${encodeURIComponent(mealName)}`;
        window.location.href = redirectUrl;
    } else if (event.target.tagName === 'BUTTON') {
        const mealName = event.target.previousElementSibling.textContent;
        removeFromFav(mealName);
    }
});

displayFavMeals();