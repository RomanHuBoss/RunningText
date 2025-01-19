let CURRENT_SETTINGS = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

//включаемся по факту загрузки DOM-модели
window.addEventListener("load", () => {
    const callbacksBeforeInit = [];
    const callbacksAfterInit = [generateSections]
    loadInitialSettingsFromStorage(callbacksBeforeInit, callbacksAfterInit);
});

//адаптация контента к изменениям размера окна браузера
window.addEventListener("resize", () => {
    generateSections();
});

window.addEventListener("message", (event) => {
    console.log('Client panel got message: ', event.data);

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
        } else if (event.data.payload.operation === "get") {
            const key = event.data.hasOwnProperty('eKey') ? event.data.key : null;
            let oldValue = event.data.hasOwnProperty('oldValue') ? event.data.oldValue : null;
            let newValue = event.data.hasOwnProperty('newValue') ? event.data.newValue : null;

            if (newValue && key === "BACKGROUND_GRADIENT_COLORS") {
                newValue = newValue.split(',');
                if (newValue.length) {
                    newValue = newValue.filter(elem => validate("COLOR", elem))
                }
            }
            const validationResult = validate(key, newValue);
            CURRENT_SETTINGS[key] = (newValue && validationResult) ? newValue : DEFAULT_SETTINGS[key];

            if (newValue !== oldValue && key in propSetHandlers) {
                propSetHandlers[key](oldValue, newValue);
            }
        }
    }
});

