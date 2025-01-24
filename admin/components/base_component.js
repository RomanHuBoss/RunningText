class _BaseComponent {
    constructor(properties) {
        if (this.constructor.name === "_BaseComponent") {
            throw new Error(`Нельзя инициализировать ${this.constructor.name}`);
        }

        this.validators = [];

        this.checkProperties(properties);

        this.uid = Sha256.hash(String(Date.now().toPrecision(21) + this.constructor.name + this.storageProperty));
        this.useLabel = "label" in properties && !isNullOrUndefined(properties.label);
        this.label = "label" in properties && !isNullOrUndefined(properties.label) ? properties.label : '';

    }

    // базовая проверка свойств компонента, переданных в конструктор
    checkProperties(properties) {
        if ("storageProperty" in properties && !this.isCorrectStoragePropertyName(properties.storageProperty)) {
            throw new Error(`Указано пустое или некорректное свойство хранилища для связывания с компонентом ${this.constructor.name}`);
        }
        if ("validators" in properties && Array.isArray(properties.validators)) {
            this.checkValidators(properties);
        }
    }

    checkValidators(properties) {
        const wrongValidators = properties.validators.filter(
            validator => !Object.values(SPECIAL_VALIDATORS).includes(validator));

        if (wrongValidators.length) {
            throw new Error(`Для компонента ${this.constructor.name} указаны несуществующие валидаторы`);
        }
    }

    //проверяет наличие обязательного для связывания с хранилизем имени свойства хранилища
    isStoragePropertyNamePresented(properties) {
        return "storageProperty" in properties;
    }

    //проверяет корректность указанного для связывания с хранилищем имени свойства хранилища
    isCorrectStoragePropertyName(name) {
        return !isNullOrUndefined(name) && name in CURRENT_SETTINGS;
    }

    //в дочерних компонентах дополняет списки валидаторов родительских компонентов указанными при инициализации дочерних
    concatValidators(validators) {
        this.validators = this.validators.concat(validators);
    }
};