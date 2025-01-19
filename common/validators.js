const VALIDATORS = {
    //интервал допустимых значений числа секций (и шаг между ними)
    SECTIONS_NUMBER__RANGE: [3, 4, 1],

    //интервал допустимых значений размера шрифта (и шаг между ними)
    FONT_SIZE_COEFF__RANGE: [0.1, 0.9, 0.1],

    //интервал допустимых значений скорости (и шаг между ними)
    SPEED__RANGE: [1, 100, 1],

    /*
    допустимые типы фона
    - "gradient" - градиент цвета
    - "image" - картинка
    - "video" - видео
     */
    BACKGROUND_TYPE__AVAILABLE: [
        "gradient", "image", "video"
    ],

    //интервал допустимых значений угла наклона градиента
    BACKGROUND_GRADIENT_ANGLE__RANGE: [0, 360, 1],

    //доступные картинки для фона
    BACKGROUND_IMAGE__AVAILABLE: [
        {path: '../assets/background-1.jpg', title: 'Картинка 1'},
        {path: '../assets/background-2.jpg', title: 'Картинка 2'},
        {path: '../assets/background-3.jpg', title: 'Картинка 3'},
        {path: '../assets/background-4.jpg', title: 'Картинка 4'},
    ],

    //доступные видео для фона
    BACKGROUND_VIDEO__AVAILABLE: [
        {path: '../assets/video-1.mp4', title: 'Видео 1'},
        {path: '../assets/video-2.mp4', title: 'Видео 2'},
        {path: '../assets/video-3.mp4', title: 'Видео 3'},
        {path: '../assets/video-4.mp4', title: 'Видео 4'},
    ],

    //интервал допустимых значений числа пробелов между отдельными сообщениями бегущей строки
    DELIMETER_SIZE__RANGE: [1, 30, 1],
};

const validate = (key, value) => {
    if (key === "SECTIONS_NUMBER") {
        value = parseInt(value);
        return value >= VALIDATORS.SECTIONS_NUMBER__RANGE[0] &&
            value <= VALIDATORS.SECTIONS_NUMBER__RANGE[1];
    } else if (key === "FONT_SIZE_COEFF") {
        value = parseFloat(value);
        return value >= VALIDATORS.FONT_SIZE_COEFF__RANGE[0] &&
            value <= VALIDATORS.FONT_SIZE_COEFF__RANGE[1];
    } else if (key === "SPEED") {
        value = parseFloat(value);
        return value >= VALIDATORS.SPEED__RANGE[0] &&
            value <= VALIDATORS.SPEED__RANGE[1];
    } else if (key === "BACKGROUND_TYPE") {
        return VALIDATORS.BACKGROUND_TYPE__AVAILABLE.includes(value);
    } else if (key === "COLOR") {
        //console.log(key, value);
        const regex = /^#[0-9a-f]{3,6}$/i;
        return regex.test(value);
    } else if (key === "BACKGROUND_GRADIENT_ANGLE") {
        value = parseInt(value);
        return value >= VALIDATORS.BACKGROUND_GRADIENT_ANGLE__RANGE[0] &&
            value <= VALIDATORS.BACKGROUND_GRADIENT_ANGLE__RANGE[1];
    } else if (key === "BACKGROUND_IMAGE") {
        return VALIDATORS.BACKGROUND_IMAGE__AVAILABLE.filter(elem=> elem.path === value).length > 0;
    } else if (key === "BACKGROUND_VIDEO") {
        return VALIDATORS.BACKGROUND_VIDEO__AVAILABLE.filter(elem=> elem.path === value).length > 0;
    } else if (key === "DELIMETER_SIZE") {
        value = parseInt(value);
        return value >= VALIDATORS.DELIMETER_SIZE__RANGE[0] &&
            value <= VALIDATORS.DELIMETER_SIZE__RANGE[1];
    } else if (key === "MESSAGE") {
        return value.length() > 0;
    }

    return true;
};