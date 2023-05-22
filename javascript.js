
function is_israeli_id_number(id) {
    id = String(id).trim();
    if (id.length > 9 || isNaN(id)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
  
    return (
      Array.from(id, Number).reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
      }) %
        10 ===
      0
    );
  }
function formValidation(){
const nameCheck = document.forms['formValid']['name'].value
const nameError = document.getElementById('nameError');
const lastCheck = document.forms['formValid']['last'].value
const lastError = document.getElementById('lastError')
const idCheck = document.forms['formValid']['idInput'].value
const idError = document.getElementById('tzError');
const passportValidation =  /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/;
const selectedValue = dropdown.value
let hasError = false;
if(nameCheck  == ''){
  nameError.textContent = 'שם פרטי: הינו שדה חובה';
hasError = true
}else{
    nameError.textContent = '';
}
if(lastCheck  == ''){
     lastError.textContent = 'שם משפחה: הינו שדה חובה';
   hasError = true
}else{
    lastError.textContent = '';
}
if (selectedValue === 'ת.ז' && idCheck === '') {
    idError.textContent = 'ת.ז: הינו שדה חובה';
  hasError = true
  } else if (selectedValue === 'דרכון' && idCheck === '') {
    
    idError.textContent = 'דרכון: הינו שדה חובה';
  hasError = true
  } else if (selectedValue === 'ת.ז' && !is_israeli_id_number(idCheck)) {
    idError.textContent = 'ת.ז: אינו תקין';
  hasError = true
   
  }
  else if (selectedValue === 'דרכון' && !passportValidation.test(idCheck) ){
    idError.textContent = 'דרכון: אינו תקין'
  hasError = true
  } else {
    idError.textContent = '';
  }
  if(!hasError){
    alert(`Your name: ${nameCheck}
    Your last name: ${lastCheck}
    Your ID: ${idCheck}`);
  }
}
const dropdown = document.querySelector("#idPlaceHolder");
const inputId = document.querySelector("#idInput");
dropdown.addEventListener("change", function() {
    const selectedValue = dropdown.value;
    if (selectedValue === "ת.ז") {
      inputId.value = ''
      inputId.type = 'number'
       inputId.setAttribute("placeholder", "מספר תעודת זהות");
    } else if (selectedValue === "דרכון") {
      inputId.value = ''
    inputId.type = 'text'
        inputId.setAttribute("placeholder", "מספר דרכון");
    }
});
window.addEventListener("load", function() {
    inputId.setAttribute("placeholder", "מספר תעודת זהות");
});
