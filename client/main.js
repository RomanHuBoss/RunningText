//включаемся по факту загрузки DOM-модели
window.addEventListener("DOMContentLoaded", () => {
    generateSections();
});

//адаптация контента к изменениям размера окна браузера
window.addEventListener("resize", () => {
    generateTextSize();
    generateAnimation();
});

window.addEventListener("message", (event) => {
    console.log('Client panel got message: ', event.data);

    const eSource = event.data.hasOwnProperty('eSource') ? event.data.eSource : null;
    const eObject = event.data.hasOwnProperty('eObject') ? event.data.eObject : null;
    const eEvent = event.data.hasOwnProperty('eEvent') ? event.data.eEvent : null;
    const eKey = event.data.hasOwnProperty('eKey') ? event.data.eKey : null;
    const eOldValue = event.data.hasOwnProperty('eOldValue') ? event.data.eOldValue : null;
    const eNewValue = event.data.hasOwnProperty('eNewValue') ? event.data.eNewValue : null;

    if ((eSource !== 'communicator') ||
        (eObject !== "storage") || !(['replied', 'changed'].includes(eEvent))) {
        return;
    }

    if (eEvent == "changed" && eKey in propSetHandlers) {
        propSetHandlers[eKey](eOldValue, eNewValue);
    }
});

