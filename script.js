let currentDisplayDate = new Date(); // Defaults to today
let currentView = 'monthly';
let tasks = [];

const qatarEvents = [
    { name: "National Sports Day", month: 1, day: 10 }, // Feb
    { name: "Ramadan Promo", month: 1, day: 18 },
    { name: "Eid Al-Fitr", month: 2, day: 20 },
    { name: "Eid Al-Adha", month: 4, day: 27 },
    { name: "Back to School", month: 7, day: 25 },
    { name: "National Day", month: 11, day: 18 }
];

function updateClock() {
    const options = { timeZone: 'Asia/Qatar', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    document.getElementById('local-time').innerText = "DOHA: " + new Intl.DateTimeFormat('en-GB', options).format(new Date());
}

function renderCalendar() {
    const container = document.getElementById('calendar-container');
    const title = document.getElementById('view-title');
    container.innerHTML = '';

    if (currentView === 'monthly') {
        const year = currentDisplayDate.getFullYear();
        const month = currentDisplayDate.getMonth();
        title.innerText = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDisplayDate);
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Empty slots for start of month
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day';
            empty.style.opacity = '0.3';
            container.appendChild(empty);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            dayDiv.innerHTML = `<span>${d}</span>`;
            
            // Check for Qatari Events
            const event = qatarEvents.find(e => e.month === month && e.day === d);
            if (event) {
                dayDiv.innerHTML += `<div class="day-event">${event.name}</div>`;
                dayDiv.style.borderColor = 'var(--bat-accent)';
            }
            container.appendChild(dayDiv);
        }
    } else {
        title.innerText = currentDisplayDate.getFullYear() + " Overview";
        container.style.gridTemplateColumns = 'repeat(4, 1fr)';
        // Simplified Yearly Logic
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        months.forEach((m, idx) => {
            const mDiv = document.createElement('div');
            mDiv.className = 'calendar-day';
            mDiv.style.textAlign = 'center';
            mDiv.innerHTML = `<strong>${m}</strong>`;
            container.appendChild(mDiv);
        });
    }
}

function changeMonth(step) {
    currentDisplayDate.setMonth(currentDisplayDate.getMonth() + step);
    renderCalendar();
}

function setView(view) {
    currentView = view;
    renderCalendar();
}

// Task Handling
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const task = {
        desc: document.getElementById('task-desc').value,
        time: document.getElementById('task-time').value,
        urgency: document.getElementById('task-urgency').value,
        timestamp: new Date(document.getElementById('task-time').value).getTime()
    };
    tasks.push(task);
    tasks.sort((a, b) => a.timestamp - b.timestamp);
    renderTasks();
    e.target.reset();
});

function renderTasks() {
    const list = document.getElementById('user-tasks');
    list.innerHTML = '';
    tasks.forEach(t => {
        const div = document.createElement('div');
        div.className = `task-card urgency-${t.urgency}`;
        div.innerHTML = `<strong>${t.desc}</strong><br><small>${t.time.replace('T', ' ')}</small>`;
        list.appendChild(div);
    });
}

// Initial Run
setInterval(updateClock, 1000);
updateClock();
renderCalendar();
