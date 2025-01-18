//ищет DOM-элементы по селектору и возвращает в виде классического JS-массива
const getDomElementsAsArray = (parentElement, selector) => {
    return Array.prototype.slice.call(parentElement.querySelectorAll(selector), 0);
}

//отправка сообщения на коммуникатор на обновление свойства
const setStorageProperty = (property, value) => {
    document.querySelector('iframe').contentWindow.postMessage({
        operation: 'set',
        key: property,
        value: value,
    }, "*");
};

//отправка сообщения на коммуникатор на получение свойства
const getStorageProperty = (property) => {
    document.querySelector('iframe').contentWindow.postMessage({
        operation: 'get',
        key: property,
    }, "*");
};

//отправка сообщения на коммуникатор на получение всех свойств
const getAllStorageProperties = () => {
    document.querySelector('iframe').contentWindow.postMessage({
        operation: 'get_all',
    }, "*");
};

const startPreloading = () => {
    document.body.dataset.loading = 1;

    const preloaderWrapper = document.querySelector(".preloader-wrapper");
    preloaderWrapper.classList.remove("hidden");

    const panelWrapper = document.querySelector(".panel-wrapper");
    panelWrapper.classList.add("hidden");

};

const stopPreloading = () => {
    document.body.dataset.loading = 0;

    const preloaderWrapper = document.querySelector(".preloader-wrapper");
    preloaderWrapper.classList.add("hidden");

    const panelWrapper = document.querySelector(".panel-wrapper");
    panelWrapper.classList.remove("hidden");

};

const isPreloading = () => {
    return document.body.dataset.loading == 1;
};
