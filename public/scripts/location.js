/* Create two input elements */
const input1 = document.createElement('input');
const input2 = document.createElement('input');

/* Init geolocation */
navigator.geolocation.getCurrentPosition(function(location) {
  const latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
  
  const lat = location.coords.latitude;
  const lon = location.coords.longitude;

  /* fill input value with lat and lon */
  input1.value = lon;
  input2.value = lat;

  /* Check if page contains the class .hobbymap */
  if (document.body.classList.contains('hobbymap')) {

     /* Init leaflet map with the latlng */
    const map = L.map('map').setView(latlng, 13)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJhbXRlciIsImEiOiJjbDBqb3hraXowY2l0M2NxdDdtbHl1Y2hlIn0.PWAp8l3jQZhXJYMrG-_v2Q', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYnJhbXRlciIsImEiOiJjbDBqb3hraXowY2l0M2NxdDdtbHl1Y2hlIn0.PWAp8l3jQZhXJYMrG-_v2Q'
    }).addTo(map);

    /* Set marker at latlng */
    const marker = L.marker(latlng).addTo(map);
  }
});

/* Check if page contains the class .formpage */
if (document.body.classList.contains('formpage')) {

  /* Add the inputs to the form */
  document.getElementById("form").appendChild(input1);
  document.getElementById("form").appendChild(input2);

  /* Set attributes of input1 */
  input1.setAttribute("type", "hidden");
  input1.setAttribute("name", "lon");
  /* Set attribute of input2 */
  input2.setAttribute("type", "hidden");
  input2.setAttribute("name", "lan");
}



