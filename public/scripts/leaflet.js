/* Init leaflet map */
var map = L.map('map').setView([52.3724724, 4.9006668], 18);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJhbXRlciIsImEiOiJjbDBqb3hraXowY2l0M2NxdDdtbHl1Y2hlIn0.PWAp8l3jQZhXJYMrG-_v2Q', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);


/* Init geolocation */
navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    // Do something cool with latitude, longitude
    console.log(position.coords)
  });
  console.log('test')

// L.marker([52.3724724, 4.9006668], 18).addTo(map)
//     .bindPopup('test')
//     .openPopup();

