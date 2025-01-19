// изменился угол градиента
const handleSetBackgroundGradientAngle = (eOldValue, eNewValue) => {
    generateSectionsBackground();
};


// изменилась скорость
const handleSetSpeed = (eOldValue, eNewValue) => {
    generateSections();
};

// изменился размер шрифта
const handleSetFontSizeCoeff = (eOldValue, eNewValue) => {
    generateSections();
};

// изменилось число секций
const handleSetSectionsNumber = (eOldValue, eNewValue) => {
    generateSections();
};

// изменился тип фона бегущей строки
const handleSetBackgroundType = (eOldValue, eNewValue) => {
    generateSectionsBackground();
};

const propSetHandlers = {
    'BACKGROUND_TYPE': handleSetBackgroundType,
    'SECTIONS_NUMBER': handleSetSectionsNumber,
    'FONT_SIZE_COEFF': handleSetFontSizeCoeff,
    'SPEED': handleSetSpeed,
    'BACKGROUND_GRADIENT_ANGLE': handleSetBackgroundGradientAngle,
};
