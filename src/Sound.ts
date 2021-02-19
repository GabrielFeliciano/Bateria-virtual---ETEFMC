import { Control } from "./type";

export class Sound {

    src: string;
    control: Control;

    constructor (control: Control, src: string) {
        this.src = src;
        this.control = control;
    }

    play (event: KeyboardEvent) {
        const keyCon = this.control.key === event.key;
        const charCodeCon = this.control.charCode == (event.charCode || event.keyCode);
        if (keyCon || charCodeCon) {
            (new Audio(this.src)).play();
        }
    }

    switchControl (control: Control) {
        throw new Error('not implemented');
    }
}