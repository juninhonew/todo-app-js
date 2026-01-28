const input = document.getElementById("taskInput");
const button = document.getElementById("addTask");
const list = document.getElementById("taskList");

// Garante input limpo (proteção contra extensões)
window.addEventListener("DOMContentLoaded", () => {
  input.value = "";
  loadTasks();
});

button.addEventListener("click", addTask);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = input.value.trim();

  if (taskText === "" || taskText.toLowerCase() === "auto-detection") {
    input.value = "";
    return;
  }

  createTask(taskText);
  saveTasks();
  input.value = "";
}

function createTask(text) {
  const li = document.createElement("li");
  li.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Excluir";

  deleteButton.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteButton);
  list.appendChild(li);
}

function saveTasks() {
  const tasks = [];

  document.querySelectorAll("#taskList li").forEach((li) => {
    const text = li.firstChild.textContent.trim();
    if (text) {
      tasks.push(text);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  list.innerHTML = "";

  tasks.forEach((task) => {
    if (task && task !== "auto-detection") {
      createTask(task);
    }
  });
}
