const validators = {
    isPositive: (elem) => elem.value > 0,
    isInRange: (elem) => elem.value >= elem.min && elem.value <= elem.max,
    isMore: (elem) => elem.value > elem.min,
    isLess: (elem) => elem.value < elem.max,
    isMoreOrEqual: (elem) => elem.value >= elem.min,
    isLessOrEqual: (elem) => elem.value <= elem.min,
    isInArray: (elem) => elem.dataset.acceptableValues.includes(elem.value),
    isEmpty: (elem) => !elem.value,
};

const registerValidator = (htmlElement, validator) => {
    if (!htmlElement.validators) {
        htmlElement.validators = [];
    }
    htmlElement.validators.push(validator);
}

const validate = (htmlElement) => {
    if (!htmlElement.validators) {
        return;
    }

    htmlElement.validators.some((validator) => {
        return !validator();
    });
};