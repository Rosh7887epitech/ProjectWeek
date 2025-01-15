const map = L.map('map').setView([47.209841, -1.560657], 15);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const customIcon = L.icon({
    iconUrl: 'ping_salon.png',
    iconSize: [40, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40]
});

const points = [
    { name: "Epitech Nantes", lat: 47.209472, lng: -1.575500, description: "École de futurs ingénieurs informatiques. Ouvert 7j/7" },
    { name: "Le Village CA", lat: 47.254821, lng: -1.511267, description: "Incubateur de startups. Ouvert 7j/7" },
    { name: "IMT Atlantique", lat: 47.282171, lng: -1.520608, description: "Incubateur de startups. Ouvert 7j/7" },
    { name: "Atlanpole", lat: 47.287600, lng: -1.526002, description: "Incubateur de startups. Ouvert 7j/7" },
    { name: "EdTech Campus", lat: 47.281218, lng: -1.547476, description: "Incubateur de startups. Ouvert 7j/7" },
    { name: "Novapuls", lat: 47.214221, lng: -1.557460, description: "Incubateur de startups. Ouvert 7j/7" },
    { name: "La Cantine Numérique", lat: 47.206103, lng: -1.559992, description: "Incubateur de startups. Ouvert 7j/7" },
    { name: "La French Tech Nantes", lat: 47.206299, lng: -1.560421, description: "Incubateur de startups. Ouvert 7j/7" },
    { name: "La Halle 6", lat: 47.206061, lng: -1.561094, description: "Incubateur de startups. Ouvert 7j/7" },
    { name: "Le Solilab", lat: 47.201571, lng: -1.570677, description: "Incubateur de startups. Ouvert 7j/7" },
    { name: "Web2Day", lat: 47.206227, lng: -1.560325, description: "Incubateur de startups. Ouvert 7j/7" },
    { name: "Nantes Digital Week", lat: 47.213161, lng: -1.543620, description: "Incubateur de startups. Ouvert 7j/7" },
    { name: "Salon de la Data et de l'IA", lat: 47.213336, lng: -1.544168, description: "Incubateur de startups. Ouvert 7j/7" }
];

points.forEach(point => {
    const marker = L.marker([point.lat, point.lng], { icon: customIcon }).addTo(map);
    marker.bindPopup(`<b>${point.name}</b><br>${point.description}`);
});

// Gestion du menu
const menuContent = document.getElementById('menu-content');

points.forEach(point => {
    const a = document.createElement('a');
    a.textContent = point.name;
    a.href = "#";
    a.onclick = (e) => {
        e.preventDefault();
        map.setView([point.lat, point.lng], 15);
    };
    menuContent.appendChild(a);
});

const menuToggle = document.getElementById('menu-toggle');
menuToggle.addEventListener('click', () => {
    menuContent.style.display = menuContent.style.display === "block" ? "none" : "block";
});

// Gestion des dates et créneaux horaires
const datesContainer = document.getElementById('dates');
const timeslotsContainer = document.getElementById('timeslots');

function generateDates() {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateDiv = document.createElement('div');
        dateDiv.textContent = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        dateDiv.dataset.date = date.toISOString().split('T')[0];
        dateDiv.classList.add('date');
        dateDiv.addEventListener('click', () => loadTimeSlots(dateDiv.dataset.date));
        datesContainer.appendChild(dateDiv);
    }
}

function loadTimeSlots(selectedDate) {
    timeslotsContainer.innerHTML = '';
    const startHour = 8;
    const endHour = 18;
    for (let hour = startHour; hour < endHour; hour += 2) {
        const slotDiv = document.createElement('div');
        slotDiv.textContent = `${hour}:00 - ${hour + 2}:00`;
        slotDiv.dataset.time = `${hour}:00`;
        slotDiv.dataset.date = selectedDate;
        slotDiv.classList.add('timeslot');
        slotDiv.addEventListener('click', () => validateTimeSlot(slotDiv));
        timeslotsContainer.appendChild(slotDiv);
    }
}

function validateTimeSlot(slotDiv) {
    const date = slotDiv.dataset.date;
    const time = slotDiv.dataset.time;
    alert(`Rendez-vous validé pour le ${date} à ${time}.`);
    slotDiv.remove();
}

generateDates();
