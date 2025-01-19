let CURRENT_SETTINGS = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

//включаемся по факту загрузки DOM-модели
window.addEventListener("load", () => {
    const callbacksBeforeInit = [];
    const callbacksAfterInit = [initEvents, generateSections]
    loadInitialSettingsFromStorage(callbacksBeforeInit, callbacksAfterInit);
});

//адаптация контента к изменениям размера окна браузера
window.addEventListener("resize", () => {
    generateSections();
});

window.addEventListener("message", (event) => {
    console.log('Client panel got message: ', event.data);

    const payload = event.data.hasOwnProperty("payload") ? event.data.payload : null;
    const operation = payload && event.data.payload.hasOwnProperty("operation") ? event.data.payload.operation : null;

    if (payload && operation) {
        if (operation == "get_all") {
            IS_INITIAL_STORAGE_LOADING = false;
            const storageData = event.data.payload.hasOwnProperty("data") ? event.data.payload.data : {};
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
        } else if (operation === "set") {
            const key = event.data.payload.hasOwnProperty('key') ? event.data.payload.key : null;
            let oldValue = event.data.payload.hasOwnProperty('oldValue') ? event.data.payload.oldValue : null;
            let newValue = event.data.payload.hasOwnProperty('newValue') ? event.data.payload.newValue : null;

            if (newValue && key === "BACKGROUND_GRADIENT_COLORS") {
                newValue = newValue.split(',');
                if (newValue.length) {
                    newValue = newValue.filter(elem => validate("COLOR", elem))
                }
            }
            const validationResult = validate(key, newValue);
            CURRENT_SETTINGS[key] = (newValue && validationResult) ? newValue : DEFAULT_SETTINGS[key];

            const callback = eval(`handleSet${convertToBeInsertedInMethodName(key)}`);
            console.log(callback);
            if (newValue !== oldValue && typeof callback === "function") {
                document.body.dispatchEvent(new CustomEvent(`handleSet${convertToBeInsertedInMethodName(key)}`, {
                    detail: { oldValue, newValue }
                }));
            }
        }
    }
});

