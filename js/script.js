
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

const tasksByDate = {};
let selectedDateKey = null;

const gridCalendar = document.querySelector(".grid-calendar");
const monthCalendar = document.querySelector(".month-calendar");
const yearCalendar = document.querySelector(".year-calendar");
const backBtn = document.querySelector("#back-btn");
const nextBtn = document.querySelector("#next-btn");
const modalDayTitle = document.querySelector(".modal-day");
const modalTaskArea = document.querySelector(".task-area");
const closeModalBtn = document.querySelector(".close-modal");
const modalActions = document.querySelector(".modal-actions");
const message = document.querySelector(".message");

const modalOverlay = document.getElementById("modal-overlay");
const taskModalOverlay = document.getElementById("task-modal-overlay");
const addTaskBtn = document.getElementById("add-task-btn");
const newTaskTitle = document.getElementById("new-task-title");
const newTaskDesc = document.getElementById("new-task-desc");
const saveTaskBtn = document.getElementById("save-task-btn");
const cancelTaskBtn = document.getElementById("cancel-task-btn");

closeModalBtn.addEventListener("click", closeModal);
cancelTaskBtn.addEventListener("click", closeTaskModal);
addTaskBtn.addEventListener("click", openTaskModal);

saveTaskBtn.addEventListener("click", () => {
    const dateKey = modalDayTitle.textContent;

    tasksByDate.push(tasksByDate[dateKey]);

    console.log(tasksByDate[0]);

    message.textContent = "";

    if (!newTaskTitle.value || !newTaskDesc.value) {
        message.textContent = "Por favor, preencha todos os campos.";
        return;
    }

    newTaskTitle.value = "";
    newTaskDesc.value = "";

    closeTaskModal();
})

const months = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
];

renderCalendar(currentYear, currentMonth);

function renderCalendar(year, month) {
    gridCalendar.innerHTML = "";
    monthCalendar.textContent = months[month];
    yearCalendar.textContent = year;

    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayWeek = new Date(year, month, 1).getDay();
    const today = new Date();
    let totalCells = 42; // 6 weeks x 7 days

    for (let i = 0; i < firstDayWeek; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("empty-day");
        gridCalendar.appendChild(emptyDiv);
    }

    for (let day = 1; day <= totalDays; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("month-day");
        dayDiv.textContent = day;

        const date = new Date(year, month, day);

        const dateKey = `${year}-${month + 1}-${day}`;

        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayDiv.classList.add("today");
        }

        dayDiv.addEventListener("click", () => {
            openModal();
            modalTaskArea.innerHTML = "";
            modalDayTitle.textContent = date.toLocaleDateString("pt-BR");

            const tasks = tasksByDate[dateKey];
            renderTasks(tasks);
        });

        gridCalendar.appendChild(dayDiv);
    }

    for (let i = 0; i < totalCells - (firstDayWeek + totalDays); i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("empty-day");
        gridCalendar.appendChild(emptyDiv);
    }
}

function renderTasks(tasks) {
    modalTaskArea.innerHTML = "";

    if (!tasks || tasks.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = "Sem tarefas para este dia...";
        msg.classList.add("no-tasks-message");
        modalTaskArea.appendChild(msg);
        return;
    }

    tasks.slice(0, 3).forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-item");
        taskDiv.textContent = task.title;
        modalTaskArea.appendChild(taskDiv);
    });

    if (tasks.length > 3) {
        const moreBtn = document.createElement("a");
        moreBtn.textContent = "Ver mais...";
        moreBtn.classList.add("see-more-btn");
        modalTaskArea.appendChild(moreBtn);
    }
}

function backMonth() {
    currentMonth = currentMonth - 1;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    renderCalendar(currentYear, currentMonth);
}

function nextMonth() {
    currentMonth++;

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar(currentYear, currentMonth);
}

function openModal() {
    modalOverlay.classList.remove("hidden");
    modalDayTitle.textContent = "";
}

function closeModal() {
    modalOverlay.classList.add("hidden");
}

function openTaskModal() {
    taskModalOverlay.classList.remove("hidden");
    newTaskTitle.value = "";
}

function closeTaskModal() {
    taskModalOverlay.classList.add("hidden");
}


