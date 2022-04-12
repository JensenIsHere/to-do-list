import { format, parseISO } from "date-fns";

const task = (newTitle, newDesc, newDue, newMatrix) => {
  let title = newTitle;
  let desc = newDesc;
  let due = newDue;
  let matrix = newMatrix;
  let done = false;

  const getTitle = () => title;

  const getDesc = () => desc;

  const getDueDate = () => due;

  const getMatrix = () => matrix;

  const isDone = () => done;

  const changeTitle = (newTitle) => (title = newTitle);

  const changeDesc = (newDesc) => (desc = newDesc);

  const changeDueDate = (newDueDate) => (due = newDueDate);

  const changeMatrix = (newMatrix) => (matrix = newMatrix);

  const toggleDone = () => (done = !done);

  return {
    getTitle,
    getDesc,
    getDueDate,
    getMatrix,
    isDone,
    changeTitle,
    changeDesc,
    changeDueDate,
    changeMatrix,
    toggleDone,
  };
};

const toDoList = () => {
  let list = [];

  const getList = () => list;

  const getItem = (pos) => list[pos];

  const addTask = (newTask) => {
    list.push(newTask);
    sortMatrix();
  };

  const delTask = (pos) => list.splice(pos, 1);

  const editTask = (pos, title, desc, matrix, dueDate) => {
    list[pos].changeTitle(title);
    list[pos].changeDesc(desc);
    list[pos].changeMatrix(matrix);
    list[pos].changeDueDate(dueDate);
  };

  const sortMatrix = () => {
    sortByDate();
    doneFirst();
  };

  const sortByDate = () => {
    for (let i = 0; i < list.length - 1; i++) {
      for (let j = i; j < list.length - 1; j++) {
        if (list[j].getDueDate() > list[j + 1].getDueDate()) {
          swapElements(j, j + 1);
        }
      }
    }
  };

  const swapElements = (pos1, pos2) => {
    let placeholder = list[pos1];
    list[pos1] = list[pos2];
    list[pos2] = placeholder;
  };

  const doneFirst = () => {
    let doneItems = [];
    let notDoneItems = [];

    notDoneItems = list.filter((item) => item.isDone() == false);
    doneItems = list.filter((item) => item.isDone() == true);

    list = notDoneItems.concat(doneItems);
  };

  const getMatrix = (matrixType) => {
    let filteredList = [];

    filteredList = list.filter((item) => item.getMatrix() == matrixType);

    return filteredList;
  };

  const countMatrix = (matrixType) => {
    let filteredList;

    filteredList = getMatrix(matrixType);

    return filteredList.length;
  };

  return {
    getList,
    getItem,
    addTask,
    delTask,
    editTask,
    getMatrix,
    countMatrix,
    sortMatrix,
  };
};

//Beginning of DOM mainpulation

function taskCountUpdate(list) {
  document.getElementById("count_UI").innerHTML = list.countMatrix("UI");
  document.getElementById("count_NI").innerHTML = list.countMatrix("NI");
  document.getElementById("count_UN").innerHTML = list.countMatrix("UN");
  document.getElementById("count_NN").innerHTML = list.countMatrix("NN");
}

function nukeList() {
  document.querySelector(".list_content").innerHTML = "";
}

function divWithClass(newClass) {
  let element = document.createElement("div");
  element.className = newClass;
  return element;
}

function createTaskCard(currentTask, pos) {
  let taskCard = document.createDocumentFragment();
  let element = document.createElement("div");

  element.className = "task_card";
  taskCard.appendChild(element);

  element = divWithClass("checkbox");
  element.setAttribute("data-pos", pos);
  element.innerHTML = currentTask.isDone() ? "X" : "O";
  taskCard.querySelector(".task_card").appendChild(element);

  element = divWithClass("task_info");
  taskCard.querySelector(".task_card").appendChild(element);

  element = divWithClass("info_divide");
  taskCard.querySelector(".task_info").appendChild(element);

  element = divWithClass("matrix_src");
  element.innerHTML = currentTask.getMatrix();
  taskCard.querySelector(".info_divide").appendChild(element);

  element = divWithClass("due_date");
  element.innerHTML = format(new Date(currentTask.getDueDate()), "MMM dd");
  taskCard.querySelector(".info_divide").appendChild(element);

  element = divWithClass("task_title");
  element.innerHTML = currentTask.getTitle();
  taskCard.querySelector(".info_divide").appendChild(element);

  element = divWithClass("task_desc");
  element.innerHTML = currentTask.getDesc();
  taskCard.querySelector(".task_info").appendChild(element);

  element = divWithClass("options");
  taskCard.querySelector(".task_card").appendChild(element);

  element = divWithClass("edit");
  element.setAttribute("data-pos", pos);
  element.innerHTML = "Edit";
  taskCard.querySelector(".options").appendChild(element);

  element = divWithClass("delete");
  element.setAttribute("data-pos", pos);
  element.innerHTML = "Delete";
  taskCard.querySelector(".options").appendChild(element);

  document.querySelector(".list_content").appendChild(taskCard);
}

function renderList(object) {
  object.matrix = object.matrix || "all";
  for (let i = 0; i < object.list.length; i++) {
    if (object.matrix == "all" || object.list[i].getMatrix() == object.matrix)
      createTaskCard(object.list[i], i);
  }
}

function updateScreen(currentList) {
  nukeList();
  renderList({
    list: currentList.getList(),
    matrix: document.querySelector("header").dataset.matrix,
  });
  taskCountUpdate(currentList);
  saveList(currentList);
}

