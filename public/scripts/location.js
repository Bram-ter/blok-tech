/* Create two input elements */
const latitudeField = document.querySelector('input[name="lat"]', 'label[for="lat"]');
const longitudeField = document.querySelector('input[name="lon"]', 'label[for="lon"]');
const latLabel = document.querySelector('label[for="lat"]');
const lonLabel = document.querySelector('label[for="lon"]');

/* Init geolocation */
navigator.geolocation.getCurrentPosition(function(location) {
  const myLocation = new L.LatLng(location.coords.latitude, location.coords.longitude);
  
  const lat = location.coords.latitude;
  const lon = location.coords.longitude;

  /* fill input value with lat and lon */
  if (document.body.classList.contains('formpage')) {
  latitudeField.value = lon;
  longitudeField.value = lat;
  }

  const testvar = [ [11.8166, 122.0942], [11.9804, 121.9189], [10.7202, 122.5621], [11.3889, 122.6277], [10.5929, 122.6325], ]

  const splitWord = lonlat.replace(/,\s*$/, "").replace(/^/,"[").replace(/$/," ]");

  console.log(splitWord);

  console.log(testvar)

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

    /* Set marker at user location */
    let marker = L.marker(myLocation).addTo(map);

    for (var i = 0; i < lonlat.length; i++) {
			marker = new L.marker(lonlat[i])
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

  latLabel.style.display = 'none';
  lonLabel.style.display = 'none';
}



