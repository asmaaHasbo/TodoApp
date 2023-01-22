let taskInput = document.querySelector(".bomDiv input");
let addBtn = document.querySelector("[state = add]");
let addDiv = document.querySelector(".bomDiv");
// let updateBtn = document.createElement("button");

let parentDisplayDiv = document.querySelector(".display-task");
let storage = window.localStorage;
let arrTasks;

//------------------------ وبعرض اللي فيها localstorage بشيك علي ال

if (storage.userTasks != null) {
  arrTasks = JSON.parse(storage.userTasks);
  for (let i = 0; i < arrTasks.length; i++) {
    createAndDisplayElement(arrTasks[i].title, arrTasks[i].id);
  }
} else {
  arrTasks = [];
}

///----------------------------- عند الضغط علي زرار الادد -------------------

addBtn.addEventListener("click", function () {
  if (taskInput.value != "") {
    //------------------- arr خزنت قميه مربع الادخال داخل اوبجكت وضفتها في ال ---------
    let id = Math.trunc(Math.random() * 10 ** 9);
    arrTasks.push({ id: id, title: taskInput.value });

    //---------------------- localstorage في ال  array خزنت ال ----------------

    storage.userTasks = JSON.stringify(arrTasks);

    //---  ناديت علي الدله اللي عملها بتاعت العناصن

    createAndDisplayElement(taskInput.value, id);
  }
  //---------- عشان افضي مربع الادخال بعد اما اضغط علي زرار الادد ----------
  taskInput.value = "";
});

//------------------------------ انشاء عناصر الديف لعرض المحتوي ------------

function createAndDisplayElement(taskValue, taskId) {
  let displayTaskDiv = document.createElement("div");
  let btnDivs = document.createElement("div");
  let p = document.createElement("p");
  let deleteBtn = document.createElement("button");
  // let editBtn = document.createElement("button");

  //--------------- addcontent , attrs ---------
  displayTaskDiv.id = taskId;
  p.textContent = taskValue;
  deleteBtn.textContent = "Delete";
  // editBtn.textContent = "Edit";
  // editBtn.className = "edit";
  //--------------------- appendchild -------
  // btnDivs.appendChild(editBtn);
  btnDivs.appendChild(deleteBtn);
  displayTaskDiv.appendChild(p);
  displayTaskDiv.appendChild(btnDivs);

  parentDisplayDiv.appendChild(displayTaskDiv);

  //------------------------------ لمسح عنصر من الديف ------------------

  deleteBtn.onclick = function () {
    for (let i = 0; i < arrTasks.length; i++) {
      if (deleteBtn.parentElement.parentElement.id == arrTasks[i].id) {
        arrTasks.splice(i, 1);
        storage.userTasks = JSON.stringify(arrTasks);
        deleteBtn.parentElement.parentElement.remove();
      }
    }
  };

  //----------------------------  edit  الضغط علي زرار -----------------------------

  // editBtn.onclick = function () {
  //   addBtn.style.display = "none";
  //   updateBtn.innerHTML = "Update";
  //   updateBtn.style.backgroundColor = "green";
  //   addDiv.appendChild(updateBtn);
  //   taskInput.focus();
  //   for (let i = 0; i < arrTasks.length; i++) {
  //     if (editBtn.parentElement.parentElement.id == arrTasks[i].id) {
  //       taskInput.value = arrTasks[i].title;
  //       updateBtn.setAttribute("updateBtnId", arrTasks[i].id);
  //     }
  //   }
  // };
  //---------------- update -----------

  // updateBtn.onclick = function () {
  //   for (let i = 0; i < arrTasks.length; i++) {
  //     if (updateBtn.getAttribute("updateBtnId") == arrTasks[i].id) {
  //       arrTasks[i].title = taskInput.value;
  //       storage.userTasks = JSON.stringify(arrTasks);
  //       console.log(editBtn.parentElement.parentElement);
        
  //     }
  //   }
  // };
}
