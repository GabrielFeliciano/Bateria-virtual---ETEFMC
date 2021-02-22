import { Control } from "./type";

export abstract class Keybind {

    control: Control;

    constructor (key: Control) {
        this.control = key;
    }

    public validateInput (event: KeyboardEvent) {
        const keyCon = this.control.key === event.key;
        const charCodeCon = this.control.charCode && this.control.charCode === (event.charCode || event.keyCode);
        if (keyCon || charCodeCon) {
            this.processInput();
        }
    }

    abstract processInput(): void
}

export class KeybindSound extends Keybind {

    sounds: typeof Audio[]

    constructor (key: Control) {
        super(key);
    }

    processInput(): void {
        throw new Error("Method not implemented.");
    }
}