const submit = document.getElementById('submit');
const searchInput = document.querySelector('.search-input');
const btnSearch = document.querySelector('.btn--search');
const btnRandom = document.querySelector('.btn--random');

const wordSearch = document.querySelector('.word-search');
const mealList = document.querySelector('.meal-list');
const singleMeal = document.querySelector('#single-meal');

function searchMeal(e) {
  e.preventDefault();

  const term = searchInput.value;

  if (term.trim()) {
    //fetch data
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        const meals = data.meals;
        // console.log(meals);

        wordSearch.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (meals === null) {
          wordSearch.innerHTML = `<p>There are no search results. Try again!<p>`;
        } else {
          mealList.innerHTML = meals
            .map(meal => {
              return `
                <li class='meal-item'>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealId="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                </li>
                `;
            })
            .join('');
        }
      });
  } else {
    alert('Please enter a search term');
  }
  searchInput.value = '';
}

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      console.log(meal);

      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  //   console.log(ingredients);

  singleMeal.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
      </ul>
    </div>
  </div>
`;
}

// Fetch random meal from API
function getRandomMeal() {
  // Clear meals and heading
  mealList.innerHTML = '';
  wordSearch.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Event listener
submit.addEventListener('submit', searchMeal);
mealList.addEventListener('click', e => {
  // Get the element that contains meal-info class
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealID');
    getMealById(mealID);
  }
});

btnRandom.addEventListener('click', getRandomMeal);
