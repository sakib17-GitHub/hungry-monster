const searchFood = () => {
    const searchText = document.getElementById('search-input').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(response=> response.json())
    .then(data => displayMeals(data.meals))
    .catch(data=> displayError(data))
}

const displayMeals = meals =>{
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML='';
    document.getElementById('error-message').innerHTML='';
    document.getElementById('meal-details-container').innerHTML='';
    meals.forEach(meal => {
    const mealBox = document.createElement('div');
    mealBox.className = 'meal-box';
    const mealInfo = `
    <img onclick="displayFoodDetails('${meal.strMeal}')" src="${meal.strMealThumb}">
    <h5 onclick="displayFoodDetails('${meal.strMeal}')">${meal.strMeal}</h5>`
    mealBox.innerHTML = mealInfo;
    mealContainer.appendChild(mealBox);    
   })
   
}
const displayFoodDetails= meal =>{
    const url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    fetch(url)
    .then(response => response.json())
    .then(mealDetail => {
    foodDetailsInfo(mealDetail.meals[0])
    })
}

const foodDetailsInfo = food =>{
    
    const mealDetailsContainer = document.getElementById('meal-details-container');
    mealDetailsContainer.innerHTML = `
    <img src="${food.strMealThumb}">
    <h3>${food.strMeal}</h3>
    <h4>Ingredient </h4>
    <ul>
        <li>${food.strIngredient1}</li>
        <li>${food.strIngredient2}</li>
        <li>${food.strIngredient3}</li>
        <li>${food.strIngredient4}</li>
        <li>${food.strIngredient5}</li>
        <li>${food.strIngredient6}</li>
        <li>${food.strIngredient7}</li>
        <li>${food.strIngredient8}</li>
    </ul>`

}

const displayError = data =>{
    const errorMessage = document.getElementById('error-message');   
    errorMessage.innerHTML=`
    <h3> We Can't Find Any Dish With This Name!!</h3>
    <h5> Please Check Your Input And Search Again. </h5>`
}