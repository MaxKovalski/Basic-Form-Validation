// screen errors
const nameRedLine = "שם פרטי: הינו שדה חובה";
const lastRedLine = "שם משפחה: הינו שדה חובה";
const idRedLine = "ת.ז: הינו שדה חובה";
const passportRedLine = "דרכון: הינו שדה חובה";
const idInvalid = "תז: אינו תקין";
const passportInvalid = "דרכון: אינו תקין";

/**** Israel ID Validation ****/
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
/*** from Validation and Errors ***/
function formValidation() {
  /*** All Values From Inputs ***/
  const nameCheck = document.forms["formValid"]["name"].value;
  const nameError = document.getElementById("nameError");
  const lastCheck = document.forms["formValid"]["last"].value;
  const lastError = document.getElementById("lastError");
  const idCheck = document.forms["formValid"]["idInput"].value;
  const passportValidation = /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/; // PassportValidation
  const selectedValue = dropdown.value;
  const idError = document.getElementById("tzError");
  let hasError = false; //that for Alert
  if (nameCheck == "") {
    nameError.textContent = nameRedLine;
    hasError = true;
  } else {
    nameError.textContent = "";
  }
  if (lastCheck == "") {
    lastError.textContent = lastRedLine;
    hasError = true;
  } else {
    lastError.textContent = "";
  }
  if (selectedValue === "ת.ז" && idCheck === "") {
    idError.textContent = idRedLine;
    hasError = true;
  } else if (selectedValue === "דרכון" && idCheck === "") {
    idError.textContent = passportRedLine;
    hasError = true;
  } else if (selectedValue === "ת.ז" && !is_israeli_id_number(idCheck)) {
    idError.textContent = idInvalid;
    hasError = true;
  } else if (selectedValue === "דרכון" && !passportValidation.test(idCheck)) {
    idError.textContent = passportInvalid;
    hasError = true;
  } else {
    idError.textContent = "";
  }
  if (!hasError) {
    let check = confirm(
      `you sure that correct?
    Your name: ${nameCheck}
    Your last name: ${lastCheck}
    Your ID: ${idCheck}`
    );
    if (check) {
      alert("המכתב נשלח בהצלחה");
    }
  }
}
/*** id and passport input change  ***/
const dropdown = document.querySelector("#idPlaceHolder");
const inputId = document.querySelector("#idInput");
dropdown.addEventListener("change", function () {
  const selectedValue = dropdown.value;
  if (selectedValue === "ת.ז") {
    inputId.value = "";
    inputId.type = "number";
    inputId.setAttribute("placeholder", "מספר תעודת זהות");
  } else if (selectedValue === "דרכון") {
    inputId.value = "";
    inputId.type = "text";
    inputId.setAttribute("placeholder", "מספר דרכון");
  }
});
/*** default placeHolder on load ***/
window.addEventListener("load", function () {
  inputId.setAttribute("placeholder", "מספר תעודת זהות");
});
