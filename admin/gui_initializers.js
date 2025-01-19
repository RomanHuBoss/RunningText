const initializeGUIComponents = () => {
    const sectionsNumberEl = document.querySelector("[data-storage-property='SECTIONS_NUMBER']");
    sectionsNumberEl.setAttribute("min", VALIDATORS.SECTIONS_NUMBER__RANGE[0]);
    sectionsNumberEl.setAttribute("max", VALIDATORS.SECTIONS_NUMBER__RANGE[1]);
    sectionsNumberEl.setAttribute("step", VALIDATORS.SECTIONS_NUMBER__RANGE[2]);
    sectionsNumberEl.value = CURRENT_SETTINGS.SECTIONS_NUMBER;

    const fontSizeCoeffEl = document.querySelector("[data-storage-property='FONT_SIZE_COEFF']");
    fontSizeCoeffEl.setAttribute("min", VALIDATORS.FONT_SIZE_COEFF__RANGE[0]);
    fontSizeCoeffEl.setAttribute("max", VALIDATORS.FONT_SIZE_COEFF__RANGE[1]);
    fontSizeCoeffEl.setAttribute("step", VALIDATORS.FONT_SIZE_COEFF__RANGE[2]);
    fontSizeCoeffEl.value = CURRENT_SETTINGS.FONT_SIZE_COEFF;

    const speedEl = document.querySelector("[data-storage-property='SPEED']");
    speedEl.setAttribute("min", VALIDATORS.SPEED__RANGE[0]);
    speedEl.setAttribute("max", VALIDATORS.SPEED__RANGE[1]);
    speedEl.setAttribute("step", VALIDATORS.SPEED__RANGE[2]);
    speedEl.value = CURRENT_SETTINGS.SPEED;

    const backgroundRadios = getDomElementsAsArray(document, `[data-storage-property="BACKGROUND_TYPE"]`);
    backgroundRadios.forEach((radio) => {
        radio.checked = radio.value === CURRENT_SETTINGS.BACKGROUND_TYPE;
    });

    const gradientAngleEl = document.querySelector("[data-storage-property='BACKGROUND_GRADIENT_ANGLE']");
    gradientAngleEl.setAttribute("min", VALIDATORS.BACKGROUND_GRADIENT_ANGLE__RANGE[0]);
    gradientAngleEl.setAttribute("max", VALIDATORS.BACKGROUND_GRADIENT_ANGLE__RANGE[1]);
    gradientAngleEl.setAttribute("step", VALIDATORS.BACKGROUND_GRADIENT_ANGLE__RANGE[2]);
    gradientAngleEl.value = CURRENT_SETTINGS.BACKGROUND_GRADIENT_ANGLE;

    const delimeterSizeEl = document.querySelector("[data-storage-property='DELIMETER_SIZE']");
    delimeterSizeEl.setAttribute("min", VALIDATORS.DELIMETER_SIZE__RANGE[0]);
    delimeterSizeEl.setAttribute("max", VALIDATORS.DELIMETER_SIZE__RANGE[1]);
    delimeterSizeEl.setAttribute("step", VALIDATORS.DELIMETER_SIZE__RANGE[2]);
    delimeterSizeEl.value = CURRENT_SETTINGS.DELIMETER_SIZE;

    if (CURRENT_SETTINGS.BACKGROUND_GRADIENT_COLORS.length) {
        CURRENT_SETTINGS.BACKGROUND_GRADIENT_COLORS.forEach((color) => {
            generateColorPicker(color, document.querySelector('.gradient-colors'), 'gradient');
        });
        refreshGradientColorPickerNumbers();
    }

    const alternativeMessageColorEl = document.querySelector("[data-storage-property='ALTERNATIVE_MESSAGE_COLOR']");
    alternativeMessageColorEl.value = CURRENT_SETTINGS.ALTERNATIVE_MESSAGE_COLOR;

    setBackgroundPanelsVisibility();
    createImageSelector();
    createVideoSelector();
    setImagePreview();
    setVideoPreview();


};
