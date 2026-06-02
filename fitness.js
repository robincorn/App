let foods = JSON.parse(
    localStorage.getItem('foods') || '[]'
);

let goals = JSON.parse(
    localStorage.getItem('goals') ||
    '{"calories":2200,"protein":180}'
);

function initFitness(){

    document.getElementById('goalCalories').value =
        goals.calories;

    document.getElementById('goalProtein').value =
        goals.protein;

    renderFoods();
}

function saveFoods(){

    localStorage.setItem(
        'foods',
        JSON.stringify(foods)
    );
}

function saveGoals(){

    goals = {
        calories: Number(
            document.getElementById('goalCalories').value
        ),
        protein: Number(
            document.getElementById('goalProtein').value
        )
    };

    localStorage.setItem(
        'goals',
        JSON.stringify(goals)
    );

    renderFoods();
}

function addFood(){

    const food = {
        id: Date.now(),
        name: document.getElementById('name').value,
        calories: Number(document.getElementById('calories').value),
        protein: Number(document.getElementById('protein').value),
        carbs: Number(document.getElementById('carbs').value),
        fat: Number(document.getElementById('fat').value)
    };

    if(!food.name) return;

    foods.push(food);

    saveFoods();

    renderFoods();

    document.getElementById('name').value = '';
    document.getElementById('calories').value = '';
    document.getElementById('protein').value = '';
    document.getElementById('carbs').value = '';
    document.getElementById('fat').value = '';
}

function deleteFood(id){

    foods = foods.filter(
        food => food.id !== id
    );

    saveFoods();

    renderFoods();
}

function renderFoods(){

    const list =
        document.getElementById('foodList');

    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    list.innerHTML = '';

    foods.forEach(food => {

        calories += food.calories;
        protein += food.protein;
        carbs += food.carbs;
        fat += food.fat;

        const div =
            document.createElement('div');

        div.className = 'food-item';

        div.innerHTML = `
            <strong>${food.name}</strong><br>
            ${food.calories} kcal |
            P ${food.protein}g |
            C ${food.carbs}g |
            F ${food.fat}g
            <br><br>
            <button onclick="deleteFood(${food.id})">
                Löschen
            </button>
        `;

        list.appendChild(div);
    });

    document.getElementById('totalCalories').textContent =
        calories;

    document.getElementById('totalProtein').textContent =
        protein + 'g';

    document.getElementById('totalCarbs').textContent =
        carbs + 'g';

    document.getElementById('totalFat').textContent =
        fat + 'g';

    document.getElementById('calorieGoalLabel').textContent =
        '/ ' + goals.calories;

    document.getElementById('proteinGoalLabel').textContent =
        '/ ' + goals.protein + 'g';
}

document.addEventListener(
    'DOMContentLoaded',
    initFitness
);