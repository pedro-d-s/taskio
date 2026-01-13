
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

const gridCalendar = document.querySelector(".grid-calendar");
const titleCalendar = document.querySelector(".title-calendar");

const months = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
];

renderCalendar(currentYear, currentMonth);


function renderCalendar(year, month) {
    gridCalendar.innerHTML = "";

    titleCalendar.textContent = months[month];

    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayWeek = new Date(year, month, 1).getDay();

    for (let i = 0; i < firstDayWeek; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("empty-day");
        gridCalendar.appendChild(emptyDiv);
    }

    for (let day = 1; day <= totalDays; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("month-day");
        dayDiv.textContent = day;

        gridCalendar.appendChild(dayDiv);
    }
}


