//#region 
// ================================================
// ==================== бургер + оверлей ==========
// ================================================
// #region
const burger = document.getElementById('burger');
const navMenu = document.querySelector('.nav__menu');

// Создаём оверлей динамически
const overlay = document.createElement('div');
overlay.className = 'overlay';
if (!document.querySelector('.overlay')) {
    document.body.appendChild(overlay);
}

function toggleMenu() {
    const isOpen = navMenu.classList.contains('active');
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    burger.setAttribute('aria-expanded', !isOpen);
}

burger.addEventListener('click', toggleMenu);

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
    });
});

overlay.addEventListener('click', () => {
    burger.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
    }
});

//#region 
// ================================================
// ==================== СЛАЙДЕРЫ ===================
// ================================================
// #region

// ---------- Универсальная функция создания слайдера ----------
function createSlider(selector, data, options = {}) {
    const {
        gap = 25,
        delay = 4000,
        itemClass = 'slider__item',
        iconClass = 'slider__item__icon',
        titleClass = 'slider__item__title',
        textClass = 'slider__item__paragraph',
        altPrefix = 'иконка',
        isReversive = false,
        reversiveMaxIndex = 1
    } = options;

    const slider = document.querySelector(selector);
    if (!slider) return null;

    // Генерация элементов
    slider.innerHTML = data.map(item => `
        <li class="${itemClass}">
            <img class="${iconClass}" src="${item.icon}" alt="${altPrefix} ${item.title}" width="35" height="35" loading="lazy">
            <h3 class="${titleClass}">${item.title}</h3>
            <p class="${textClass}">${item.text || item.description}</p>
        </li>
    `).join('');

    // Автопрокрутка
    const firstItem = slider.querySelector(`.${itemClass}`);
    if (!firstItem) return null;

    const itemWidth = firstItem.offsetWidth + gap;
    const totalItems = data.length;
    let currentIndex = 0;
    let direction = 1;
    const maxReversiveIndex = Math.min(reversiveMaxIndex, totalItems - 1);

    function nextSlide() {
        if (isReversive) {
            let nextIndex = currentIndex + direction;
            if (nextIndex > maxReversiveIndex) {
                direction = -1;
                nextIndex = maxReversiveIndex - 1;
            } else if (nextIndex < 0) {
                direction = 1;
                nextIndex = 1;
            }
            if (maxReversiveIndex === 0) {
                nextIndex = 0;
                direction = 1;
            }
            currentIndex = nextIndex;
        } else {
            currentIndex = (currentIndex + 1) % 3;
        }
        slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    let interval = setInterval(nextSlide, delay);

    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, delay);
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newItem = slider.querySelector(`.${itemClass}`);
            if (newItem) {
                const newWidth = newItem.offsetWidth + gap;
                if (newWidth !== itemWidth) {
                    slider.style.transform = `translateX(-${currentIndex * newWidth}px)`;
                }
            }
        }, 200);
    });

    return slider;
}

// ---------- ДАННЫЕ ДЛЯ СЛАЙДЕРОВ ----------
const sliderData = [
    {
        icon: './img/icons/slider-icon.svg',
        title: 'Банкротство физических лиц',
        text: 'Процедуру банкротства физических лиц в России регулирует закон «О несостоятельности (банкротстве)».'
    },
    {
        icon: './img/icons/slider-icon.svg',
        title: 'Банкротство физических лиц',
        text: 'Процедуру банкротства физических лиц в России регулирует закон «О несостоятельности (банкротстве)».'
    },
    {
        icon: './img/icons/slider-icon.svg',
        title: 'Банкротство физических лиц',
        text: 'Процедуру банкротства физических лиц в России регулирует закон «О несостоятельности (банкротстве)».'
    },
    {
        icon: './img/icons/slider-icon.svg',
        title: 'Банкротство физических лиц',
        text: 'Процедуру банкротства физических лиц в России регулирует закон «О несостоятельности (банкротстве)».'
    },
    {
        icon: './img/icons/slider-icon.svg',
        title: 'Банкротство физических лиц',
        text: 'Процедуру банкротства физических лиц в России регулирует закон «О несостоятельности (банкротстве)».'
    },
    {
        icon: './img/icons/slider-icon.svg',
        title: 'Банкротство физических лиц',
        text: 'Процедуру банкротства физических лиц в России регулирует закон «О несостоятельности (банкротстве)».'
    }
];

const lawyerData = [
    {
        icon: './img/lawyear.png',
        title: 'Горюнова Полина<br> Алексеевна',
        description: 'Юрист международного права'
    },
    {
        icon: './img/lawyear.png',
        title: 'Горюнова Полина<br> Алексеевна',
        description: 'Юрист международного права'
    },
    {
        icon: './img/lawyear.png',
        title: 'Горюнова Полина<br> Алексеевна',
        description: 'Юрист международного права'
    },
    {
        icon: './img/lawyear.png',
        title: 'Горюнова Полина<br> Алексеевна',
        description: 'Юрист международного права'
    },
    // --- ДОБАВЛЕНЫ ДВА НОВЫХ ЮРИСТА ---
    {
        icon: './img/lawyear.png',
        title: 'Горюнова Полина<br> Алексеевна',
        description: 'Юрист международного права'
    },
    {
        icon: './img/lawyear.png',
        title: 'Горюнова Полина<br> Алексеевна',
        description: 'Юрист международного права'
    }
];

// ---------- ЗАПУСК СЛАЙДЕРОВ ----------
createSlider('.services__slider', sliderData, {
    gap: 25,
    delay: 4000,
    itemClass: 'slider__item',
    iconClass: 'slider__item__icon',
    titleClass: 'slider__item__title',
    textClass: 'slider__item__paragraph',
    altPrefix: 'Иконка услуги',
    isReversive: false
});

createSlider('.lawyers__slider', lawyerData, {
    gap: 25,
    delay: 4000,
    itemClass: 'lawyers__item',
    iconClass: 'lawyers__item__img',
    titleClass: 'lawyers__item__title',
    textClass: 'lawyers__item__description',
    altPrefix: 'Фото юриста',
    isReversive: true,
    reversiveMaxIndex: 1   // по-прежнему только между первым и вторым
});