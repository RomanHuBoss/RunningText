/*
создает элемент выбора цвета
1) parentNode - родительский элемент:
   - div с классом .gradient-colors для выбора цвета градиента
   - иное...
2) kind - тип элемента выбора цвета
    - gradient - для градиента, 
    - message - для отдельного сообщения в бегущей строке
*/
const generateColorPicker = (color, parentNode, kind = 'gradient') => {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
        <input type="color" class="color-picker" title="Изменить цвет" value="${color}" data-event="change" data-handler="${kind}ColorsCollectionChangeHandler">
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

