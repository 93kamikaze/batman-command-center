let current = new Date();
let tasks = [];

const marketOccasions = [
    { name: "Eid Al-Adha (Large TV Sales)", date: "2026-05-27" },
    { name: "Back to School (Laptops)", date: "2026-08-25" },
    { name: "Qatar National Day (Mega Promos)", date: "2026-12-18" }
];

function init() {
    setInterval(updateClocks, 1000);
    renderCalendar();
    renderPromos();
}

function updateClocks() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    document.getElementById('doha-clock').innerText = new Intl.DateTimeFormat('en-GB', { ...options, timeZone: 'Asia/Qatar' }).format(now);
    document.getElementById('dubai-clock').innerText = new Intl.DateTimeFormat('en-GB', { ...options, timeZone: 'Asia/Dubai' }).format(now);
    document.getElementById('full-date').innerText = now.toLocaleDateString('en-GB');
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const monthLabel = document.getElementById('month-label');
    const yearLabel = document.getElementById('year-label');
    
    grid.innerHTML = '';
    monthLabel.innerText = current.toLocaleString('default', { month: 'long' });
    yearLabel.innerText = current.getFullYear();

    const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'cal-day';
        day.innerText = i;
        grid.appendChild(day);
    }
}

function renderPromos() {
    const list = document.getElementById('promo-list');
    list.innerHTML = '';
    marketOccasions.forEach(occ => {
        const item = document.createElement('div');
        item.className = 'task-item';
        item.innerHTML = `<div><strong>${occ.name}</strong><br><small>Promo Start: ${occ.date}</small></div>`;
        list.appendChild(item);
    });
}

window.changeMonth = (v) => { current.setMonth(current.getMonth() + v); renderCalendar(); };
window.changeYear = (v) => { current.setFullYear(current.getFullYear() + v); renderCalendar(); };

document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const task = {
        id: Date.now(),
        desc: document.getElementById('task-desc').value,
        urgency: document.getElementById('task-urgency').value,
        time: document.getElementById('task-time').value
    };
    tasks.push(task);
    tasks.sort((a, b) => new Date(a.time) - new Date(b.time));
    renderTasks();
    e.target.reset();
});

function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    tasks.forEach(t => {
        const div = document.createElement('div');
        div.className = `task-item ${t.urgency}`;
        div.innerHTML = `<div><strong>${t.desc}</strong><br><small>${t.time}</small></div>
                         <button style="color:red; background:none; border:none; cursor:pointer;" onclick="removeTask(${t.id})">DONE</button>`;
        list.appendChild(div);
    });
}

window.removeTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
};

window.filterNews = (outlet) => {
    document.getElementById('main-news-display').innerHTML = `<h3>Scanning ${outlet}...</h3><p>Retrieving encrypted tech intel from ${outlet} regarding new GPU launches and mobile software updates.</p>`;
};

init();
