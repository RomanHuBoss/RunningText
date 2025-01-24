class _NumberInputComponent extends _BaseComponent {
    constructor(properties) {
        super(properties);

        if (this.constructor.name === "_NumberInputComponent") {
            throw new Error(`Нельзя инициализировать ${this.constructor.name}`);
        }

        // проверка свойст, инициализирующих компонент
        this.checkProperties(properties);

        // расширяем валидаторы родительских компонентов валидатором по умолчанию
        this.validators = this.concatValidators([SPECIAL_VALIDATORS.isNumber]);
    }

    createDOMElement() {
        this.componentDOMElement = document.createElement("div");
        this.componentDOMElement.id = `wrapper-${this.uid}`;        
        this.componentDOMElement.dataset.storageProperty = this.storageProperty;
        this.componentDOMElement.dataset.storageValue = "";

        const labelHTML = this.useLabel ? `<label for="interactive-element-${this.uid}">${this.label}</label>` : '';

        this.componentDOMElement.innerHTML = `
        <div class="settings-form-group">        
            ${labelHTML}
            <input id="interactive-element-${this.uid}" min="${this.min}" max="${this.max}" step="${this.step}" type="number"/>
        </div>`;

        return this.componentDOMElement;
    }

    checkProperties(properties) {
        super.checkProperties(properties);
        this.isStoragePropertyNamePresented(properties);
    }

    fillFromStorage() {
        this.componentDOMElement.dataset.storageValue = CURRENT_SETTINGS[this.storageProperty];
    }

    sendToStorage() {
        CURRENT_SETTINGS[this.storageProperty] = this.componentDOMElement.dataset.storageValue;
    }


    connectToHandlers() {
        this.componentDOMElement.querySelector("input").addEventListener("change", () => {

        });
    }    
};