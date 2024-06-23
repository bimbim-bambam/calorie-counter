const calorieForm = document.getElementById('calorie-form');
const foodInput = document.getElementById('food');
const caloriesInput = document.getElementById('calories');
const calorieList = document.getElementById('calorie-list');
const totalCaloriesElement = document.getElementById('total-calories');

let totalCalories = 0;
let items = [];

document.addEventListener('DOMContentLoaded', loadItems);

calorieForm.addEventListener('submit', addItem);

function addItem(event) {
    event.preventDefault();
    
    const food = foodInput.value.trim();
    const calories = parseInt(caloriesInput.value.trim());

    if (food === '' || isNaN(calories) || calories <= 0) {
        alert('введи положительное число');
        return;
    }

    const item = { food, calories };
    items.push(item);
    saveItems();

    renderItem(item);

    totalCalories += calories;
    updateTotalCalories();

    foodInput.value = '';
    caloriesInput.value = '';
}

function renderItem(item) {
    const li = document.createElement('li');
    li.innerHTML = `${item.food} - ${item.calories} calories`;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.style.marginLeft = '30px';
    deleteButton.style.backgroundColor = '#333333';
    deleteButton.style.color = '#dc3545';
    deleteButton.style.border = '1px solid #dc3545';
    deleteButton.style.padding = '5px 10px';
    deleteButton.style.borderRadius = '4px';
    deleteButton.style.cursor = 'pointer';

    deleteButton.addEventListener('click', () => {
        calorieList.removeChild(li);
        totalCalories -= item.calories;
        updateTotalCalories();
        items = items.filter(i => i !== item);
        saveItems();
    });

    li.appendChild(deleteButton);
    calorieList.appendChild(li);
}

function updateTotalCalories() {
    totalCaloriesElement.textContent = totalCalories;
}

function saveItems() {
    localStorage.setItem('calorieItems', JSON.stringify(items));
    localStorage.setItem('totalCalories', totalCalories);
}

function loadItems() {
    const storedItems = localStorage.getItem('calorieItems');
    const storedTotalCalories = localStorage.getItem('totalCalories');

    if (storedItems) {
        items = JSON.parse(storedItems);
        items.forEach(item => renderItem(item));
    }

    if (storedTotalCalories) {
        totalCalories = parseInt(storedTotalCalories);
    }

    updateTotalCalories();
}
