// Name
const inpObj = document.querySelector('input[name="name"]');
inpObj.addEventListener('keyup', showWarning);

function showWarning() {
    let nameField = inpObj.value;
    const chars = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    if (nameField.match(chars)) {
        document.getElementById('warning').innerText = 'Username cannot contain special characters';
    }
    else {
        document.getElementById('warning').innerText = '';
    }
}

//   const inpObj = document.querySelector('input[name="name"]');

//   inpObj.addEventListener('input', event => {
//   const chars = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
//   if ( String.match(chars) ) {
//     document.getElementById("alert").innerHTML = "Input bad";
//   } else {
//     document.getElementById("alert").innerHTML = "Input OK";
//   } 
// });