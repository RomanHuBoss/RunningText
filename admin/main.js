let iframe = null;

//включаемся по факту загрузки DOM-модели
window.addEventListener("DOMContentLoaded", (e) => {
    iframe = document.querySelector('iframe');
    setBackgroundTypeChangeListeners();
    setSectionsNumberChangeListener();
    setFontSizeChangeListener();
    setSpeedChangeListener();
});

//адаптация контента к изменениям размера окна браузера
window.addEventListener("resize", (e) => {
});

window.addEventListener("message", (event) => {
    console.log('Admin panel got message: ', event.data);
});

//слушаем изменения типа фона
const setBackgroundTypeChangeListeners = () => {
    const radios = Array.prototype.slice.call(document.querySelectorAll("input[name='background-type']"), 0);
    radios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            const selectedRadio = e.target;
            sendSetMessage('background-type', selectedRadio.id);
        });
    });
};

//слушаем изменения числа секций
const setSectionsNumberChangeListener = () => {
    const sectionNumberEl = document.querySelector("input[id='sections-number']");
    sectionNumberEl.addEventListener("change", (e) => {
        sendSetMessage('sections-number', e.target.value);
    });
};

//слушаем изменение размера шрифта
const setFontSizeChangeListener = () => {
    const fontSizeEl = document.querySelector("input[id='font-size-coeff']");
    fontSizeEl.addEventListener("change", (e) => {
        sendSetMessage('font-size-coeff', e.target.value);
    });
};

//слушаем изменение скорости бегущей строки
const setSpeedChangeListener = () => {
    const speedEl = document.querySelector("input[id='speed']");
    speedEl.addEventListener("change", (e) => {
        sendSetMessage('speed', e.target.value);
    });
};


//отправка сообщения на коммуникатор
const sendSetMessage = (property, value) => {
    iframe.contentWindow.postMessage({
        operation: 'set',
        key: property,
        value: value,
    }, "*");
};

//отправка сообщения на коммуникатор
const sendGetMessage = (property) => {
    iframe.contentWindow.postMessage({
        operation: 'get',
        key: property,
    }, "*");
};