//адаптация шрифта к изменению размера секции бегущей строки
const generateTextSize = () => {
    const body = document.querySelector("body");
    const fontSize = (body.clientHeight / CURRENT_SETTINGS.SECTIONS_NUMBER) * CURRENT_SETTINGS.FONT_SIZE_COEFF;
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

        if (CURRENT_SETTINGS.BACKGROUND_TYPE == "gradient") {
            section.style.background = `linear-gradient(${CURRENT_SETTINGS.BACKGROUND_GRADIENT_ANGLE}deg, ${CURRENT_SETTINGS.BACKGROUND_GRADIENT_COLORS.join(', ')})`;
        } else if (CURRENT_SETTINGS.BACKGROUND_TYPE == "image") {
            section.classList.add("with-image");
            section.style.backgroundImage = `url(${CURRENT_SETTINGS.BACKGROUND_IMAGE})`;
        } else if (CURRENT_SETTINGS.BACKGROUND_TYPE == "video") {
            section.appendChild(generateVideoTags());
        }
    });
};

//генерация секций с бегущими строками
const generateSections = () => {
    const body = document.querySelector("body");
    const sections = getDomElementsAsArray(document, "section");
    sections.forEach(section => section.parentNode.removeChild(section));

    for (let i = 0; i < CURRENT_SETTINGS.SECTIONS_NUMBER; i++) {
        const section = document.createElement("section");
        section.classList.add("section");
        body.appendChild(section);
        const textWrapper = generateTextWrapper();
        section.appendChild(textWrapper);
    }

    generateSectionsBackground();
    generateTextSize();
    restartAnimation();
}

//получение текста для секции (либо статический, если нет сообщений, либо склеенные сообщения)
const getTextPresented = () => {
    let text = `<span style="color: ${CURRENT_SETTINGS.ALTERNATIVE_MESSAGE_COLOR}">${CURRENT_SETTINGS.ALTERNATIVE_MESSAGE}</span>`;
    
    if (CURRENT_SETTINGS.MESSAGES.length) {
        text = CURRENT_SETTINGS.MESSAGES.join('&nbsp;'.repeat(CURRENT_SETTINGS.DELIMETER_SIZE));
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

//запускает/перезапускает анимацию (изменилась скорость и т.п.)
const restartAnimation = () => {
    if (CURRENT_SETTINGS.MESSAGES.length || CURRENT_SETTINGS.ALTERNATIVE_MESSAGE.length) {
        const textWrappers = getDomElementsAsArray(document, ".text-wrapper");

        textWrappers.forEach((textWrapper) => {
            textWrapper.classList.add('with-animation');
        });

        //путь, который каждая буква преодолеет за одну прокрутку строки (в пикселах)
        const wayInPixels = window.innerWidth + textWrappers[0].offsetWidth;

        //скорость (пиксели в секунду)
        const speed = 5 + CURRENT_SETTINGS.SPEED * Math.pow(CURRENT_SETTINGS.SPEED, 1/Math.E);

        const time = wayInPixels / speed;

        textWrappers.forEach((textWrapper) => {
            textWrapper.style.animationDuration = `${time}s`;
        });
        
        generateAnimation();

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
    //console.log(textWrapper.offsetWidth);
    styleSheet.sheet.insertRule(`@keyframes running {           
        0%{ 
            left: 100vw; 
        } 
        100%{ 
            left: -${textWrapper.offsetWidth}px; 
        } 
    }`, styleSheet.length);
};

//создает HTML-элементы воспроизведения видео на заднем фоне бегущей строки
const generateVideoTags = () => {
    const tmp = `
        <video loop autoplay muted>
            <source type="video/mp4" src="${CURRENT_SETTINGS.BACKGROUND_VIDEO}"/>
        </video>
    `;
    const div = document.createElement("div");
    div.classList.add("video-wrapper");
    div.innerHTML = tmp;
    return div;
};

const hidePreloadingLayer = () => {
    const preloadWrapper = document.querySelector(".preloader-wrapper");
    const panelWrapper = document.querySelector(".panel-wrapper");

    preloadWrapper.classList.add("hidden");
    panelWrapper.classList.remove("hidden");

};