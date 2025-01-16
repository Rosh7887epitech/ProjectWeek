const map = L.map('map').setView([47.209884, -1.560712], 15);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const menuToggle = document.getElementById('menu-toggle');
const menuContent = document.getElementById('menu-content');

menuToggle.addEventListener('click', () => {
    const isMenuVisible = menuContent.style.display === 'block';
    menuContent.style.display = isMenuVisible ? 'none' : 'block';
});

const customIcon = L.icon({
    iconUrl: 'ping_salon.png',
    iconSize: [40, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40]
});

const userIcon = L.icon({
    iconUrl: 'ping_user1.png',
    iconSize: [40, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40]
});

const points = [
    { name: "Le Village CA (situé à 7,3 km)", lat: 47.254821, lng: -1.511267, description: "Incubateur de startups. Ouvert 7j/7", showDates: true },
    { name: "Novapuls (situé à 450 m)", lat: 47.214221, lng: -1.557460, description: "Incubateur de startups. Ouvert 7j/7", showDates: true },
    { name: "La Cantine Numérique (situé à 1,3 km)", lat: 47.206103, lng: -1.559992, description: "Incubateur de startups. Ouvert 7j/7", showDates: false },
    { name: "La French Tech Nantes (situé à 1,3 km)", lat: 47.206299, lng: -1.560421, description: "Incubateur de startups. Ouvert 7j/7", showDates: false },
    { name: "Orange Business (Rennes)", lat: 48.133635, lng: -1.623277, description: "Boutique Orange Business", showDates: false },
    { name: "Orange Business (Paris)", lat: 48.729939, lng: 2.268626, description: "Boutique Orange Business", showDates: false },
    { name: "Orange Business (Lyon)", lat: 45.755196, lng: 4.834973, description: "Boutique Orange Business", showDates: false },
    { name: "Orange Business (Toulouse)", lat: 43.635353, lng: 1.375361, description: "Boutique Orange Business", showDates: false },
    { name: "Orange Business (Bordeaux)", lat: 44.97888, lng: -0.571933, description: "Boutique Orange Business", showDates: false },
];

const datesContainer = document.getElementById('dates');
const timeslotsContainer = document.getElementById('timeslots');

let lastClickedMarker = null;

function generateDates() {
    datesContainer.innerHTML = '';
    const today = new Date();

    for (let i = 0; i < 10; i++) {
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

points.forEach(point => {
    const marker = L.marker([point.lat, point.lng], { icon: customIcon }).addTo(map);
    marker.bindPopup(`<b>${point.name}</b><br>${point.description}`);
    marker.on('click', () => {
        const messageContainer = document.getElementById('specialist-message');
        messageContainer.textContent = `Un expert est disponible à ${point.name}.`;
        if (point.showDates) {
            if (lastClickedMarker === marker) {
                datesContainer.innerHTML = '';
                timeslotsContainer.innerHTML = '';
                lastClickedMarker = null;
            } else {
                generateDates();
                lastClickedMarker = marker;
            }
        } else {
            datesContainer.innerHTML = '';
            timeslotsContainer.innerHTML = '';
            lastClickedMarker = null;
        }
    });

    const menuItem = document.createElement('a');
    menuItem.textContent = point.name;
    menuItem.href = "#";
    menuItem.classList.add('menu-item');
    menuItem.addEventListener('click', (event) => {
        event.preventDefault();
        map.setView([point.lat, point.lng], 15);
        marker.openPopup();
    });

    menuContent.appendChild(menuItem);
});

const points_user = [
    { name: "Vous êtes ici !", lat: 47.209884, lng: -1.560712 }
];

points_user.forEach(point => {
    const marker = L.marker([point.lat, point.lng], { icon: userIcon }).addTo(map);
    marker.bindPopup(`<b>${point.name}</b>`);
});
