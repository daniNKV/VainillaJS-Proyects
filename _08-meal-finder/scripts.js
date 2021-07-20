let DOM = {
    search: document.getElementById('search'),
    submit: document.getElementById('submit'),
    random: document.getElementById('random'),
    mealsEl: document.getElementById('meals'),
    resultHeading: document.getElementById('result-heading'),
    singleMealEl: document.getElementById('single-meal')
}

// Search and fetch from API
function searchMeal(e) {
    e.preventDefault();

    // Clear single Meal
    DOM.singleMealEl.innerHTML = '';

    // Get search term
    const term = DOM.search.value;

    // Check for empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
          .then(res => res.json())
            .then(data => {
                console.log(data)
                DOM.resultHeading.innerHTML = `<h2>Search results for ${term}</h2>`

                if(data.meals === null) {
                    DOM.resultHeading.innerHTML = `<p>There is no results for ${term}</p>`
                }else {
                    DOM.mealsEl.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID=${meal.idMeal}>
                                <h3>${meal.strMeal}</h3>    
                            </div>
                        </div>`
                    ).join('')
                }
            });

            // Clear Search text
            DOM.search.value = '';

}else {
        alert('Please enter a search term')
    }
}

// fetch a single meal by ID
function getMealByID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealToDom(meal)
        })
}
// Fetch random meal
function getRandomMeal() {
    // Clear meals and heading
    DOM.mealsEl.innerHTML = '';
    DOM.resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0]

            addMealToDom(meal);
        })
}


// Add meal to DOM 
function addMealToDom (meal) {
    const ingredients = [];

    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }else {
            break;
        }
    }

    DOM.singleMealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : '' }
                ${meal.strArea ? `<p>${meal.strArea}</p>` : '' }
        </div> 
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                `;
}

// Event Listeners
DOM.submit.addEventListener('submit', searchMeal);
DOM.random.addEventListener('click', getRandomMeal);


DOM.mealsEl.addEventListener('click', e => {
    const mealInfo = e.composedPath().find(item => {
        if(item.classList) {
            return item.classList.contains('meal-info');
        }else {
            return false;
        }
    });

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealByID(mealID);
    }
})