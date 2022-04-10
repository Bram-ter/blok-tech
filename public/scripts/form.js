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
