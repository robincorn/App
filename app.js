const state = {
    screen: "launcher",

    goals: JSON.parse(
        localStorage.getItem("goals") ||
        '{"calories":2200,"protein":180}'
    ),

    entries: JSON.parse(
        localStorage.getItem("entries") ||
        "{}"
    ),

    weights: JSON.parse(
        localStorage.getItem("weights") ||
        "[]"
    )
};

const today = new Date()
    .toISOString()
    .split("T")[0];

if (!state.entries[today]) {
    state.entries[today] = [];
}

function save() {

    localStorage.setItem(
        "goals",
        JSON.stringify(state.goals)
    );

    localStorage.setItem(
        "entries",
        JSON.stringify(state.entries)
    );

    localStorage.setItem(
        "weights",
        JSON.stringify(state.weights)
    );
}

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(el =>
            el.classList.add("hidden")
        );

    document
        .getElementById(id)
        .classList.remove("hidden");
}

function showFitnessTab(tab) {

    document
        .querySelectorAll(".fitness-tab")
        .forEach(el =>
            el.classList.add("hidden")
        );

    document
        .getElementById("tab-" + tab)
        .classList.remove("hidden");
}

function addFood() {

    const food = {
        id: Date.now(),
        name: document.getElementById("foodName").value,
        calories: Number(
            document.getElementById("foodCalories").value
        ),
        protein: Number(
            document.getElementById("foodProtein").value
        ),
        carbs: Number(
            document.getElementById("foodCarbs").value
        ),
        fat: Number(
            document.getElementById("foodFat").value
        )
    };

    if (!food.name) return;

    state.entries[today].push(food);

    save();
    render();

    document.getElementById("foodName").value = "";
    document.getElementById("foodCalories").value = "";
    document.getElementById("foodProtein").value = "";
    document.getElementById("foodCarbs").value = "";
    document.getElementById("foodFat").value = "";
}

function deleteFood(id) {

    state.entries[today] =
        state.entries[today].filter(
            food => food.id !== id
        );

    save();
    render();
}

function saveGoals() {

    state.goals.calories = Number(
        document.getElementById("goalCalories").value
    );

    state.goals.protein = Number(
        document.getElementById("goalProtein").value
    );

    save();
    render();
}

function addWeight() {

    const weight = Number(
        document.getElementById("weightInput").value
    );

    if (!weight) return;

    state.weights.unshift({
        date: today,
        weight
    });

    save();
    render();

    document.getElementById(
        "weightInput"
    ).value = "";
}

function renderHistory() {

    const container =
        document.getElementById("historyList");

    container.innerHTML = "";

    Object.keys(state.entries)
        .sort()
        .reverse()
        .forEach(date => {

            const calories =
                state.entries[date]
                .reduce(
                    (sum, food) =>
                        sum + food.calories,
                    0
                );

            container.innerHTML += `
                <div class="card">
                    <strong>${date}</strong>
                    <br>
                    ${calories} kcal
                </div>
            `;
        });
}

function renderWeights() {

    const container =
        document.getElementById("weightList");

    container.innerHTML = "";

    state.weights.forEach(item => {

        container.innerHTML += `
            <div class="card">
                <strong>${item.weight} kg</strong>
                <br>
                ${item.date}
            </div>
        `;
    });
}

function renderFoods() {

    const foods =
        state.entries[today];

    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    const list =
        document.getElementById("foodList");

    list.innerHTML = "";

    foods.forEach(food => {

        calories += food.calories;
        protein += food.protein;
        carbs += food.carbs;
        fat += food.fat;

        list.innerHTML += `
            <div class="card">
                <strong>${food.name}</strong>
                <br>
                ${food.calories} kcal
                · P ${food.protein}
                · C ${food.carbs}
                · F ${food.fat}
                <br><br>
                <button onclick="deleteFood(${food.id})">
                    Löschen
                </button>
            </div>
        `;
    });

    document.getElementById(
        "totalCalories"
    ).textContent = calories;

    document.getElementById(
        "totalProtein"
    ).textContent = protein + "g";

    document.getElementById(
        "totalCarbs"
    ).textContent = carbs + "g";

    document.getElementById(
        "totalFat"
    ).textContent = fat + "g";

    document.getElementById(
        "calorieGoal"
    ).textContent =
        "/ " +
        state.goals.calories;

    document.getElementById(
        "proteinGoal"
    ).textContent =
        "/ " +
        state.goals.protein +
        "g";
}

function render() {

    renderFoods();
    renderHistory();
    renderWeights();

    document.getElementById(
        "goalCalories"
    ).value =
        state.goals.calories;

    document.getElementById(
        "goalProtein"
    ).value =
        state.goals.protein;
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        render();

        if (
            "serviceWorker" in navigator
        ) {
            navigator.serviceWorker.register(
                "./sw.js"
            );
        }
    }
);