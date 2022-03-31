/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const task = (newTitle, newDesc, newDue, newMatrix) => {\n  let title = newTitle;\n  let desc = newDesc;\n  let due = newDue;\n  let matrix = newMatrix;\n  let done = false;\n\n  const getTitle = () => title;\n\n  const getDesc = () => desc;\n\n  const getDueDate = () => due;\n\n  const getMatrix = () => matrix;\n\n  const isDone = () => done;\n\n  const changeTitle = (newTitle) => (title = newTitle);\n\n  const changeDesc = (newDesc) => (desc = newDesc);\n\n  const changeDueDate = (newDueDate) => (due = newDueDate);\n\n  const changeMatrix = (newMatrix) => (matrix = newMatrix);\n\n  const toggleDone = () => (done = !done);\n\n  return {\n    getTitle,\n    getDesc,\n    getDueDate,\n    getMatrix,\n    isDone,\n    changeTitle,\n    changeDesc,\n    changeDueDate,\n    changeMatrix,\n    toggleDone,\n  };\n};\n\nconst toDoList = () => {\n  let list = [];\n\n  const getList = () => list;\n\n  const getItem = (pos) => list[pos];\n\n  const addTask = (newTask) => {\n    list.push(newTask);\n    sortMatrix();\n  };\n\n  const delTask = (pos) => list.splice(pos, 1);\n\n  const sortMatrix = () => {\n    sortByDate();\n    doneFirst();\n  };\n\n  const sortByDate = () => {\n    for (let i = 0; i < list.length - 1; i++) {\n      for (let j = i; j < list.length - 1; j++) {\n        if (list[j].getDueDate() > list[j + 1].getDueDate()) {\n          swapElements(j, j + 1);\n        }\n      }\n    }\n  };\n\n  const swapElements = (pos1, pos2) => {\n    let placeholder = list[pos1];\n    list[pos1] = list[pos2];\n    list[pos2] = placeholder;\n  };\n\n  const doneFirst = () => {\n    let doneItems = [];\n    let notDoneItems = [];\n\n    notDoneItems = list.filter((item) => item.isDone() == false);\n    doneItems = list.filter((item) => item.isDone() == true);\n\n    list = notDoneItems.concat(doneItems);\n  };\n\n  const getMatrix = (matrixType) => {\n    let filteredList = [];\n\n    filteredList = list.filter((item) => item.getMatrix() == matrixType);\n\n    return filteredList;\n  };\n\n  const countMatrix = (matrixType) => {\n    let filteredList;\n\n    filteredList = getMatrix(matrixType);\n\n    return filteredList.length;\n  };\n\n  return {\n    getList,\n    getItem,\n    addTask,\n    delTask,\n    getMatrix,\n    countMatrix,\n    sortMatrix,\n  };\n};\n\n//Beginning of DOM mainpulation\n\nfunction taskCountUpdate(list) {\n  document.getElementById(\"count_UI\").innerHTML = list.countMatrix(\"UI\");\n  document.getElementById(\"count_NI\").innerHTML = list.countMatrix(\"NI\");\n  document.getElementById(\"count_UN\").innerHTML = list.countMatrix(\"UN\");\n  document.getElementById(\"count_NN\").innerHTML = list.countMatrix(\"NN\");\n}\n\nfunction nukeList() {\n  document.querySelector(\".list_content\").innerHTML = \"\";\n}\n\nfunction divWithClass(newClass) {\n  let element = document.createElement(\"div\");\n  element.className = newClass;\n  return element;\n}\n\nfunction createTaskCard(currentTask, pos) {\n  let taskCard = document.createDocumentFragment();\n  let element = document.createElement(\"div\");\n\n  element.className = \"task_card\";\n  taskCard.appendChild(element);\n\n  element = divWithClass(\"checkbox\");\n  element.setAttribute(\"data-pos\", pos);\n  element.innerHTML = currentTask.isDone() ? \"X\" : \"O\";\n  taskCard.querySelector(\".task_card\").appendChild(element);\n\n  element = divWithClass(\"task_info\");\n  taskCard.querySelector(\".task_card\").appendChild(element);\n\n  element = divWithClass(\"info_divide\");\n  taskCard.querySelector(\".task_info\").appendChild(element);\n\n  element = divWithClass(\"matrix_src\");\n  element.innerHTML = currentTask.getMatrix();\n  taskCard.querySelector(\".info_divide\").appendChild(element);\n\n  element = divWithClass(\"due_date\");\n  element.innerHTML = currentTask.getDueDate();\n  taskCard.querySelector(\".info_divide\").appendChild(element);\n\n  element = divWithClass(\"task_title\");\n  element.innerHTML = currentTask.getTitle();\n  taskCard.querySelector(\".info_divide\").appendChild(element);\n\n  element = divWithClass(\"task_desc\");\n  element.innerHTML = currentTask.getDesc();\n  taskCard.querySelector(\".task_info\").appendChild(element);\n\n  element = divWithClass(\"options\");\n  taskCard.querySelector(\".task_card\").appendChild(element);\n\n  element = divWithClass(\"edit\");\n  element.setAttribute(\"data-pos\", pos);\n  element.innerHTML = \"Edit\";\n  taskCard.querySelector(\".options\").appendChild(element);\n\n  element = divWithClass(\"delete\");\n  element.setAttribute(\"data-pos\", pos);\n  element.innerHTML = \"Delete\";\n  taskCard.querySelector(\".options\").appendChild(element);\n\n  document.querySelector(\".list_content\").appendChild(taskCard);\n}\n\nfunction renderList(object) {\n  object.matrix = object.matrix || \"all\";\n  for (let i = 0; i < object.list.length; i++) {\n    if (object.matrix == \"all\" || object.list[i].getMatrix() == object.matrix)\n      createTaskCard(object.list[i], i);\n  }\n}\n\nfunction toggleOverlay() {\n  if (document.querySelector(\".black_overlay\").style.display == \"block\") {\n    document.querySelector(\".black_overlay\").style.display = \"none\";\n    document.querySelector(\".white_content\").style.display = \"none\";\n  } else {\n    document.querySelector(\".black_overlay\").style.display = \"block\";\n    document.querySelector(\".white_content\").style.display = \"block\";\n  }\n}\n\nfunction formValidate() {\n  let title = document.getElementById(\"title\").value;\n  let desc = document.getElementById(\"desc\").value;\n  let date = document.getElementById(\"due_date\").value;\n  return title != \"\" && desc != \"\" && date != \"\";\n}\n\nfunction getFormMatrixValue() {\n  let inputs = document.querySelectorAll(\"input\");\n\n  for (let i = 2; i < 6; i++) {\n    if (inputs[i].checked == true) {\n      matrix = inputs[i].id;\n      break;\n    }\n  }\n\n  return matrix;\n}\n\nfunction formNewTask(list) {\n  let title = document.getElementById(\"title\").value;\n  let desc = document.getElementById(\"desc\").value;\n  let matrix = getFormMatrixValue();\n  let date = document.getElementById(\"due_date\").valueAsNumber;\n\n  let newTask = task(title, desc, date, matrix);\n  list.addTask(newTask);\n}\n\nfunction formReset() {\n  document.getElementById(\"title\").value = \"\";\n  document.getElementById(\"desc\").value = \"\";\n  document.querySelectorAll(\"input\")[2].checked = true;\n  document.getElementById(\"due_date\").value = \"\";\n}\n\nvar trialTask1 = task(\n  \"Make Grocery List\",\n  \"Make a grocery list before you pick up Jennita tonight\",\n  100000000,\n  \"UI\"\n);\n\nvar trialTask2 = task(\n  \"Pick up Jennita\",\n  \"Get Jennita from the airport\",\n  100100000,\n  \"UI\"\n);\n\nvar trialTask3 = task(\n  \"Create a to-do list website\",\n  \"Make a to-do list website to fulfill the project requirements\",\n  90000000,\n  \"NI\"\n);\n\nvar trialTask4 = task(\n  \"Sweep kitty litter\",\n  \"Sweep up the kitty litter in the laundry room\",\n  90200000,\n  \"UN\"\n);\n\nvar trialTask5 = task(\n  \"Watch YouTube videos\",\n  \"Waste time and slack off by watching videos online\",\n  90300000,\n  \"NN\"\n);\n\ntrialTask5.toggleDone();\n\nvar currentList = toDoList();\n\ncurrentList.addTask(trialTask1);\ncurrentList.addTask(trialTask5);\ncurrentList.addTask(trialTask3);\ncurrentList.addTask(trialTask4);\ncurrentList.addTask(trialTask2);\n\nrenderList({ list: currentList.getList() });\ntaskCountUpdate(currentList);\n\ndocument.querySelector(\".add_task_button\").addEventListener(\"click\", () => {\n  toggleOverlay();\n});\n\ndocument.querySelector(\".all\").addEventListener(\"click\", () => {\n  nukeList();\n  renderList({ list: currentList.getList() });\n  document.querySelector(\"header\").innerHTML = \"All Tasks\";\n});\n\ndocument.querySelector(\".UI\").addEventListener(\"click\", () => {\n  nukeList();\n  renderList({ list: currentList.getList(), matrix: \"UI\" });\n  document.querySelector(\"header\").innerHTML = \"Urgent and Important\";\n  document.querySelector(\"header\").dataset.matrix = \"UI\";\n});\n\ndocument.querySelector(\".NI\").addEventListener(\"click\", () => {\n  nukeList();\n  renderList({ list: currentList.getList(), matrix: \"NI\" });\n  document.querySelector(\"header\").innerHTML = \"Not Urgent but Important\";\n  document.querySelector(\"header\").dataset.matrix = \"NI\";\n});\n\ndocument.querySelector(\".UN\").addEventListener(\"click\", () => {\n  nukeList();\n  renderList({ list: currentList.getList(), matrix: \"UN\" });\n  document.querySelector(\"header\").innerHTML = \"Urgent but Not Important\";\n  document.querySelector(\"header\").dataset.matrix = \"UN\";\n});\n\ndocument.querySelector(\".NN\").addEventListener(\"click\", () => {\n  nukeList();\n  renderList({ list: currentList.getList(), matrix: \"NN\" });\n  document.querySelector(\"header\").innerHTML = \"Neither Urgent nor Important\";\n  document.querySelector(\"header\").dataset.matrix = \"NN\";\n});\n\ndocument.addEventListener(\"click\", (e) => {\n  if (e.target.className == \"checkbox\") {\n    let pos = e.target.dataset.pos;\n    currentList.getList()[e.target.dataset.pos].toggleDone();\n    currentList.sortMatrix();\n    nukeList();\n    renderList({\n      list: currentList.getList(),\n      matrix: document.querySelector(\"header\").dataset.matrix,\n    });\n  }\n});\n\ndocument.getElementById(\"add_task\").addEventListener(\"click\", () => {\n  if (formValidate()) {\n    formNewTask(currentList);\n    formReset();\n    nukeList();\n    renderList(currentList.getList());\n    taskCountUpdate(currentList);\n    toggleOverlay();\n  } else alert(\"Please fill in all fields\");\n});\n\ndocument.getElementById(\"clear\").addEventListener(\"click\", () => {\n  formReset();\n});\n\ndocument.getElementById(\"cancel\").addEventListener(\"click\", () => {\n  formReset();\n  toggleOverlay();\n});\n\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;