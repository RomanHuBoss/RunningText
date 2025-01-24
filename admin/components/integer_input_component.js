class IntegerInputComponent extends _NumberInputComponent {
    constructor(properties) {
        super(properties);

        this.validators = super.validators.concat([SPECIAL_VALIDATORS.isInteger()]);

        this.min = "min" in properties && SPECIAL_VALIDATORS.isInteger(properties.min) ? properties.min : Number.MIN_SAFE_INTEGER;
        this.max = "max" in properties && SPECIAL_VALIDATORS.isInteger(properties.max) ? properties.max : Number.MAX_SAFE_INTEGER;
        this.step = "step" in properties && SPECIAL_VALIDATORS.isInteger(properties.step) ? properties.step : 1;

        this.componentDOMElement = this.createDOMElement();

        this.connectToHandlers();

        return this.componentDOMElement;
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