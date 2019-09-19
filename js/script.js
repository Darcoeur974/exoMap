const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'

const iconISS = L.icon({
    iconUrl: 'img/iss.png',
    iconSize: [100, 40],
    iconAnchor: [50, 20],
});

let s = 0;

const maCarte = L.map('maCarte').setView([0, 0], 1);
const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>';
const tiles = 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=yLBrA868khjKwdFFA6Ih';
const mapTiles = L.tileLayer(tiles, { attribution });
mapTiles.addTo(maCarte);

const marker = L.marker([0, 0], { icon: iconISS }).addTo(maCarte);

async function recuperateurISS() {
    const reponse = await fetch(api_url);
    const donee = await reponse.json();
    const { latitude, longitude } = donee;

    marker.setLatLng([latitude, longitude]);

    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;
}

setInterval(recuperateurISS, 90000);

const actualiser = document.getElementById("actualise");

actualiser.addEventListener("click", actualisation);

function actualisation() {
    recuperateurISS();
    console.log("en cour de traitement...");
    setTimeout(() => {
        console.log("bien traiter!");
    }, 1000);
}