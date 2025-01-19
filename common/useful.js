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
};

//привязка обработчиков к созданному на лету DOM-элементу
//element - DOM-element
//dataEvent - тип события (String), например, "clik"
//dataHandler - название обработчика (String), например, "speedChangeHandler"
//additionalData - дополнительные параметры (что угодно)
const connectHandlerToElement = (element, additionalData = null) => {
    const dataEvent = element.dataset.event || null;
    const dataHandler = element.dataset.handler || null;

    if (!dataEvent) {
        throw Error(`Can't find data-event attribute for element`, element)
    } else if (!dataHandler) {
        throw Error(`Can't find data-handler attribute for element`, element)
    }

    try {
        const fn = eval(`${dataHandler}`);
        element.addEventListener(dataEvent, (e) => fn(e, additionalData));
        console.log(`Handler "${dataHandler}" connected for ${dataEvent} of element`, element)
    } catch (error) {
        console.warn(`Can't find ${dataHandler} for element`, element);
    }
};

const convertToBeInsertedInMethodName= (txt) => {
    txt = txt.toLowerCase();
    txt = txt.replace(" ", "");
    txt = txt.split("_");
    txt = txt.map(elem => elem.charAt(0).toUpperCase() + elem.slice(1));
    txt = txt.join("");
    return txt;
}