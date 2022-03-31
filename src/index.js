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
  element.innerHTML = currentTask.getDueDate();
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

  for (let i = 2; i < 6; i++) {
    if (inputs[i].checked == true) {
      matrix = inputs[i].id;
      break;
    }
  }

  return matrix;
}

function formNewTask(list) {
  let title = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;
  let matrix = getFormMatrixValue();
  let date = document.getElementById("due_date").valueAsNumber;

  let newTask = task(title, desc, date, matrix);
  list.addTask(newTask);
}

function formReset() {
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.querySelectorAll("input")[2].checked = true;
  document.getElementById("due_date").value = "";
}

var trialTask1 = task(
  "Make Grocery List",
  "Make a grocery list before you pick up Jennita tonight",
  100000000,
  "UI"
);

var trialTask2 = task(
  "Pick up Jennita",
  "Get Jennita from the airport",
  100100000,
  "UI"
);

var trialTask3 = task(
  "Create a to-do list website",
  "Make a to-do list website to fulfill the project requirements",
  90000000,
  "NI"
);

var trialTask4 = task(
  "Sweep kitty litter",
  "Sweep up the kitty litter in the laundry room",
  90200000,
  "UN"
);

var trialTask5 = task(
  "Watch YouTube videos",
  "Waste time and slack off by watching videos online",
  90300000,
  "NN"
);

trialTask5.toggleDone();

var currentList = toDoList();

currentList.addTask(trialTask1);
currentList.addTask(trialTask5);
currentList.addTask(trialTask3);
currentList.addTask(trialTask4);
currentList.addTask(trialTask2);

renderList({ list: currentList.getList() });
taskCountUpdate(currentList);

document.querySelector(".add_task_button").addEventListener("click", () => {
  toggleOverlay();
});

document.querySelector(".all").addEventListener("click", () => {
  nukeList();
  renderList({ list: currentList.getList() });
  document.querySelector("header").innerHTML = "All Tasks";
});

document.querySelector(".UI").addEventListener("click", () => {
  nukeList();
  renderList({ list: currentList.getList(), matrix: "UI" });
  document.querySelector("header").innerHTML = "Urgent and Important";
  document.querySelector("header").dataset.matrix = "UI";
});

document.querySelector(".NI").addEventListener("click", () => {
  nukeList();
  renderList({ list: currentList.getList(), matrix: "NI" });
  document.querySelector("header").innerHTML = "Not Urgent but Important";
  document.querySelector("header").dataset.matrix = "NI";
});

document.querySelector(".UN").addEventListener("click", () => {
  nukeList();
  renderList({ list: currentList.getList(), matrix: "UN" });
  document.querySelector("header").innerHTML = "Urgent but Not Important";
  document.querySelector("header").dataset.matrix = "UN";
});

document.querySelector(".NN").addEventListener("click", () => {
  nukeList();
  renderList({ list: currentList.getList(), matrix: "NN" });
  document.querySelector("header").innerHTML = "Neither Urgent nor Important";
  document.querySelector("header").dataset.matrix = "NN";
});

document.addEventListener("click", (e) => {
  if (e.target.className == "checkbox") {
    let pos = e.target.dataset.pos;
    currentList.getList()[e.target.dataset.pos].toggleDone();
    currentList.sortMatrix();
    nukeList();
    renderList({
      list: currentList.getList(),
      matrix: document.querySelector("header").dataset.matrix,
    });
  }
});

document.getElementById("add_task").addEventListener("click", () => {
  if (formValidate()) {
    formNewTask(currentList);
    formReset();
    nukeList();
    renderList(currentList.getList());
    taskCountUpdate(currentList);
    toggleOverlay();
  } else alert("Please fill in all fields");
});

document.getElementById("clear").addEventListener("click", () => {
  formReset();
});

document.getElementById("cancel").addEventListener("click", () => {
  formReset();
  toggleOverlay();
});
