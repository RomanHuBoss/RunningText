const DEFAULT_SETTINGS = {
    //ограничение времени загрузки информации из хранилища (в секундах)
    LOADING_TIMEOUT: 5,

    //число секций с бегущей строкой на мониторе
    SECTIONS_NUMBER: 3,

    // размер шрифта бегущей строки от 0 до 1 относительно размера секции
    FONT_SIZE_COEFF: 0.35,

    // скорость бегущей строки
    SPEED: 20,

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

    //набор сообщений
    MESSAGES: [

    ],

    //набор цветов сообщений
    MESSAGES_COLORS: [

    ],

}