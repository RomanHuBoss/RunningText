//изменился градиент
const handleSetBackgroundGradientColors = (oldValue, newValue) => {
    generateSectionsBackground();
};

// изменился угол градиента
const handleSetBackgroundGradientAngle = (oldValue, newValue) => {
    generateSectionsBackground();
};


// изменилась скорость
const handleSetSpeed = (oldValue, newValue) => {
    generateSections();
};

// изменился размер шрифта
const handleSetFontSizeCoeff = (oldValue, newValue) => {
    generateSections();
};

// изменилось число секций
const handleSetSectionsNumber = (oldValue, newValue) => {
    generateSections();
};

// изменился тип фона бегущей строки
const handleSetBackgroundType = (oldValue, newValue) => {
    generateSectionsBackground();
};

const initEvents = () => {
    Object.keys(CURRENT_SETTINGS).forEach((key) => {
        try {
            const eventName = `handleSet${convertToBeInsertedInMethodName(key)}`;
            const callback = eval(`handleSet${convertToBeInsertedInMethodName(key)}`);

            document.body.addEventListener(eventName, callback);
        } catch (e) {
            console.error(e);
        }
    });
}