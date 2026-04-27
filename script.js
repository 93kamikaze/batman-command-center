const qatarEvents = [
    { name: "National Sports Day", date: "2026-02-10", type: "Tech/Wearables" },
    { name: "Ramadan Begins", date: "2026-02-18", type: "Home Appliances" },
    { name: "Eid Al-Fitr", date: "2026-03-20", type: "Gifting/Electronics" },
    { name: "Eid Al-Adha", date: "2026-05-27", type: "Large Screens/Tech" },
    { name: "Back to School", date: "2026-08-25", type: "Laptops/Tablets" },
    { name: "Qatar National Day", date: "2026-12-18", type: "Mega Sales" }
];

let tasks = [];

function updateClock() {
    const options = { timeZone: 'Asia/Qatar', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    document.getElementById('local-time').innerText = "DOHA: " + new Intl.DateTimeFormat('en-GB', options).format(new Date());
}
setInterval(updateClock, 1000);

function renderUpcomingEvents() {
    const list = document.getElementById('event-list');
    list.innerHTML = '';
    const today = new Date();

    qatarEvents.forEach(event => {
        const eventDate = new Date(event.date);
        const bufferDate = new Date(eventDate);
        bufferDate.setDate(eventDate.getDate() - 14); // 2 week buffer reminder

        const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
        
        if (diffDays > -1) {
            const div = document.createElement('div');
            div.className = 'event-card';
            div.innerHTML = `
                <strong>${event.name}</strong><br>
                <small>Actual: ${event.date}</small><br>
                <span style="color: var(--bat-accent)">Start Promo: ${bufferDate.toDateString()}</span>
            `;
            list.appendChild(div);
        }
    });
}

function toggleView(view) {
    const container = document.getElementById('calendar-container');
    const title = document.getElementById('view-title');
    container.innerHTML = '';
    
    if (view === 'monthly') {
        title.innerText = "Monthly View (April 2026)";
        container.className = '';
        for (let i = 1; i <= 30; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            day.innerText = i;
            container.appendChild(day);
        }
    } else {
        title.innerText = "Yearly View 2026";
        container.className = 'yearly-view';
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        months.forEach(m => {
            const mDiv = document.createElement('div');
            mDiv.className = 'month-box';
            mDiv.innerText = m;
            container.appendChild(mDiv);
        });
    }
}

// Task Management
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const task = {
        desc: document.getElementById('task-desc').value,
        time: document.getElementById('task-time').value,
        urgency: document.getElementById('task-urgency').value
    };
    tasks.push(task);
    tasks.sort((a, b) => new Date(a.time) - new Date(b.time));
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

// Init
updateClock();
renderUpcomingEvents();
toggleView('monthly');
