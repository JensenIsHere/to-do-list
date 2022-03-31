const task = (newTitle, newDesc, newDue, newMatrix) => {
  let title = newTitle;
  let desc = newDesc;
  let due = newDue;
  let matrix = newMatrix;
  let done = false;

  const getTitle = () => title;

  const getDesc = () => desc;

  const getDueDate = () => due.getTime();

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
        if (list[j].getDueDate > list[j + 1].getDueDate)
          swapElements(list[j], list[j + 1]);
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

    notDoneItems = filter((item) => item.isDone() == false);
    doneItems = filter((item) => item.isDone() == true);

    list = notDoneItems.concat(doneItems);
  };

  const getMatrix = (matrixType) => {
    let filteredList = [];

    filteredList = filter((item) => item.getMatrix() == matrixType);

    return filteredList;
  };

  const countMatrix = (matrixType) => {
    let filteredList;

    filteredList = getMatrix(matrixType);

    return filteredList.length;
  };

  return { getList, getItem, addTask, delTask, countMatrix };
};
