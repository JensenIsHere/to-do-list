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
    sortByDate();
    doneFirst();
  };

  const delTask = (pos) => list.splice(pos, 1);

  const sortByDate = () => {
    for (let i = 0; i < list.length - 1; i++) {
      for (let j = i; j < list.length - 1; j++) {
        if (list[j].getDueDate() > list[j + 1].getDueDate())
          swapElements(j, j + 1);
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

  return { getList, getItem, addTask, delTask, getMatrix, countMatrix };
};

//Beginning of DOM mainpulation

function nukeList() {
  document.querySelector(".list_content").innerHTML = "";
}

function createTaskCard(currentTask, pos) {
  let taskCard = document.createDocumentFragment();
  let element = document.createElement("div");

  element.className = "task_card";
  taskCard.appendChild(element);

  element = divWithClass("checkbox");
  element.setAttribute("data-pos", pos);
  element.innerHTML = "C";
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

function divWithClass(newClass) {
  let element = document.createElement("div");
  element.className = newClass;
  return element;
}

function renderList(currentList) {
  for (let i = 0; i < currentList.length; i++) {
    createTaskCard(currentList[i], i);
  }
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

console.log(currentList.countMatrix("UI"));

renderList(currentList.getMatrix("UI"));

console.log(currentList.getList());
