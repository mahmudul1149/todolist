// TARGET ELEMENT
const form = document.querySelector("#form");
const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const filter = document.querySelector("#filter");
const todoList = document.querySelector("#todo-list");
const clearBtn = document.querySelector("#clear-btn");

// Load all EventListeners
allEventListeners();

// Set All EventListeners
function allEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", todoAllSetFormDOM);
  // Add Goal event
  form.addEventListener("submit", addGoal);
  // Remove Goal event
  todoList.addEventListener("click", removeGoal);
  // All Goal Clear event
  clearBtn.addEventListener("click", allGoalClear);
  // Filter Goal event
  filter.addEventListener("keyup", filterGoal);
}

// Get and set todo list from DOM
function todoAllSetFormDOM() {
  let todoAll;
  if (localStorage.getItem("todoAll") === null) {
    todoAll = [];
  } else {
    todoAll = JSON.parse(localStorage.getItem("todoAll"));
  }

  todoAll.forEach(function (todo) {
    // Create li
    const li = document.createElement("li");
    // Add class
    li.className = "todo-item";
    // Append and add textnode
    li.appendChild(document.createTextNode(todo));
    // Create link
    const link = document.createElement("a");
    // Add class
    link.className = "remove-item";
    // Add innerHTML
    link.innerHTML = '<i class="fas fa-times"></i>';
    // Append link in li
    li.appendChild(link);
    // Append li in ul
    todoList.appendChild(li);
  });
}

// Add Goal
function addGoal(e) {
  if (todoInput.value === "") {
    alert("Please Add Your Goal");
  } else {
    // Create li
    const li = document.createElement("li");
    // Add class
    li.className = "todo-item";
    // Append and add textnode
    li.appendChild(document.createTextNode(todoInput.value));
    // Create link
    const link = document.createElement("a");
    // Add class
    link.className = "remove-item";
    // Add innerHTML
    link.innerHTML = '<i class="fas fa-times"></i>';
    // Append link in li
    li.appendChild(link);
    // Append li in ul
    todoList.appendChild(li);

    // Store doto in local storage
    storeTodoInLocalStorage(todoInput.value);

    // Clear input value
    todoInput.value = "";
  }

  e.preventDefault();
}

// Store In localStorage
function storeTodoInLocalStorage(todo) {
  let todoAll;

  if (localStorage.getItem("todoAll") === null) {
    todoAll = [];
  } else {
    todoAll = JSON.parse(localStorage.getItem("todoAll"));
  }

  todoAll.push(todo);

  localStorage.setItem("todoAll", JSON.stringify(todoAll));
}

// Remove Goal
function removeGoal(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();

    // Remove From Localstorage
    removeFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Remove Form Local Storage
function removeFromLocalStorage(todoItem) {
  let todoAll;

  if (localStorage.getItem("todoAll") === null) {
    todoAll = [];
  } else {
    todoAll = JSON.parse(localStorage.getItem("todoAll"));
  }

  todoAll.forEach(function (todo, index) {
    if (todoItem.textContent === todo) {
      todoAll.splice(index, 1);
    }
  });

  localStorage.setItem("todoAll", JSON.stringify(todoAll));
}

// All Goal Clear
function allGoalClear(e) {
  // // esey wary to clear
  // todoList.innerHTML = '';

  // Another way
  if (confirm("Are You Sure ?")) {
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
    }
  }

  // Clear All Goal From LocalStorage
  allGoalClearFromLocalStorage();
}

// Clear All Goal From LocalStorage
function allGoalClearFromLocalStorage() {
  localStorage.clear();
}

// Filter All Goal
function filterGoal(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".todo-item").forEach(function (todo) {
    const item = todo.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      todo.style.display = "block";
    } else {
      todo.style.display = "none";
    }
  });
}