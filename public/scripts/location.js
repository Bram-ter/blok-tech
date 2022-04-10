/* Select input/label elements */
const latitudeField = document.querySelector('input[name="lat"]', 'label[for="lat"]');
const longitudeField = document.querySelector('input[name="lon"]', 'label[for="lon"]');
const latLabel = document.querySelector('label[for="lat"]');
const lonLabel = document.querySelector('label[for="lon"]');

/* Init geolocation */
navigator.geolocation.getCurrentPosition(function(location) {
  const myLocation = new L.LatLng(location.coords.latitude, location.coords.longitude);
  
  /* Set lat and lon to geolocation choords */
  const lat = location.coords.latitude;
  const lon = location.coords.longitude;

  /* Check if page contains the class .formpage */
  if (document.body.classList.contains('formpage')) {
  /* Fill field value to geolocation choords */
  latitudeField.value = lon;
  longitudeField.value = lat;
  }

  /* Check if page contains the class .hobbymap */
  if (document.body.classList.contains('hobbymap')) {

     /* Init leaflet map with the lat lon of the user */
    const map = L.map('map').setView(myLocation, 13)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJhbXRlciIsImEiOiJjbDBqb3hraXowY2l0M2NxdDdtbHl1Y2hlIn0.PWAp8l3jQZhXJYMrG-_v2Q', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYnJhbXRlciIsImEiOiJjbDBqb3hraXowY2l0M2NxdDdtbHl1Y2hlIn0.PWAp8l3jQZhXJYMrG-_v2Q'
    }).addTo(map);

    /* Get lonlat variable from EJS template and add/replace some characters */
    const splitString = "[" + lonlat.replace(/,\s*$/, "") + "]";
    /* Parse the changed variable */
    const makeArray = JSON.parse(splitString);

    /* Set marker at user location */
    let marker = L.marker(myLocation).addTo(map);

    /* Loop through the array and return every line as a leaflet marker */
    for (var i = 0; i < makeArray.length; i++) {
			marker = new L.marker(makeArray[i])
				.addTo(map);
		}
  }
});

/* Check if page contains the class .formpage */
if (document.body.classList.contains('formpage')) {

  /* Set attributes of latitude field */
  latitudeField.setAttribute('type', 'hidden');
  latitudeField.setAttribute('name', 'lon');
  /* Set attribute of longitude field */
  longitudeField.setAttribute('type', 'hidden');
  longitudeField.setAttribute('name', 'lat');

  /* Set display of labels to none */
  latLabel.style.display = 'none';
  lonLabel.style.display = 'none';
}



