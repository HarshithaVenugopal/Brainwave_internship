const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const timeSelect = document.getElementById('task-time');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function formatHour(hour) {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:00 ${ampm}`;
}

function renderTasks() {
  list.innerHTML = '';
  tasks.sort((a, b) => a.time - b.time); // sort by time
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.className = 'time-label';
    span.textContent = `[${formatHour(task.time)}] `;

    li.appendChild(span);
    li.appendChild(document.createTextNode(task.text));

    li.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  const time = parseInt(timeSelect.value);
  if (text !== '' && time) {
    tasks.push({ text, time, completed: false });
    saveTasks();
    renderTasks();
    input.value = '';
    timeSelect.value = '';
  }
});

renderTasks();
