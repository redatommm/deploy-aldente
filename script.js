document.addEventListener('DOMContentLoaded', function () {
  let currentBlock = null;
  const buttons = document.querySelectorAll('.toggle-btn');
  const firstButton = buttons[0]; // Первая кнопка
  let observer;

  // Функция для удаления класса active у всех кнопок
  const removeActiveClass = () => {
    buttons.forEach(button => button.classList.remove('active'));
  };

  // Функция для добавления класса active
  const setActiveButton = (button) => {
    removeActiveClass();
    button.classList.add('active');
  };

  // Функция для управления отображением блока
  const showBlock = (block) => {
    if (currentBlock) {
      currentBlock.style.display = 'none';
    }
    block.style.display = 'block';
    currentBlock = block;
  };

  // Функция для наблюдения за выходом блока из viewport
  const observeBlock = (block) => {
    if (observer) {
      observer.disconnect();
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          // Если текущий блок выходит из viewport
          showBlock(document.getElementById(firstButton.getAttribute('data-target')));
          setActiveButton(firstButton);
        }
      });
    });

    observer.observe(block);
  };

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const targetBlock = document.getElementById(targetId);

      if (currentBlock && currentBlock !== targetBlock) {
        currentBlock.style.display = 'none';
        observer.disconnect(); // Отключаем старый observer
      }

      if (targetBlock.style.display === 'none' || !targetBlock.style.display) {
        showBlock(targetBlock);
        setActiveButton(this);
        observeBlock(targetBlock); // Наблюдаем за новым блоком
      } else {
        targetBlock.style.display = 'none';
        removeActiveClass();
        observer.disconnect(); // Отключаем observer, если блок скрывается
        currentBlock = null;
      }
    });
  });

  // Устанавливаем начальный active класс первой кнопке и отображаем первый блок
  setActiveButton(firstButton);
  currentBlock = document.getElementById(firstButton.getAttribute('data-target'));
  showBlock(currentBlock);
  observeBlock(currentBlock);
});



document.addEventListener('DOMContentLoaded', function () {
  const faqs = document.querySelectorAll(".faq");

  faqs.forEach((faq) => {
    faq.addEventListener("click", () => {
      faq.classList.toggle("active");
    });
  });
});

const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)



document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');
  const element = document.querySelector('.adress');

  function adjustMargin() {
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    // Рассчитываем доступное пространство
    const availableSpace = containerRect.right - elementRect.right;

    // Если доступного пространства меньше желаемого значения margin-right, уменьшаем его
    let desiredMarginRight = 150; // Задайте желаемое значение margin-right здесь
    if (availableSpace < desiredMarginRight) {
      desiredMarginRight = availableSpace;
    }

    // Устанавливаем динамическое значение margin-right
    element.style.marginRight = desiredMarginRight + 'px';
  }

  // Вызываем функцию при загрузке страницы
  adjustMargin();

  // Вызываем функцию при изменении размера окна
  window.addEventListener('resize', adjustMargin);
});




// Params
let mainSliderSelector = '.main-slider',
  navSliderSelector = '.nav-slider',
  interleaveOffset = 0.5;

// Main Slider
let mainSliderOptions = {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 3000
  },
  loopAdditionalSlides: 10,
  grabCursor: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    init: function () {
      this.autoplay.stop();
    },
    imagesReady: function () {
      this.el.classList.remove('loading');
      this.autoplay.start();
    },
    slideChangeTransitionEnd: function () {
      let swiper = this,
        captions = swiper.el.querySelectorAll('.caption');
      for (let i = 0; i < captions.length; ++i) {
        captions[i].classList.remove('show');
      }
      swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
    },
    progress: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        let slideProgress = swiper.slides[i].progress,
          innerOffset = swiper.width * interleaveOffset,
          innerTranslate = slideProgress * innerOffset;

        swiper.slides[i].querySelector(".slide-bgimg").style.transform =
          "translateX(" + innerTranslate + "px)";
      }
    },
    touchStart: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = "";
      }
    },
    setTransition: function (speed) {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + "ms";
        swiper.slides[i].querySelector(".slide-bgimg").style.transition =
          speed + "ms";
      }
    }
  }
};
let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

// Navigation Slider
let navSliderOptions = {
  loop: true,
  loopAdditionalSlides: 10,
  speed: 1000,
  spaceBetween: 5,
  slidesPerView: 5,
  centeredSlides: true,
  touchRatio: 0.2,
  slideToClickedSlide: true,
  direction: 'vertical',
  on: {
    imagesReady: function () {
      this.el.classList.remove('loading');
    },
    click: function () {
      mainSlider.autoplay.stop();
    }
  }
};
let navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;





document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const data = {
    name: name,
    email: email,
    message: message
  };

  fetch('http://localhost:3000/send-message', { // Используем локальный URL вашего Node.js сервера
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      console.log('Ответ сервера:', response);
      return response.json();
    })
    .then(data => {
      if (data.success) {
        alert('Сообщение отправлено успешно!');
      } else {
        alert('Ошибка отправки сообщения!');
      }
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    });
});





document.addEventListener("DOMContentLoaded", function () {
  const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');

  for (const link of smoothScrollLinks) {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
});
