let CURRENT_SETTINGS = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

//включаемся по факту загрузки DOM-модели
window.addEventListener("DOMContentLoaded", (e) =>  {
    startPreloading();
    let interval = null;

    new Promise((resolve, reject) => {
        getAllStorageProperties();
        const startTime = Date.now();

        interval = setInterval(() => {
            if (!isPreloading()) {
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
        if (isPreloading()) {
            stopPreloading();
        }
        initializeGUIComponents();
        autoConnectHandlers();
    });

});

window.addEventListener("message", (event) => {
    console.log('Admin panel got message: ', event.data);

    if (event.data.hasOwnProperty("payload") &&
        event.data.payload.hasOwnProperty("operation") &&
        event.data.payload.operation === "get_all" &&
        event.data.payload.hasOwnProperty("data")) {
            stopPreloading();
            const storageData = event.data.payload.data;
            Object.keys(storageData).forEach((key) => {
                const validationResult = validate(key, storageData[key]);
                CURRENT_SETTINGS[key] = (storageData[key] && validationResult) ? storageData[key] : DEFAULT_SETTINGS[key];
            });

    }
});




