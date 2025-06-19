const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const recipeContainer = document.getElementById('recipeContainer');

searchBtn.addEventListener('click', async () =>{
    const query = searchInput.value.trim();

    if(query === ""){
        alert('Please Enter an ingradient ! ')
        return
    }

    recipeContainer.innerHTML = `<p>Loading....</p>`;

    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
        const data = await response.json()

        if(!data.meals){
            recipeContainer.innerHTML = (`<p>No Recipe Found !</p>`);
            return
        }

        recipeContainer.innerHTML = '';
        data.meals.forEach((meal) =>{
            const recipecard = document.createElement('div');
            recipecard.classList.add('recipe-card')

            recipecard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <h3> ${meal.strMeal} </h3>
            <h5> Recipe ID : ${meal.idMeal}</h5>
            <a href="https://www.themealdb.com/meal.php?c=${meal.idMeal}" target="_blank">
          View Recipe
        </a>
            `

            recipeContainer.appendChild(recipecard)
        });
    }catch(error){
        recipeContainer.innerHTML = `<p> Something went Wrong! Please try again.`
        console.log(error); 
    }
});