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

eval("const task = (newTitle, newDesc, newDue, newMatrix) => {\n  let title = newTitle;\n  let desc = newDesc;\n  let due = newDue;\n  let matrix = newMatrix;\n  let done = false;\n\n  const getTitle = () => title;\n\n  const getDesc = () => desc;\n\n  const getDueDate = () => due.getTime();\n\n  const getMatrix = () => matrix;\n\n  const isDone = () => done;\n\n  const changeTitle = (newTitle) => (title = newTitle);\n\n  const changeDesc = (newDesc) => (desc = newDesc);\n\n  const changeDueDate = (newDueDate) => (due = newDueDate);\n\n  const changeMatrix = (newMatrix) => (matrix = newMatrix);\n\n  const toggleDone = () => (done = !done);\n\n  return {\n    getTitle,\n    getDesc,\n    getDueDate,\n    getMatrix,\n    isDone,\n    changeTitle,\n    changeDesc,\n    changeDueDate,\n    changeMatrix,\n    toggleDone,\n  };\n};\n\nconst toDoList = () => {\n  let list = [];\n\n  const getList = () => list;\n\n  const getItem = (pos) => list[pos];\n\n  const addTask = (newTask) => list.push(newTask);\n\n  const delTask = (pos) => list.splice(pos, 1);\n\n  //const sortByDate = () => {}\n\n  const doneFirst = () => {\n    let doneItems = [];\n    let notDoneItems = [];\n\n    notDoneItems = filter((item) => item.isDone == false);\n    doneItems = filter((item) => item.isDone == true);\n\n    list = notDoneItems.concat(doneItems);\n  };\n\n  //const getMatrix = () => {}\n\n  //const countMatrix = () => {}\n\n  return { getList, getItem, addTask, delTask };\n};\n\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

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