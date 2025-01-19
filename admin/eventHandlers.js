//обрабатываем изменение числа секций
const sectionsNumberChangeHandler = (e) => {
    const key = e.target.dataset.storageProperty;
    const value = e.target.value;

    if (validate(key, value)) {
        console.log(`Sent message to storage to update "${key}" with value ${value}`);
        CURRENT_SETTINGS.SECTIONS_NUMBER = value;
        setStorageProperty(key, value);
    } else {
        e.target.value = CURRENT_SETTINGS.SECTIONS_NUMBER;
        console.warn(`Can't send message to storage to update "${key}" with value ${value}. Validation failed!`);
    }
};

//обрабатываем изменение размера шрифта
const fontSizeCoeffChangeHandler = (e) => {
    const key = e.target.dataset.storageProperty;
    const value = e.target.value;

    if (validate(key, value)) {
        console.log(`Sent message to storage to update "${key}" with value ${value}`);
        CURRENT_SETTINGS.FONT_SIZE_COEFF = value;
        setStorageProperty(key, value);
    } else {
        console.warn(`Can't send message to storage to update "${key}" with value ${value}. Validation failed!`);
    }
};

//обработка изменений сообщения по умолчанию
const alternativeMessageChangeHandler = (e) => {
    const key = e.target.dataset.storageProperty;
    const value = e.target.value;

    if (validate(key, value)) {
        console.log(`Sent message to storage to update "${key}" with value ${value}`);
        CURRENT_SETTINGS.ALTERNATIVE_MESSAGE = value;
        setStorageProperty(key, value);
    } else {
        e.target.value = CURRENT_SETTINGS.ALTERNATIVE_MESSAGE;
        console.warn(`Can't send message to storage to update "${key}" with value ${value}. Validation failed!`);
    }
};

const alternativeMessageColorChangeHandler = (e) => {
    const key = e.target.dataset.storageProperty;
    const value = e.target.value;

    if (validate("COLOR", value)) {
        console.log(`Sent message to storage to update "${key}" with value ${value}`);
        CURRENT_SETTINGS.ALTERNATIVE_MESSAGE_COLOR = value;
        setStorageProperty(key, value);
    } else {
        e.target.value = CURRENT_SETTINGS.ALTERNATIVE_MESSAGE_COLOR;
        console.warn(`Can't send message to storage to update "${key}" with value ${value}. Validation failed!`);
    }
}

//обрабатываем изменение скорости
const speedChangeHandler = (e) => {
    const key = e.target.dataset.storageProperty;
    const value = e.target.value;

    if (validate(key, value)) {
        console.log(`Sent message to storage to update "${key}" with value ${value}`);
        CURRENT_SETTINGS.SPEED = value;
        setStorageProperty(key, value);
    } else {
        e.target.value = CURRENT_SETTINGS.SPEED;
        console.warn(`Can't send message to storage to update "${key}" with value ${value}. Validation failed!`);
    }
};

//обрабатываем изменение типа фона бегущей строки (картинка, видео, градиент)
const backgroundTypeChangeHandler = (e) => {
    const key = e.target.dataset.storageProperty;
    const value = e.target.value;

    if (validate(key, value)) {
        console.log(`Sent message to storage to update "${key}" with value ${value}`);
        CURRENT_SETTINGS.BACKGROUND_TYPE = value;
        setStorageProperty(key, value);
        setBackgroundPanelsVisibility();
    } else {
        console.warn(`Can't send message to storage to update "${key}" with value ${value}. Validation failed!`);
    }
};

//обрабатываем изменения угла градиента
const backgroundGradientAngleChangeHandler = (e) => {
    const key = e.target.dataset.storageProperty;
    const value = e.target.value;

    if (validate(key, value)) {
        console.log(`Sent message to storage to update "${key}" with value ${value}`);
        CURRENT_SETTINGS.BACKGROUND_GRADIENT_ANGLE = value;
        setStorageProperty(key, value);
    } else {
        e.target.value = CURRENT_SETTINGS.BACKGROUND_GRADIENT_ANGLE;
        console.warn(`Can't send message to storage to update "${key}" with value ${value}. Validation failed!`);
    }
};

//обрабатываем изменения числа пробелов между сообщениями
const delimeterSizeChangeHandler = (e) => {
    const key = e.target.dataset.storageProperty;
    const value = e.target.value;

    if (validate(key, value)) {
        console.log(`Sent message to storage to update "${key}" with value ${value}`);
        CURRENT_SETTINGS.DELIMETER_SIZE = value;
        setStorageProperty(key, value);
    } else {
        e.target.value = CURRENT_SETTINGS.DELIMETER_SIZE;
        console.warn(`Can't send message to storage to update "${key}" with value ${value}. Validation failed!`);
    }
}

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

const backgroundImageChangeHandler = (e) => {
    const key = e.target.dataset.storageProperty;
    const value = e.target.value;

    if (validate(key, value)) {
        console.log(`Sent message to storage to update "${key}" with value ${value}`);
        CURRENT_SETTINGS.BACKGROUND_IMAGE = value;
        setStorageProperty(key, value);
        setImagePreview();
    } else {
        console.warn(`Can't send message to storage to update "${key}" with value ${value}. Validation failed!`);
    }
};

const backgroundVideoChangeHandler = (e) => {
    const key = e.target.dataset.storageProperty;
    const value = e.target.value;

    if (validate(key, value)) {
        console.log(`Sent message to storage to update "${key}" with value ${value}`);
        CURRENT_SETTINGS.BACKGROUND_VIDEO = value;
        setStorageProperty(key, value);
        setVideoPreview();
    } else {
        console.warn(`Can't send message to storage to update "${key}" with value ${value}. Validation failed!`);
    }
};

const setImagePreview = () => {
    document.querySelector(".image-preview").style.backgroundImage = `url(${CURRENT_SETTINGS.BACKGROUND_IMAGE})`;
};

const setVideoPreview = () => {
    const videoWrapper = document.querySelector(".video-preview");
    videoWrapper.innerHTML = `<video loop autoplay muted src="${CURRENT_SETTINGS.BACKGROUND_VIDEO}" type="video/mp4"/>`;
};


//привязка обработчиков к визуальным элементам
const autoConnectHandlers = () => {
    const elements = getDomElementsAsArray(document, ".auto-connected-handlers");
    elements.forEach((element) => {
        connectHandlerToElement(element);
    });
};



