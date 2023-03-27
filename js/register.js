//FORM
const form = document.getElementById("form");
const nameInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

//login
const isEmpty = (value) => value === "";
// const isBetween = (length, min, max) => length > min && length < max;

//formato
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

const isEmailValid = (email) => EMAIL_REGEX.test(email);
const isPasswordValid = (password) => PASS_REGEX.test(password);

const showError = (input, message) => {
	const formField = input.parentElement;
	formField.classList.remove("success");
	formField.classList.add("error");

	const errorMsg = formField.querySelector("small");
	errorMsg.textContent = message;
};

const showSuccess = (input) => {
	const formField = input.parentElement;
	formField.classList.remove("error");
	formField.classList.add("success");

	const errorMsg = formField.querySelector("small");
	errorMsg.textContent = "";
};

const checkName = () => {
	let valid = false;
	const name = nameInput.value.trim();

	if (isEmpty(name)) {
		showError(nameInput, "El nombre es obligatorio");
	} else {
		showSuccess(nameInput);
		valid = true;
	}
	return valid;
};

const checkEmail = () => {
	let valid = false;
	const email = emailInput.value.trim();

	if (isEmpty(email)) {
		showError(emailInput, "El email es obligatorio");
	} else if (!isEmailValid(email)) {
		showError(emailInput, "El email es inválido");
	} else {
		showSuccess(emailInput);
		valid = true;
	}
	return valid;
};

const checkPassword = () => {
	let valid = false;
	const password = passwordInput.value.trim();

	if (isEmpty(password)) {
		showError(passwordInput, "La contraseña es obligatoria");
	} else if (!isPasswordValid(password)) {
		showError(passwordInput, "La contraseña debe tener al menos...");
	} else {
		showSuccess(passwordInput);
		valid = true;
	}
	return valid;
};

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const isNameValid = checkName();
	const isEmailValid = checkEmail();
	const isPasswordValid = checkPassword();

	const isFormValid = isNameValid && isEmailValid && isPasswordValid;
	console.log(isFormValid, "Crear cuenta");
	if (isFormValid) {
		form.submit();
	}
});

//VALIDAR FORM X INPUT
const debounce = (fn, delay = 500) => {
	let timeoutId;
	return (...args) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			fn.apply(null, args);
		}, delay);
	};
};

form.addEventListener(
	"input",
	debounce((e) => {
		switch (e.target.id) {
			case "nombre":
				checkName();
				break;
			case "email":
				checkEmail();
				break;
			case "password":
				checkPassword();
				break;
		}
	})
);
