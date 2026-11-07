document.addEventListener("DOMContentLoaded", () => {
  // using this event listener cuz
  //  DOMContentLoaded fires when the browser has finished parsing the HTML and built the DOM
  // hence selecting an element will not give null value
  const input = document.querySelector("#todo-input");
  const addBtn = document.querySelector("#add-task-btn");
  const list = document.querySelector("#todo-list");

  let todos = JSON.parse(localStorage.getItem("tasks")) || []; // when page is loaded todos is either an array obtained from localStorage
  // or an empty array if localStorage is empty

  todos.forEach((task) => renderTask(task)); // as soon as the page is loaded this loop will run and will
  // call renderTask() fn for each and every task in the array todos

  addBtn.addEventListener("click", function () {
    const inputText = input.value.trim();
    if (inputText === "") return;
    const newList = {
      id: Date.now(),
      text: inputText,
      isCompleted: false,
    };
    todos.push(newList);
    saveTask();
    renderTask(newList);
    input.value = "";
    console.log(todos);
  });

  function renderTask(task) {
    
    const newTask = document.createElement("li");
    list.setAttribute("data-id", task.id);
    if (task.isCompleted) {
      newTask.classList.add("completed");
    }
    newTask.innerHTML = `<span>${task.text}</span>
       <button>DELETE</button>`;
    list.appendChild(newTask);

    newTask.addEventListener("click", (e) => {
      // The browser keeps a list of listeners per element.
      //  When you click, it finds the <li>, sees the registered callback, and calls it.
      if (e.target.tagName === "BUTTON") return;
      task.isCompleted = !task.isCompleted;
      newTask.classList.toggle("completed");
      saveTask();
    });

    newTask.querySelector("button").addEventListener("click", (e) => {
      e.preventDefault(); // this prevents event bubbling without this line 38 will also run
      todos = todos.filter((t) => t.id !== task.id);
      newTask.remove();
      saveTask();
    });
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(todos));
  }
});
