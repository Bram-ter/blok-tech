/* Create two input elements */
const input1 = document.createElement('input');
const input2 = document.createElement('input');

/* Add the inputs to the form */
document.getElementById("form").appendChild(input1);
document.getElementById("form").appendChild(input2);

/* Set attributes of input1 */
input1.setAttribute("type", "hidden");
input1.setAttribute("name", "lon");
/* Set attribute of input2 */
input2.setAttribute("type", "hidden");
input2.setAttribute("name", "lan");

/* Init geolocation */
navigator.geolocation.getCurrentPosition(position => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  /* Set value of input1 to the longitude */
  input1.value = longitude;

  /* Set value of input2 to the latitude */
  input2.value = latitude;
});




