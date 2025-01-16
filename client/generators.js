//адаптация шрифта к изменению размера секции бегущей строки
const generateTextSize = () => {
    const body = document.querySelector("body");
    const fontSize = (body.clientHeight / SETTINGS.SECTIONS_NUMBER) * SETTINGS.FONT_SIZE_COEFF;
    const textWrappers = Array.prototype.slice.call(document.querySelectorAll(".text-wrapper"), 0);

    textWrappers.forEach((textWrapper) => {
        textWrapper.style.fontSize = `${fontSize}px`;
    })
};

// генерация фона для секций
const generateSectionsBackground = () => {
    const sections = Array.prototype.slice.call(document.querySelectorAll("section"), 0);

    sections.forEach(section => {
        section.style.background = null;
        section.classList.remove("with-image");

        const videoWrapper = section.querySelector(".video-wrapper");
        if (videoWrapper) {
            section.removeChild(videoWrapper);
        }

        if (SETTINGS.USE_BACKGROUND_GRADIENT) {
            section.style.background = `linear-gradient(${SETTINGS.BACKGROUND_GRADIENT_ANGLE}deg, ${SETTINGS.BACKGROUND_GRADIENT_COLORS.join(', ')})`;
        } else if (SETTINGS.USE_BACKGROUND_IMAGE) {
            section.classList.add("with-image");
        } else if (SETTINGS.USE_BACKGROUND_VIDEO) {
            section.appendChild(generateVideoTags());
        }
    });
};

//генерация секций с бегущими строками
const generateSections = () => {
    const body = document.querySelector("body");
    const sections = Array.prototype.slice.call(document.querySelectorAll("section"), 0);
    sections.forEach(section => section.parentNode.removeChild(section));

    for (let i = 0; i < SETTINGS.SECTIONS_NUMBER; i++) {
        const section = document.createElement("section");
        section.classList.add("section");
        body.appendChild(section);
        const textWrapper = generateTextWrapper();
        section.appendChild(textWrapper);
    }
    generateSectionsBackground();
    generateTextSize();
    generateAnimation();
    startAnimation();
}

//получение текста для секции (либо статический, если нет сообщений, либо склеенные сообщения)
const getTextPresented = () => {
    let text = SETTINGS.DEFAULT_MESSAGE;
    
    if (SETTINGS.MESSAGES.length) {
        text = SETTINGS.MESSAGES.join('&nbsp;'.repeat(SETTINGS.DELIMETER_SIZE));
    }
    return text;
};

const getRawText = () => {
    const div = document.createElement("div");
    div.innerHTML = getTextPresented();
    return div.innerText;
};

//генерация элемента бегущей строки с заданным размером шрифта
const generateTextWrapper = () => {
    const runningText = getTextPresented();

    const textWrapper = document.createElement("div");
    textWrapper.classList.add("text-wrapper");
    textWrapper.innerHTML = runningText;

    return textWrapper;
}

//рассчитывает скорость бегущей строки с учетом коэффициентов
const startAnimation = () => {
    if (SETTINGS.MESSAGES.length || SETTINGS.DEFAULT_MESSAGE_ANIMATION) {
        const textWrappers = Array.prototype.slice.call(document.querySelectorAll(".text-wrapper"), 0);

        //путь, который каждая буква преодолеет за одну прокрутку строки (в пикселах)
        const wayInPixels = window.innerWidth + textWrappers[0].offsetWidth;

        //первичная скорость (пиксели в секунду)
        const speed = 5 + SETTINGS.SPEED * Math.pow(SETTINGS.SPEED, 1/Math.E);

        const time = wayInPixels / speed;

        textWrappers.forEach((textWrapper) => {
            textWrapper.classList.add('with-animation');
            textWrapper.style.animationDuration = `${time}s`;
        });
        console.log(time, speed, getRawText().length, SETTINGS.SPEED);
    } else {
        textWrapper.classList.remove('with-animation');
        textWrapper.style.animationDuration = 0;
    }
};

//генерация CSS-анимации с учетом длины бегущей строки
const generateAnimation = () => {
    const textWrapper = document.querySelector(".text-wrapper");
    const stylesheetId = 'animation-stylesheet';
    let styleSheet = document.getElementById(stylesheetId);

    if (styleSheet) {
        styleSheet.remove();
    }

    styleSheet = document.createElement('style');
    styleSheet.id = 'animation-stylesheet';
    styleSheet.type = 'text/css';
    styleSheet.rel = 'stylesheet';
    document.head.appendChild(styleSheet);

    styleSheet.sheet.insertRule(`@keyframes running {           
        0%{ 
            left: 100vw; 
        } 
        100%{ 
            left: -${textWrapper.clientWidth}px; 
        } 
    }`, styleSheet.length);
};

//создает HTML-элементы воспроизведения видео на заднем фоне бегущей строки
const generateVideoTags = () => {
    const tmp = `
        <video loop autoplay muted>
            <source type="video/mp4" src="${SETTINGS.BACKGROUND_VIDEO}"/>
        </video>
    `;
    div = document.createElement("div");
    div.classList.add("video-wrapper");
    div.innerHTML = tmp;
    return div;
};