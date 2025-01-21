/*
создает элемент выбора цвета
1) parentNode - родительский элемент:
   - div с классом .gradient-colors для выбора цвета градиента
   - иное...
2) kind - тип элемента выбора цвета
    - gradient - для градиента,
    - alternativeMessage - для альтернативного сообщения
    - message - для отдельного сообщения в бегущей строке
*/
const generateColorPicker = (color, parentNode, kind) => {
    const wrapper = document.createElement('div');
    
    let callbackName = null;
    if (kind === 'gradient') {
        callbackName = "gradientColorsCollectionChangeHandler";
    } else if (kind == 'alternativeMessage') {
        callbackName = "alternativeMessageColorChangeHandler";
    } else if (kind == 'message') {
        callbackName = "messageCollectionChangeHandler";
    }

    wrapper.innerHTML = `
        <input type="color" class="color-picker" title="Изменить цвет" value="${color}" data-event="change" data-handler="${callbackName}">
    `;

    parentNode.appendChild(wrapper);

    if (kind === 'gradient') {
        wrapper.classList.add("gradientColorPickerWrapper");
        wrapper.innerHTML += `<div class="color-picker-remover" title="Удалить цвет" data-event="click" data-handler="removeGradientColorPickerBtnClickHandler">X</div>`;
        const colorPickerRemover = wrapper.querySelector(".color-picker-remover");
        connectHandlerToElement(colorPickerRemover);
    }

    const colorPicker = wrapper.querySelector(".color-picker");
    connectHandlerToElement(colorPicker);
};


/*добавляет сообщение в список
    position - позиция в списке
        - first - в начало
        - last - в конец
    msgData - содержимое сообщения
*/
const addMessage = (position, msgData = null) => {
    const messagesTableBody = document.querySelector('.messages-table-body');
    const messagesQuantity = getDomElementsAsArray(document, '.messages-table-body .message-row').length;
    const uid = Sha256.hash(String(Date.now().toPrecision(21) + messagesQuantity));
    const messageHtml = `
        <div class="message-row" data-uid=${uid}>
            <div class="message-text">
                <input type="text" data-event="change" data-handler="messageCollectionChangeHandler" value="${msgData ? msgData.text : CURRENT_SETTINGS.ALTERNATIVE_MESSAGE}">
                <button class="delete-message-button red-color" title="Удалить сообщение">X</button>
            </div>
            <div class="message-color"></div>
        </div>
    `;

    if (position === 'first') {
        messagesTableBody.insertAdjacentHTML("afterbegin", messageHtml);
    } else if (position === 'last') {
        messagesTableBody.insertAdjacentHTML("beforeend", messageHtml);
    }
    
    const messageRow = messagesTableBody.querySelector(`.message-row[data-uid="${uid}"`);

    const messageInputField = messageRow.querySelector('.message-text input'); 
    connectHandlerToElement(messageInputField);

    const messageColorCell = messageRow.querySelector('.message-color');
    generateColorPicker(msgData ? msgData.color : CURRENT_SETTINGS.DEFAULT_MESSAGE_COLOR, messageColorCell, 'message', messageCollectionChangeHandler);

    const deleteMessageBtn = messageRow.querySelector(".delete-message-button");
    deleteMessageBtn.addEventListener("click", () => deleteMessage(uid));

    
    if (!msgData) {
        messageCollectionChangeHandler();
    }
};


// маркирует цвета градиента по номерам
const refreshGradientColorPickerNumbers = () => {
    getDomElementsAsArray(document, ".gradientColorPickerWrapper").forEach((element, index) => {
        element.dataset.serialNumber = index + 1;
    });
};

//устанавливает видимость панелей выбора фона
const setBackgroundPanelsVisibility = () => {
    VALIDATORS.BACKGROUND_TYPE__AVAILABLE.forEach((available_type) => {
        const panel = document.querySelector(`#${available_type}-settings`);
        panel.style.display = (available_type === CURRENT_SETTINGS.BACKGROUND_TYPE) ? 'flex' : 'none';
    });
};

const createImageSelector = () => {
    const selector = document.querySelector('#image-selector');
    selector.innerHTML = VALIDATORS.BACKGROUND_IMAGE__AVAILABLE.map(imgData => {
        return `<option value="${imgData.path}" ${imgData.path === CURRENT_SETTINGS.BACKGROUND_IMAGE ? "selected" : ""}>${imgData.title}</option>`;
    }).join('\n');
};

const createVideoSelector = () => {
    const selector = document.querySelector('#video-selector');
    selector.innerHTML = VALIDATORS.BACKGROUND_VIDEO__AVAILABLE.map(videoData => {
        return `<option value="${videoData.path}" ${videoData.path === CURRENT_SETTINGS.BACKGROUND_VIDEO ? "selected" : ""}>${videoData.title}</option>`;
    }).join('\n');
};

