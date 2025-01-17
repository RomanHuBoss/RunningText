//обрабатываем изменение числа секций
const sectionsNumberChangeHandler = (e) => {
    console.log(`Send message to storage to update "${e.target.dataset.storageProperty}" with value ${e.target.value}`);
    setStorageProperty(e.target.dataset.storageProperty, e.target.value);
};

//обрабатываем изменение размера шрифта
const fontSizeCoeffChangeHandler = (e) => {
    console.log(`Send message to storage to update "${e.target.dataset.storageProperty}" with value ${e.target.value}`);
    setStorageProperty(e.target.dataset.storageProperty, e.target.value);
};

//обрабатываем изменение скорости
const speedChangeHandler = (e) => {
    console.log(`Send message to storage to update "${e.target.dataset.storageProperty}" with value ${e.target.value}`);
    setStorageProperty(e.target.dataset.storageProperty, e.target.value);
};

//обрабатываем изменение типа фона бегущей строки (картинка, видео, градиент)
const backgroundTypeChangeHandler = (e) => {
    console.log(`Send message to storage to update "${e.target.dataset.storageProperty}" with value ${e.target.value}`);
    setStorageProperty(e.target.dataset.storageProperty, e.target.value);
};

//обрабатываем изменения угла градиента
const backgroundGradientAngleChangeHandler = (e) => {
    console.log(`Send message to storage to update "${e.target.dataset.storageProperty}" with value ${e.target.value}`);
    setStorageProperty(e.target.dataset.storageProperty, e.target.value);
};

//обрабатываем щелчок на кнопке добавления цвета градиента
const addGradientColorBtnClickHandler = (e) => {
    const gradientsPanel = document.querySelector(".gradient-colors");
    generateColorPicker(DEFAULT_SETTINGS.BACKGROUND_GRADIENT_ELEMENT_COLOR, gradientsPanel, "gradient");
    refreshGradientColorPickerNumbers();
    gradientsPanel.dispatchEvent(new Event("gradientColorsCollectionChange"));
};

//обрабатываем щелчок на кнопке удаления цвета градиента
const removeGradientColorPickerBtnClickHandler = (e) => {
    const result = window.confirm("Подтверждаете удаление цвета?");
    if (!result) {
        return;
    }    
    e.target.parentNode.remove();
    refreshGradientColorPickerNumbers();
    const gradientsPanel = document.querySelector(".gradient-colors");
    gradientsPanel.dispatchEvent(new Event("gradientColorsCollectionChange"));
}

//обрабатываем изменения градиента (удаление, добавление)
const gradientColorsCollectionChangeHandler = (e) => {
    const proxyElement = document.querySelector(".gradient-colors");
    const colorPickers = getDomElementsAsArray(document, ".gradient-colors .color-picker");
    const gradientColors = [];
    colorPickers.forEach(colorPicker => {
        gradientColors.push(colorPicker.value);
    });
    console.log(`Send message to storage to update "${proxyElement.dataset.storageProperty}" with value ${gradientColors}`);
    setStorageProperty(proxyElement.dataset.storageProperty, gradientColors);
};

//привязка обработчиков к визуальным элементам
const autoConnectHandlers = () => {
    const elements = getDomElementsAsArray(document, ".auto-connected-handlers");
    elements.forEach((element) => {
        connectHandlerToElement(element);
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