function toggleOverlay() {
  if (document.querySelector(".black_overlay").style.display == "block") {
    document.querySelector(".black_overlay").style.display = "none";
    document.querySelector(".white_content").style.display = "none";
  } else {
    document.querySelector(".black_overlay").style.display = "block";
    document.querySelector(".white_content").style.display = "block";
  }
}

function formValidate() {
  let title = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;
  let date = document.getElementById("due_date").value;
  return title != "" && desc != "" && date != "";
}

function getFormMatrixValue() {
  let inputs = document.querySelectorAll("input");
  let matrix;

  // Searches for the checked matrix in the form's radio buttons
  for (let i = 2; i < 6; i++) {
    if (inputs[i].checked == true) {
      matrix = inputs[i].id;
      break;
    }
  }

  return matrix;
}

//Corrects the date to be in UTC so tasks aren't one day behind
function correctDate(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function formNewTask(list) {
  let title = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;
  let matrix = getFormMatrixValue();
  let date = new Date(document.getElementById("due_date").value);
  date = correctDate(date);
  let newTask = task(title, desc, date, matrix);
  list.addTask(newTask);
}

function formReset() {
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.querySelectorAll("input")[2].checked = true;
  document.getElementById("due_date").value = "";
}

function populateAddBox() {
  document.getElementById("action").dataset.status = "add";
  document.getElementById("action").textContent = "Add Task";
  document.querySelector("legend").textContent = "Add a Task";
}

function populateEditBox(list, pos) {
  document.getElementById("title").value = list.getItem(pos).getTitle();
  document.getElementById("desc").value = list.getItem(pos).getDesc();
  document.querySelectorAll("input")[2].checked = true;
  document.getElementById("due_date").value = format(
    list.getItem(pos).getDueDate(),
    "yyyy-MM-dd"
  );
  document.getElementById(list.getItem(pos).getMatrix()).checked = true;
  document.getElementById("action").dataset.status = "edit";
  document.getElementById("action").dataset.pos = pos;
  document.getElementById("action").textContent = "Edit Task";
  document.querySelector("legend").textContent = "Edit Task";
}

document.querySelector(".add_task_button").addEventListener("click", () => {
  populateAddBox();
  toggleOverlay();
});

document.querySelector(".all").addEventListener("click", () => {
  document.querySelector("header").innerHTML = "All Tasks";
  document.querySelector("header").dataset.matrix = "all";
  updateScreen(currentList);
});

document.querySelector(".UI").addEventListener("click", () => {
  document.querySelector("header").innerHTML = "Urgent and Important";
  document.querySelector("header").dataset.matrix = "UI";
  updateScreen(currentList);
});

document.querySelector(".NI").addEventListener("click", () => {
  document.querySelector("header").innerHTML = "Not Urgent but Important";
  document.querySelector("header").dataset.matrix = "NI";
  updateScreen(currentList);
});

document.querySelector(".UN").addEventListener("click", () => {
  document.querySelector("header").innerHTML = "Urgent but Not Important";
  document.querySelector("header").dataset.matrix = "UN";
  updateScreen(currentList);
});

document.querySelector(".NN").addEventListener("click", () => {
  document.querySelector("header").innerHTML = "Neither Urgent nor Important";
  document.querySelector("header").dataset.matrix = "NN";
  updateScreen(currentList);
});

document.addEventListener("click", (e) => {
  if (e.target.className == "checkbox") {
    let pos = e.target.dataset.pos;
    currentList.getItem(e.target.dataset.pos).toggleDone();
    currentList.sortMatrix();
    updateScreen(currentList);
  }
  if (e.target.className == "delete") {
    let pos = e.target.dataset.pos;
    currentList.delTask(pos);
    currentList.sortMatrix();
    updateScreen(currentList);
  }
  if (e.target.className == "edit") {
    let pos = e.target.dataset.pos;
    populateEditBox(currentList, pos);
    toggleOverlay();
  }
  if (e.target.dataset.status == "add") {
    if (formValidate()) {
      formNewTask(currentList);
      formReset();
      updateScreen(currentList);
      toggleOverlay();
    } else alert("Please fill in all fields");
  }
  if (e.target.dataset.status == "edit") {
    if (formValidate()) {
      currentList.delTask(document.getElementById("action").dataset.pos);
      document.getElementById("action").dataset.pos = "";
      formNewTask(currentList);
      formReset();
      updateScreen(currentList);
      toggleOverlay();
    } else alert("Please fill in all fields");
  }
});

document.getElementById("clear").addEventListener("click", () => {
  formReset();
});

document.getElementById("cancel").addEventListener("click", () => {
  formReset();
  toggleOverlay();
});

//Local Storage manipulation

function loadList(list) {
  let i = 0;
  let currentTask;

  while (localStorage.getItem("title" + i)) {
    currentTask = task(
      localStorage.getItem("title" + i),
      localStorage.getItem("desc" + i),
      localStorage.getItem("dueDate" + i),
      localStorage.getItem("matrix" + i)
    );
    if (localStorage.getItem("done" + i) == true) currentTask.toggleDone();
    list.addTask(currentTask);
    i += 1;
  }
  updateScreen(list);
}

function saveList(list) {
  localStorage.clear();

  for (let i = 0; i < list.getList().length; i++) {
    localStorage.setItem("title" + i, list.getItem(i).getTitle());
    localStorage.setItem("desc" + i, list.getItem(i).getDesc());
    localStorage.setItem("dueDate" + i, list.getItem(i).getDueDate());
    localStorage.setItem("matrix" + i, list.getItem(i).getMatrix());
    localStorage.setItem("done" + i, list.getItem(i).isDone());
  }
}

//Program

var currentList = toDoList();
loadList(currentList);
