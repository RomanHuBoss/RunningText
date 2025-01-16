//число секций с бегущей строкой на мониторе
const DEFAULT_SECTIONS_NUMBER = 3;

// размер шрифта бегущей строки от 0 до 1 относительно размера секции
const DEFAULT_FONT_SIZE_COEFF = 0.35;

// скорость бегущей строки
const DEFAULT_SPEED = 1;

/*
настройки фонового градиента по умолчанию
*/
// использовать в качестве фона градиент цвета
const DEFAULT_USE_BACKGROUND_GRADIENT = false;

//угол направления градиента (в градусах)
const DEFAULT_BACKGROUND_GRADIENT_ANGLE = 45;

//цвета градиента
const DEFAULT_BACKGROUND_GRADIENT_COLORS = [
    'darkblue', 'black', 'darkblue'
];

//использовать в качестве фона бегущей строки картинку
const DEFAULT_USE_BACKGROUND_IMAGE = false;
const DEFAULT_BACKGROUND_IMAGE = '../assets/background-1.jpg';

//использовать в качестве фона бегущей строки видео
const DEFAULT_USE_BACKGROUND_VIDEO = true;
const DEFAULT_BACKGROUND_VIDEO = '../assets/video-1.mp4';

//число пробелов между сообщениями
const DEFAULT_DELIMETER_SIZE = 10;

//сообщение по умолчанию
const DEFAULT_MESSAGE = "Добро пожаловать на борт!";

//анимировать ли сообщение по умолчанию или же оставлять статичным
const DEFAULT_MESSAGE_ANIMATION = true;

//все настройки приложения по умолчанию
const SETTINGS = {
    SECTIONS_NUMBER: DEFAULT_SECTIONS_NUMBER,
    FONT_SIZE_COEFF: DEFAULT_FONT_SIZE_COEFF,
    SPEED: DEFAULT_SPEED,
    USE_BACKGROUND_GRADIENT: DEFAULT_USE_BACKGROUND_GRADIENT,
    BACKGROUND_GRADIENT_ANGLE: DEFAULT_BACKGROUND_GRADIENT_ANGLE,
    BACKGROUND_GRADIENT_COLORS: DEFAULT_BACKGROUND_GRADIENT_COLORS,
    USE_BACKGROUND_IMAGE: DEFAULT_USE_BACKGROUND_IMAGE,
    BACKGROUND_IMAGE: DEFAULT_BACKGROUND_VIDEO,        
    USE_BACKGROUND_VIDEO: DEFAULT_USE_BACKGROUND_VIDEO,
    BACKGROUND_VIDEO: DEFAULT_BACKGROUND_VIDEO,
    DELIMETER_SIZE: DEFAULT_DELIMETER_SIZE,
    DEFAULT_MESSAGE: DEFAULT_MESSAGE,
    DEFAULT_MESSAGE_ANIMATION: DEFAULT_MESSAGE_ANIMATION,
    MESSAGES: [], //по умолчанию массив сообщений пуст
};