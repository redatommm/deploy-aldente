let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
let refreshInterval;

function startSliderInterval() {
    refreshInterval = setInterval(() => { next.click() }, 3000);
}

function stopSliderInterval() {
    clearInterval(refreshInterval);
}

function reloadItems() {
    items = document.querySelectorAll('.slider .list .item');
    lengthItems = items.length - 1;
    createDots();
}

function createDots() {
    let dotsContainer = document.querySelector('.slider .dots');
    dotsContainer.innerHTML = ''; // Очищаем текущие точки
    items.forEach((item, index) => {
        let li = document.createElement('li');
        if (index === 0) li.classList.add('active');
        dotsContainer.appendChild(li);
    });
    dots = document.querySelectorAll('.slider .dots li'); // Обновляем dots после создания

    dots.forEach((li, key) => {
        li.addEventListener('click', () => {
            active = key;
            reloadSlider();
        });
    });
}

next.onclick = function () {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}

prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}

function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + 'px';

    let last_active_dot = document.querySelector('.slider .dots li.active');
    if (last_active_dot) {
        last_active_dot.classList.remove('active');
    }

    if (dots[active]) {
        dots[active].classList.add('active');
    }

    stopSliderInterval();
    startSliderInterval();
}

window.onresize = function (event) {
    reloadItems();
    reloadSlider();
};

// Остановка интервала при открытии меню
document.getElementById('menuCheckbox').addEventListener('change', function () {
    if (this.checked) {
        stopSliderInterval();
    } else {
        startSliderInterval();
    }
});

reloadItems();
startSliderInterval();


function createDots() {
    let dotsContainer = document.querySelector('.slider .dots');
    dotsContainer.innerHTML = ''; // Очищаем текущие точки

    items.forEach((item, index) => {
        // Проверка, видим ли элемент (не имеет свойства display: none)
        if (getComputedStyle(item).display !== 'none') {
            let li = document.createElement('li');
            if (index === active) li.classList.add('active');
            dotsContainer.appendChild(li);
        }
    });

    // Обновляем dots после создания
    dots = document.querySelectorAll('.slider .dots li');

    // Назначаем обработчики для новых точек
    dots.forEach((li, key) => {
        li.addEventListener('click', () => {
            active = key;
            reloadSlider();
        });
    });
}

function reloadItems() {
    items = document.querySelectorAll('.slider .list .item');
    lengthItems = items.length - 1;
    createDots();
}

function reloadSlider() {
    // Обновляем элементы для перемещения (учитываем только видимые)
    let visibleItems = Array.from(items).filter(item => getComputedStyle(item).display !== 'none');

    // Обновляем активный элемент с учетом видимых элементов
    if (active >= visibleItems.length) active = 0;
    
    slider.style.left = -visibleItems[active].offsetLeft + 'px';

    let last_active_dot = document.querySelector('.slider .dots li.active');
    if (last_active_dot) {
        last_active_dot.classList.remove('active');
    }

    if (dots[active]) {
        dots[active].classList.add('active');
    }

    stopSliderInterval();
    startSliderInterval();
}

// Начальная настройка
reloadItems();
startSliderInterval();