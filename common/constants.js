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
    Тип фона для бегущей строки.
    Использовать одно из следующих значений:
        - "gradient" - градиент цвета
        - "image" - картинка
        - "video" - видео
     */
    BACKGROUND_TYPE: 'video',

    /*
    настройки  градиента по умолчанию
    */
    //цвет элемента градиента по умолчанию, выставляемый в админке при его добавлении
    BACKGROUND_GRADIENT_ELEMENT_COLOR: "#00008b",

    //угол направления градиента (в градусах)
    BACKGROUND_GRADIENT_ANGLE: 45,

    //цвета градиента
    BACKGROUND_GRADIENT_COLORS: [
        "#00008b", '#000000', "#00008b"
    ],

    //использовать в качестве фона бегущей строки картинку
    BACKGROUND_IMAGE: '../assets/background-1.jpg',

    //доступные картинки для фона
    BACKGROUND_IMAGES_AVAILABLE: [
        {'../assets/background-1.jpg': 'Картинка 1'},
        {'../assets/background-2.jpg': 'Картинка 2'},
        {'../assets/background-3.jpg': 'Картинка 3'},
        {'../assets/background-4.jpg': 'Картинка 4'},
    ],

    //использовать в качестве фона бегущей строки видео
    BACKGROUND_VIDEO: '../assets/video-1.mp4',

    //доступные картинки для фона
    BACKGROUND_VIDEOS_AVAILABLE: [
        {'../assets/video-1.jpg': 'Видео 1'},
        {'../assets/video-2.jpg': 'Видео 2'},
        {'../assets/video-3.jpg': 'Видео 3'},
        {'../assets/video-4.jpg': 'Видео 4'},
    ],


    //число пробелов между сообщениями
    DELIMETER_SIZE: 10,

    //сообщение по умолчанию
    ALTERNATIVE_MESSAGE: "Добро пожаловать на борт!",

    //анимировать ли сообщение по умолчанию или же оставлять статичным
    ALTERNATIVE_MESSAGE_ANIMATION: true,

    //набор сообщений по умолчанию
    MESSAGES: [

    ],
}