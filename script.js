let currentMonth = 1; // февраль
let currentYear = 2025;
const calendarBody = document.getElementById('calendar-body');
const panel = document.getElementById('day-panel');
const closeBtn = document.querySelector('.close-btn');
const dateDisplay = document.getElementById('selected-date');
const marquee = document.getElementById('marquee-text');
const panelTab = document.getElementById('panel-tab');
const monthDisplay = document.getElementById('calendar-month');
const yearDisplay = document.getElementById('calendar-year');
let selectedCell = null;

let notes = {};

const months = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];


const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekday = (firstDay.getDay() + 6) % 7;

  let date = 1;
  calendarBody.innerHTML = ''; 
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');

      if ((i === 0 && j < firstWeekday) || date > lastDay.getDate()) {
        cell.innerHTML = '';
        cell.classList.add('inactive');
      } else {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('date-number');
        numberDiv.textContent = date;
        cell.appendChild(numberDiv);

        const currentDate = date;
        cell.addEventListener('click', () => {
          if (selectedCell) selectedCell.classList.remove('selected');
          selectedCell = cell;
          selectedCell.classList.add('selected');
          panel.classList.add('active');
          const selectedDate = new Date(year, month, currentDate);
          const formatter = new Intl.DateTimeFormat('ru-RU', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
          let formatted = formatter.format(selectedDate);
          formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
          dateDisplay.textContent = formatted;
        });

        date++;
      }

      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
    if (date > lastDay.getDate()) break;
  }

  monthDisplay.textContent = months[month];
  yearDisplay.textContent = year;
};

const openPanel = () => {
  panel.classList.add('active');
}


closeBtn.addEventListener('click', () => {
  panel.classList.remove('active');
});

const updateMarquee = () => {
  const totalEntries = Object.keys(notes).length;
  const dates = Object.keys(notes).sort();
  const lastDate = dates.length > 0 ? dates[dates.length - 1] : 'записей пока нет';
  const horoscope = generateHoroscope();

  marquee.textContent =
    `Время летит, но воспоминания остаются. // Всего записей в дневнике: ${totalEntries} // Последняя запись: ${lastDate} // ${horoscope}`;
};


const generateHoroscope = () => {
  const options = [
    "Сегодня хороший день для новых начинаний.",
    "Пора отпустить то, что тянет вниз.",
    "Твоя энергия заразительна — поделись ею!",
    "Иногда лучше просто наблюдать.",
    "Будь добр(а) к себе. Ты делаешь лучше, чем думаешь."
  ];
  return options[Math.floor(Math.random() * options.length)];
};


const nextMonth = () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  generateCalendar(currentYear, currentMonth);
};

const prevMonth = () => {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  generateCalendar(currentYear, currentMonth);
};


document.addEventListener('click', function(event) {
  if (!panel.contains(event.target) && !event.target.closest('td') && !event.target.closest('.month-button')) {
    panel.classList.remove('active');
  }
});


document.querySelector('#next-month').addEventListener('click', nextMonth);
document.querySelector('#prev-month').addEventListener('click', prevMonth);


generateCalendar(currentYear, currentMonth);
updateMarquee();
