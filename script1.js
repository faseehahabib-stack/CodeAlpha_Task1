const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
};

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  addTaskToDOM(taskText, false);
  saveTasks();
  taskInput.value = "";
}

function addTaskToDOM(text, completed) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="${completed ? 'completed' : ''}" onclick="toggleComplete(this)">${text}</span>
    <div class="actions">
      <button onclick="editTask(this)">Edit</button>
      <button class="delete" onclick="deleteTask(this)">Delete</button>
    </div>
  `;
  taskList.appendChild(li);
}

function toggleComplete(span) {
  span.classList.toggle('completed');
  saveTasks();
}

function editTask(button) {
  const span = button.parentElement.previousElementSibling;
  const newTask = prompt("Edit your task:", span.textContent);
  if (newTask) {
    span.textContent = newTask;
    saveTasks();
  }
}

function deleteTask(button) {
  button.parentElement.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const span = li.querySelector("span");
    tasks.push({ text: span.textContent, completed: span.classList.contains("completed") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
