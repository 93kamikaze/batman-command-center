let currentDate = new Date();
let tasks = [];

const occasions = [
    { name: "Qatar Sports Day", date: "2026-02-10" },
    { name: "Eid Al-Fitr Promo", date: "2026-03-20" },
    { name: "Back to School", date: "2026-08-25" },
    { name: "National Day", date: "2026-12-18" }
];

function updateClocks() {
    const now = new Date();
    const doha = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Qatar', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now);
    const dubai = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now);
    
    document.getElementById('doha-time').innerText = doha;
    document.getElementById('dubai-time').innerText = dubai;
    document.getElementById('real-date').innerText = now.toLocaleDateString();
}

function renderCalendar() {
    const container = document.getElementById('calendar-container');
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    document.getElementById('year-display').innerText = year;
    document.getElementById('month-display').innerText = currentDate.toLocaleString('default', { month: 'long' });

    container.innerHTML = '';
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
        const div = document.createElement('div');
        div.className = 'cal-day';
        div.innerText = i;
        container.appendChild(div);
    }
}

// Nav Controls
window.changeMonth = (val) => { currentDate.setMonth(currentDate.getMonth() + val); renderCalendar(); };
window.changeYear = (val) => { currentDate.setFullYear(currentDate.getFullYear() + val); renderCalendar(); };

// Task Logic
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
        const item = document.createElement('div');
        item.className = `task-item ${t.urgency}`;
        item.innerHTML = `
            <div><strong>${t.desc}</strong><br><small>${t.time}</small></div>
            <button class="remove-btn" onclick="removeTask(${t.id})"><i class="fas fa-trash"></i></button>
        `;
        list.appendChild(item);
    });
}

window.removeTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
};

// Start
setInterval(updateClocks, 1000);
renderCalendar();
