const TOKEN = '5422387748:AAF9hSOLtISqFDCVHYRjDZ6WSv1KE1tid3k';
const CHAT_ID = '790005263';
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

// это элемент сообщения, который будет появляться, если сообщение
// будет успешно отправлено
const success = document.querySelector('.success');

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Валидация формы
    let isValid = true;

    const name = this.name;
    const phone = this.phone;
    const email = this.email;
    const consent = this.consent;

    // Имя
    const namePattern = /^[A-Za-zА-Яа-яЁё\s]+$/;
    if (!namePattern.test(name.value)) {
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('name-error').style.display = 'none';
    }

    // Номер телефона
    const phonePattern = /^\+?[0-9\s\-()]+$/;
    if (!phonePattern.test(phone.value)) {
        document.getElementById('phone-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('phone-error').style.display = 'none';
    }

    // Email
    if (!email.checkValidity()) {
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('email-error').style.display = 'none';
    }

    if (isValid) {
        let message = 'Заявка с сайта:\n' + 'Имя: ' + name.value + '\n' +
        'Номер телефона: ' + phone.value + '\n' + 'E-mail: ' + email.value;

        axios.post(URL_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })
        .then((res) => {
            success.classList.add('disp');
            success.classList.remove('hidden');

            // Скрытие элемента и очистка полей формы через 10 секунд
            setTimeout(() => {
                success.classList.add('hidden');
                success.classList.remove('disp');

                // Очистка полей формы
                name.value = '';
                phone.value = '';
                email.value = '';
                consent.checked = false; // если есть чекбокс согласия
            }, 10000);
        })
        .catch((err) => {
            console.warn(err);
        })
        .finally(() => {
            console.log('Скрипт выполнен');
        });
    }
});

// Реакция на ввод в поле email
document.getElementById('email').addEventListener('input', function() {
    const email = this;
    if (!email.checkValidity()) {
        document.getElementById('email-error').style.display = 'block';
    } else {
        document.getElementById('email-error').style.display = 'none';
    }
});

// Скрытие элемента при загрузке страницы
window.addEventListener('load', () => {
    success.classList.add('hidden');
});

// Меню
document.getElementById('menuToggle').querySelector('input').addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
});

function closeMenu() {
    document.getElementById('menuCheckbox').checked = false;
    document.body.classList.remove('menu-open');
}

document.getElementById('menuCheckbox').addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
});

document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu');
    const menuToggle = document.getElementById('menuToggle');
    if (!menuToggle.contains(event.target) && !menu.contains(event.target)) {
        closeMenu();
    }
}); 