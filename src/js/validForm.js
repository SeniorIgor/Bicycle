const form = document.querySelector('.subscribe__form');
const email = document.getElementById('email');
const btn = document.getElementById('.subscribe__button');

// установка фокуса, если поле ввода не пустое
function focusElem() {
	// const isEmpty = email.value.trim().length === 0;

	// if (isEmpty) {
	// 	email.classList.remove('focus');
	// } else if (!email.classList.contains('focus')) {
	// 	email.classList.add('focus');
	// }

	if (email.classList.contains('error')) {
		email.classList.remove('error');
	}
}
email.addEventListener('input', focusElem, false);
// =========================================================================

// проверка правильности введенных данных при отправке формы
form.addEventListener('submit', e => {
	e.preventDefault();

	checkInputs();
});
// =========================================================================

// добавление подсветки при неправильном вводе
function checkInputs() {
	const emailValue = email.value.trim();

	if (!isEmail(emailValue)) {
		email.classList.add('error');
	} else {
		form.submit();
	}
}
// ==========================================================================

// проверка поля на соответствие
function isEmail(email) {
	const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regExp.test(String(email).toLowerCase());
}
// ==========================================================================