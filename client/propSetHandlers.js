// изменилась скорость
const handleSetSpeed = (eOldValue, eNewValue) => {
    SETTINGS.SPEED = eNewValue >= 1 & eNewValue <= 100 ? eNewValue : DEFAULT_SPEED;
    startAnimation();
};

// изменился размер шрифта
const handleSetFontSizeCoeff = (eOldValue, eNewValue) => {
    SETTINGS.FONT_SIZE_COEFF = eNewValue >= 0.01 & eNewValue <= 0.99 ? eNewValue : DEFAULT_FONT_SIZE_COEFF;
    generateSections();
};

// изменилось число секций
const handleSetSectionsNumber = (eOldValue, eNewValue) => {
    SETTINGS.SECTIONS_NUMBER = eNewValue >= 3 & eNewValue <= 4 ? eNewValue : DEFAULT_SECTIONS_NUMBER;
    generateSections();
};

// изменился тип фона бегущей строки
const handleSetBackgroundType = (eOldValue, eNewValue) => {
    SETTINGS.USE_BACKGROUND_GRADIENT = eNewValue == 'USE_BACKGROUND_GRADIENT' ? true : false;
    SETTINGS.USE_BACKGROUND_IMAGE = eNewValue == 'USE_BACKGROUND_IMAGE' ? true : false;
    SETTINGS.USE_BACKGROUND_VIDEO = eNewValue == 'USE_BACKGROUND_VIDEO' ? true : false;
    generateSectionsBackground();
};

const propSetHandlers = {
    'background-type': handleSetBackgroundType,
    'sections-number': handleSetSectionsNumber,
    'font-size-coeff': handleSetFontSizeCoeff,
    'speed': handleSetSpeed,
};
