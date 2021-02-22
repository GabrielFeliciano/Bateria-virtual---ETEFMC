import { Sound } from "./Sound";
import { Control } from "./type";

export function ControlSetting (
    partInstrumentName: string, 
    key: string, 
    switchKey: (event: Control) => any
) {
    const keyStyled = key.toUpperCase();

    // instrument image
    const imageElem = document.createElement('img');
    imageElem.src = "./";
    imageElem.classList.add('instrument__image');

    // Name
    const nameElem = document.createElement('p');
    nameElem.textContent = partInstrumentName;
    nameElem.classList.add('instrument__name');

    // keybind
    const keycontrolElem = document.createElement('input');
    keycontrolElem.value = keyStyled;
    keycontrolElem.addEventListener('focusin', event => {
        keycontrolElem.classList.add('focus');
        keycontrolElem.value = "";
    });
    keycontrolElem.addEventListener('focusout', event => {
        keycontrolElem.classList.remove('focus');
        keycontrolElem.value = keyStyled;
        keycontrolElem.placeholder = "pressione uma tecla";
    });
    keycontrolElem.addEventListener('input', (event: InputEvent) => {
        const key = event.data[0];
        switchKey({ key, charCode: key.charCodeAt(0) });
    }, false);
    keycontrolElem.classList.add('instrument__control');

    // keybind container
    const keycontrolElemContainer = document.createElement('div');
    keycontrolElemContainer.classList.add('instrument__control__container')
    keycontrolElemContainer.appendChild(keycontrolElem);

    // info container
    const infoContainerElem = document.createElement('div');
    infoContainerElem.classList.add('instrument__info');
    infoContainerElem.appendChild(nameElem);
    infoContainerElem.appendChild(keycontrolElemContainer);

    // Main Container
    const container = document.createElement('li');

    container.classList.add('instrument__container');
    container.appendChild(imageElem);
    container.appendChild(infoContainerElem);

    return container;
}