const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const testimonials = [
    {
        name: "Анастасия П.",
        text: "Долго ждала открытия этой клиники, так как живу в этом доме и очень удобно расположение для меня, решила прийти на консультацию(порадовало, что она была бесплатной!) мне выписали план лечения, я решила сделать сразу чистку и насколько было мое удивление, что после чистки мои зубы выглядели как после отбеливания, далее мне полечили кариес на двух зубах и опять же, после печального опыта у стоматологов, я была рада, что это все было безболезненно и врач был максимально внимательным ко всем моим ощущениям!",
        link: "https://yandex.ru/maps/org/72287503858/reviews?reviews%5BpublicId%5D=5ek7fgxypv7eqv15g1rxpzvj5w&si=1rumtw2v7218h25a6402b1qdxm&utm_source=review"
    },
    {
        name: "Никита Шубин",
        text: "С детства боялся стоматологов , но деваться было некуда потому что болели уже и верхние и нижние зубы. Увидел , что в моем доме открылась стоматология и решился !!! Ко мне нашли грамотный подход , чуть ли не как к ребенку и оказали качественую мед помощь . Спасибо вам!!!",
        link: "https://yandex.ru/maps/org/72287503858/reviews?reviews%5BpublicId%5D=fh6rx6axh008kmqxddm8x8yr90&si=1rumtw2v7218h25a6402b1qdxm&utm_source=review"
    },
    {
        name: "Кристина Пархоменко",
        text: "Хочу выразить благодарность,доктору Сергею Арамовичу,была на удалении зуба мудрости,начиная с анестезии до удаления,я ничего не почувствовала,более того не пила ни одного обезбаливающего тк не болело ,не было ни оттека ничего!Будто мне ничего и не делали.Спасибо вам.",
        link: "https://yandex.ru/maps/org/72287503858/reviews?reviews%5BpublicId%5D=w2kce8n3bhph87gxtfba31k2t8&si=1rumtw2v7218h25a6402b1qdxm&utm_source=review"
    },
    {
        name: "а а",
        text: "Был на приеме у Ядояна Сергея Арамовича, в первую очередь привлекала клиника, а во вторую, после приема разговорились и узнал, что он приехал из Москвы открывать тут клинику. В общем, специалист-👍",
        link: "https://yandex.ru/maps/org/72287503858/reviews?reviews%5BpublicId%5D=u5xpkjrt8anu6gbj348vbf4x1w&si=1rumtw2v7218h25a6402b1qdxm&utm_source=review"
    },
];

let currentIndex = 0;

function createTestimonialElement(testimonial, index) {
    const div = document.createElement('div');
    div.className = 'testimonial';
    div.innerHTML = `
        <div class="wrapper">
        <h3>${testimonial.name}</h3>
        <div class="star">
                <img src="/img/star.svg" alt="${testimonial.name}">
                <img src="/img/star.svg" alt="${testimonial.name}">
                <img src="/img/star.svg" alt="${testimonial.name}">
                <img src="/img/star.svg" alt="${testimonial.name}">
                <img src="/img/star.svg" alt="${testimonial.name}">
        </div>
        </div>
        
        
        <p>${testimonial.text}</p>
        <div class="flex">
            <a href="${testimonial.link}" class="achives g">Отзывы
              <div class="line g"></div>
            </a>
            <svg id="g" style="display: flex;" width="14" height="14" viewBox="0 0 14 14" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M1.24265 12.5563L12.5564 1.24264M12.5564 1.24264V9.72792M12.5564 1.24264H4.07108"
                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
    `;
    return div;
}

function updateCarousel() {
    carousel.innerHTML = '';
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        carousel.appendChild(createTestimonialElement(testimonials[currentIndex], currentIndex));
    } else {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        const nextIndex = (currentIndex + 1) % testimonials.length;

        carousel.appendChild(createTestimonialElement(testimonials[prevIndex], prevIndex));
        const activeTestimonial = createTestimonialElement(testimonials[currentIndex], currentIndex);
        activeTestimonial.classList.add('active');
        carousel.appendChild(activeTestimonial);
        carousel.appendChild(createTestimonialElement(testimonials[nextIndex], nextIndex));
    }
}

function showNext() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateCarousel();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateCarousel();
}

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Responsive behavior
function handleResize() {
    updateCarousel();
}

window.addEventListener('resize', handleResize);

// Initial setup
updateCarousel();

Auto - scroll(optional)
setInterval(showNext, 500);



function scrollFooter(scrollY, heightFooter) {
    console.log(scrollY);
    console.log(heightFooter);

    if (scrollY >= heightFooter) {
        $('footer').css({
            'bottom': '0px'
        });
    }
    else {
        $('footer').css({
            'bottom': '-' + heightFooter + 'px'
        });
    }
}

$(window).load(function () {
    var windowHeight = $(window).height(),
        footerHeight = $('footer').height(),
        heightDocument = (windowHeight) + ($('.content').height()) + ($('footer').height()) - 20;

    // Definindo o tamanho do elemento pra animar
    $('#scroll-animate, #scroll-animate-main').css({
        'height': heightDocument + 'px'
    });

    // Definindo o tamanho dos elementos header e conteúdo
    $('header').css({
        'height': windowHeight + 'px',
        'line-height': windowHeight + 'px'
    });

    $('.wrapper-parallax').css({
        'margin-top': windowHeight + 'px'
    });

    scrollFooter(window.scrollY, footerHeight);

    // ao dar rolagem
    window.onscroll = function () {
        var scroll = window.scrollY;

        $('#scroll-animate-main').css({
            'top': '-' + scroll + 'px'
        });

        $('header').css({
            'background-position-y': 50 - (scroll * 100 / heightDocument) + '%'
        });

        scrollFooter(scroll, footerHeight);
    }
});



