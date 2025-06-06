// Load tasks from localStorage when the page loads
window.onload = function () {
  loadTasks();
};

// Add a new task to the list and localStorage
function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();

  if (taskText === "") return;

  createTaskElement(taskText);
  saveTaskToLocalStorage(taskText);
  input.value = "";
}

// Make a new list item and add it to the task list
function createTaskElement(taskText, isCompleted = false) {
  const list = document.getElementById("task-list");
  const listItem = document.createElement("li");

  // Add 'completed' class if task was previously marked complete
  if (isCompleted) listItem.classList.add("completed");

  // Create task content and buttons
  listItem.innerHTML = `
    ${taskText}
    <span>
      <button onclick="toggleComplete(this)">✔</button>
      <button class="delete-btn" onclick="deleteTask(this)">✖</button>
    </span>
  `;

  list.appendChild(listItem);
}

// Delete a task from the DOM and update localStorage
function deleteTask(button) {
  const taskItem = button.closest("li");
  removeTaskFromLocalStorage(taskItem.textContent.trim());
  taskItem.remove();
}

// Toggle task completion state and update localStorage
function toggleComplete(button) {
  const taskItem = button.closest("li");
  taskItem.classList.toggle("completed");
  updateCompletionInLocalStorage(taskItem.textContent.trim(), taskItem.classList.contains("completed"));
}

// Save task to localStorage
function saveTaskToLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage and render them
function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

// Remove a task by text from localStorage
function removeTaskFromLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update completion state in localStorage
function updateCompletionInLocalStorage(taskText, isCompleted) {
  const tasks = getTasksFromLocalStorage();
  const task = tasks.find(t => t.text === taskText);
  if (task) task.completed = isCompleted;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get task list from localStorage or return empty array
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
