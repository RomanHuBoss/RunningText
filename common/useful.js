//признак загрузки первичных данных из хранилища
let IS_INITIAL_STORAGE_LOADING = false;

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
    const preloaderWrapper = document.querySelector(".preloader-wrapper");
    preloaderWrapper.classList.remove("hidden");

    const panelWrapper = document.querySelector(".panel-wrapper");
    panelWrapper.classList.add("hidden");

};

const stopPreloading = () => {
    const preloaderWrapper = document.querySelector(".preloader-wrapper");
    preloaderWrapper.classList.add("hidden");

    const panelWrapper = document.querySelector(".panel-wrapper");
    panelWrapper.classList.remove("hidden");

};

const isPreloading = () => {
    return document.body.dataset.loading == 1;
};

const loadInitialSettingsFromStorage = (callbacksBeforeInit = [], callbacksAfterInit = []) => {
    IS_INITIAL_STORAGE_LOADING = true;

    let interval = null;
    new Promise((resolve, reject) => {
        callbacksBeforeInit.forEach((callback) => callback());
        getAllStorageProperties();

        const startTime = Date.now();

        interval = setInterval(() => {
            if (!IS_INITIAL_STORAGE_LOADING) {
                resolve();
            }
            if ((Date.now() - startTime) / 1000 > DEFAULT_SETTINGS.LOADING_TIMEOUT) {
                reject();
            }
        }, 50);
    }).then(() => {
        console.log("Settings successfully initialized from localsorage");
    }).catch(() => {
        console.log("Can't initialize settings from localsorage");
    }).finally(() => {
        clearInterval(interval);
        callbacksAfterInit.forEach((callback) => callback());
    });
}