const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'

const iconISS = L.icon({
    iconUrl: 'img/iss.png',
    iconSize: [100, 40],
    iconAnchor: [50, 20],
});

const maCarte = L.map('maCarte').setView([0, 0], 1);
const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>';
const tiles = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=yLBrA868khjKwdFFA6Ih';
const mapTiles = L.tileLayer(tiles, { attribution });
mapTiles.addTo(maCarte);

function currentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((function(position) {
            let markerMaPosition = L.marker([position.coords.latitude, position.coords.longitude]).addTo(maCarte);
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude

            markerMaPosition.bindPopup("Ma position :<br> Latitude : " + latitude + ',<br>Longitude ' + longitude).openPopup();

            document.getElementById('lat').textContent = latitude;
            document.getElementById('lon').textContent = longitude;
        }));
    } else {
        alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }
}

setInterval(currentLocation, 90000);

const actualiser = document.getElementById("actualise");

actualiser.addEventListener("click", actualisation);

function actualisation() {
    currentLocation();
    console.log("en cour de traitement...");
    setTimeout(() => {
        console.log("bien traiter!");
    }, 1000);
}