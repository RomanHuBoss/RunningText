
//включаемся по факту загрузки DOM-модели
window.addEventListener("DOMContentLoaded", (e) => {
    generateSections(SECTIONS_NUMBER);
});

window.addEventListener("resize", (e) => {
    setTextSize();
    generateAnimation();
});

const setTextSize = () => {
    const body = document.querySelector("body");
    const fontSize = (body.clientHeight / SECTIONS_NUMBER) * FONT_SIZE_COEFF
    const textWrappers = Array.prototype.slice.call(document.querySelectorAll(".text-wrapper"), 0);

    textWrappers.forEach((textWrapper) => {
        textWrapper.style.fontSize = `${fontSize}px`;
    })
};

const generateSections = (quantity) => {
    const body = document.querySelector("body");

    const sections = [];
    const textWrappers = [];
    let textWrapper = null;

    for (let i = 0; i < quantity; i++) {
        const section = document.createElement("section");
        section.classList.add("section");
        body.appendChild(section);

        if (USE_BACKGROUND_IMAGE) {
            section.classList.add("with-image");
        } else if (USE_BACKGROUND_VIDEO) {
            section.appendChild(generateVideoTags());
        }

        textWrapper = generateTextWrapper();
        section.appendChild(textWrapper);

        sections.push(section);
    }
    setTextSize();
    generateAnimation();

    return sections;
}

//генерация элемента бегущей строки с заданным размером шрифта
const generateTextWrapper = () => {
    const runningText = MESSAGES.join('&nbsp;'.repeat(DELIMETER_SIZE));
    const textWrapper = document.createElement("div");
    textWrapper.classList.add("text-wrapper");
    textWrapper.innerHTML = runningText;

    const rawText = textWrapper.innerText;
    textWrapper.style.animationDuration = `${5 + rawText.length * SPEED}s`;

    return textWrapper;
}

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
            <source type="video/mp4" src="../assets/video-1.mp4"/>
        </video>
    `;
    div = document.createElement("div");
    div.classList.add("video-wrapper");
    div.innerHTML = tmp;
    return div;
};