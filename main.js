const inputTask = document.getElementById("input_task");
const taskList = document.getElementById("task_list");
const btn = document.querySelector(".btn");
const sortItems = document.querySelectorAll('.todo_list .sort .item');

// counter
function updateCounter() {
    const counterDisplay = document.getElementById('task-counter');

    const remainingTasks = Array.from(document.querySelectorAll('#task_list li'))
                                .filter(li => !li.classList.contains('checked')).length;
    
    counterDisplay.innerHTML = `${remainingTasks} tasks remaining`;
}

// 2. إضافة مهمة جديدة

function addTask() {
    let taskValue = inputTask.value;
    if (taskValue === "") {
        alert("You must add a value");
    } else {
        let li = document.createElement("li");
        let span = document.createElement("span");
        li.innerHTML = taskValue;
        taskList.appendChild(li);
        span.innerHTML = "&times;";
        li.appendChild(span);
    }
    inputTask.value = "";
    setTask();
    updateCounter(); 
}

btn.addEventListener("click", addTask);

// 3.
taskList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        setTask();
        updateCounter(); 
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        setTask();
        updateCounter(); 
    }
});

inputTask.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// filter
sortItems.forEach(button => {
    button.addEventListener('click', () => {
        sortItems.forEach(btn => btn.classList.remove('checked'));
        button.classList.add('checked');

        const filterValue = button.textContent.trim().toLowerCase();
        const allTasks = document.querySelectorAll('#task_list li');

        allTasks.forEach(task => {
            switch (filterValue) {
                case 'all':
                    task.style.display = 'flex';
                    break;
                case 'completed':
                    task.style.display = task.classList.contains('checked') ? 'flex' : 'none';
                    break;
                case 'un completed':
                case 'uncompleted':
                    task.style.display = !task.classList.contains('checked') ? 'flex' : 'none';
                    break;
            }
        });
    });
});

//local storage
function setTask() {
    localStorage.setItem("lists", taskList.innerHTML);
}

function loadTask() {
    taskList.innerHTML = localStorage.getItem("lists") || "";
    updateCounter();
}

loadTask();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}