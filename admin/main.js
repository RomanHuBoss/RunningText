let CURRENT_SETTINGS = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

//включаемся по факту загрузки DOM-модели
window.addEventListener("load", (e) =>  {
    const callbacksBeforeInit = [startPreloading];
    const callbacksAfterInit = [stopPreloading, initializeGUIComponents, autoConnectHandlers];
    loadInitialSettingsFromStorage(callbacksBeforeInit, callbacksAfterInit);
});

window.addEventListener("message", (event) => {
    console.log('Admin panel got message: ', event.data);

    if (event.data.hasOwnProperty("payload") && event.data.payload.hasOwnProperty("operation") && event.data.payload.hasOwnProperty("data")) {
        if (event.data.payload.operation === "get_all") {
            IS_INITIAL_STORAGE_LOADING = false;
            const storageData = event.data.payload.data;
            Object.keys(storageData).forEach((key) => {
                let value = storageData[key];
                if (value && key === "BACKGROUND_GRADIENT_COLORS") {
                    value = value.split(',');
                    if (value.length) {
                        value = value.filter(elem => validate("COLOR", elem))
                    }
                }
                const validationResult = validate(key, value);
                CURRENT_SETTINGS[key] = (value && validationResult) ? value : DEFAULT_SETTINGS[key];
            });
        }
    }
});




