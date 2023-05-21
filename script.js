// Fetch the To-Do list from the server
fetch('/todos')
.then(response => response.json())
.then(todos => {
  const todoList = document.getElementById('todo-list');

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.content;

    if (todo.done) {
      li.classList.add('completed');
    }

    todoList.appendChild(li);
  });
});