// Name field validation
const inpObj = document.querySelector('input[name="name"]');
inpObj.addEventListener('keyup', showWarning);

function showWarning() {
    let nameField = inpObj.value;
    const chars = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    if (nameField.match(chars)) {
        document.getElementById('warning').innerText = 'Username cannot contain special characters';
        document.getElementById('warning').style.display = 'block';
    }
    else {
        document.getElementById('warning').innerText = '';
        document.getElementById('warning').style.display = 'none';
    }
}

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
