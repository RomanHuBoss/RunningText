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

// изменилось число секций
const handleSetDelimeterSize = (oldValue, newValue) => {
    generateSections();
};

// изменился тип фона бегущей строки
const handleSetBackgroundType = (oldValue, newValue) => {
    generateSectionsBackground();
};

const handleSetBackgroundVideo = (oldValue, newValue) => {
    generateSectionsBackground();
};

const handleSetBackgroundImage = (oldValue, newValue) => {
    generateSectionsBackground();
};

const handleSetAlternativeMessage = (oldValue, newValue) => {
    generateSections();
};

const handleSetAlternativeMessageColor = (oldValue, newValue) => {
    generateSections();
};

const handleSetMessages = (oldValue, newValue) => {
    generateSections();
};

const initEvents = () => {
    Object.keys(CURRENT_SETTINGS).forEach((key) => {
        try {
            const eventName = `handleSet${convertToBeInsertedInMethodName(key)}`;            
            const callback = eval(`handleSet${convertToBeInsertedInMethodName(key)}`);

            document.body.addEventListener(eventName, callback);
        } catch (e) {
            console.warn(e);
        }
    });
}