// const nameField = document.querySelector('input[name="name"]');

// nameField.addEventListener('input', event => {
//   if (nameField.value === '') {
//     nameField.style.backgroundColor = 'lime';
//   } else {
//     nameField.style.backgroundColor = '';
//   }
// });

function myFunction() {
  const inpObj = document.querySelector('input[name="name"]');
  if (!inpObj.checkValidity()) {
    document.getElementById("demo").innerHTML = inpObj.validationMessage;
  } else {
    document.getElementById("demo").innerHTML = "Input OK";
  } 
} 