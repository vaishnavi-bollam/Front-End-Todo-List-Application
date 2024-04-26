let todoItemsContainerEl = document.getElementById("todoItemsContainerEl");
let addButton = document.getElementById("addButton");
let saveButton = document.getElementById("saveButton");



let getTodosFromLocalStorage = () => {
    let stringifiedList = localStorage.getItem("TodoItemsList");
    let parsedList = JSON.parse(stringifiedList);
    if (parsedList === null) {
        return [];
    } else {
        return parsedList;
    }

}


let todoItemsList = getTodosFromLocalStorage();
let todoItemsCount = todoItemsList.length;

saveButton.onclick = function() {
    localStorage.setItem("TodoItemsList", JSON.stringify(todoItemsList))
};


let AddingItems = () => {

    let todoUserInput = document.getElementById("todoUserInput");

    if (todoUserInput.value === "") {
        alert("Please Enter the TodoItem");
        return;
    }
    todoItemsCount = todoItemsCount + 1

    let newItem = {
        text: todoUserInput.value,
        unique: todoItemsCount,
        isChecked: false
    }
    todoItemsList.push(newItem);

    creatingAndAddingTasks(newItem)
    todoUserInput.value = ""

}


addButton.onclick = function() {
    AddingItems()

}




let strikeLineStatusChange = (checkboxId, labelId, todoId) => {
    let checkboxIdEl = document.getElementById(checkboxId);
    let labelIdEl = document.getElementById(labelId);

    labelIdEl.classList.toggle("strike-line");

    let deleteTodoindex = todoItemsList.findIndex(function(each) {
        let eachId = "todoId" + each.unique;
        if (eachId === todoId) {
            return true;
        } else {
            return false;
        }

    })

    let todoItemsListObject = todoItemsList[deleteTodoindex];

    if (todoItemsListObject.isChecked === true) {
        todoItemsListObject.isChecked = false
    } else {
        todoItemsListObject.isChecked = true;
    }

}

let deleteIconClick = (todoId) => {
    let clickDelete1 = document.getElementById(todoId);
    todoItemsContainerEl.removeChild(clickDelete1);

    let deleteTodoindex = todoItemsList.findIndex(function(each) {
        let eachId = "todoId" + each.unique;
        if (eachId === todoId) {
            return true;
        } else {
            return false;
        }

    })


    todoItemsList.splice(deleteTodoindex, 1);
}



let creatingAndAddingTasks = (eachItem) => {
    let checkboxId = "checkboxId" + eachItem.unique;
    let labelId = "labelId" + eachItem.unique;
    let todoId = "todoId" + eachItem.unique;

    let todoItemEl = document.createElement("li");
    todoItemEl.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemEl.id = todoId;
    todoItemsContainerEl.appendChild(todoItemEl);


    let checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.id = checkboxId;
    checkboxEl.checked = eachItem.isChecked;
    checkboxEl.onclick = function() {
        strikeLineStatusChange(checkboxId, labelId, todoId)
    }
    checkboxEl.classList.add("input-checkbox");

    todoItemEl.appendChild(checkboxEl);



    let textAndIconContainer = document.createElement("div");
    textAndIconContainer.classList.add("labelAndIconcontainer", "d-flex", "flex-row")
    todoItemEl.appendChild(textAndIconContainer);

    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", checkboxId);
    labelEl.classList.add("checkbox-label");
    labelEl.textContent = eachItem.text;
    labelEl.id = labelId;
    if (eachItem.isChecked === true) {
        labelEl.classList.add("strike-line")
    }
    textAndIconContainer.appendChild(labelEl);

    let iconContainer = document.createElement("div");
    iconContainer.classList.add("delete-icon-container");
    textAndIconContainer.appendChild(iconContainer);

    let deleteIconEl = document.createElement("i");
    deleteIconEl.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconEl.onclick = function() {
        deleteIconClick(todoId);
    };

    iconContainer.appendChild(deleteIconEl);




}



for (let eachItem of todoItemsList) {
    creatingAndAddingTasks(eachItem);
}