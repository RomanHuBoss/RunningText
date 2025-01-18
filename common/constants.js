const DEFAULT_SETTINGS = {
    //ограничение времени загрузки информации из хранилища (в секундах)
    LOADING_TIMEOUT: 5,

    //число секций с бегущей строкой на мониторе
    SECTIONS_NUMBER: 3,

    // размер шрифта бегущей строки от 0 до 1 относительно размера секции
    FONT_SIZE_COEFF: 0.35,

    // скорость бегущей строки
    SPEED: 1,

    /*
    Тип фона для бегущей строки по умолчанию
     */
    BACKGROUND_TYPE: 'video',

    /*
    настройки  градиента по умолчанию
    */
    //цвет элемента градиента по умолчанию, выставляемый в админке при его добавлении
    BACKGROUND_GRADIENT_ELEMENT_COLOR: "#00008b",

    //угол направления градиента (в градусах)
    BACKGROUND_GRADIENT_ANGLE: 45,

    //цвета градиента по умолчанию
    BACKGROUND_GRADIENT_COLORS: [
        "#00008b", '#000000', "#00008b"
    ],

    //картинка в качестве фона по умолчанию
    BACKGROUND_IMAGE: '../assets/background-1.jpg',

    //видео в качестве фона по умолчанию
    BACKGROUND_VIDEO: '../assets/video-1.mp4',

    //число пробелов между сообщениями
    DELIMETER_SIZE: 10,

    //сообщение по умолчанию (при отсутствии иной информации)
    ALTERNATIVE_MESSAGE: "Добро пожаловать на борт!",

    //анимировать ли сообщение по умолчанию или же оставлять статичным
    ALTERNATIVE_MESSAGE_ANIMATION: true,

    //цвет умолчательного сообщения
    ALTERNATIVE_MESSAGE_COLOR: "#ffffff",

    //валидаторы
    VALIDATORS: {
        //интервал допустимых значений числа секций (и шаг между ними)
        SECTIONS_NUMBER__RANGE: [3, 4, 1],

        //интервал допустимых значений размера шрифта (и шаг между ними)
        FONT_SIZE_COEFF__RANGE: [0, 0.35, 0.1],

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
            {'../assets/background-1.jpg': 'Картинка 1'},
            {'../assets/background-2.jpg': 'Картинка 2'},
            {'../assets/background-3.jpg': 'Картинка 3'},
            {'../assets/background-4.jpg': 'Картинка 4'},
        ],

        //доступные видео для фона
        BACKGROUND_VIDEO__AVAILABLE: [
            {'../assets/video-1.jpg': 'Видео 1'},
            {'../assets/video-2.jpg': 'Видео 2'},
            {'../assets/video-3.jpg': 'Видео 3'},
            {'../assets/video-4.jpg': 'Видео 4'},
        ],

        //интервал допустимых значений числа пробелов между отдельными сообщениями бегущей строки
        DELIMETER_SIZE__RANGE: [1, 30, 1],

    },

    //набор сообщений
    MESSAGES: [

    ],

    //набор цветов сообщений
    MESSAGES_COLORS: [

    ],

}