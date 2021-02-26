import { Control, SoundOptionalParam } from "./type";

export class Sound {

    optionalParam: SoundOptionalParam;
    id: string;
    src: string;
    control: Control;

    // Propriedas como duration demoram para ser carregadas na nova instância
    // Como tenho que usar as propriedas para criar animações já irei instanciar um audio
    audioExample: HTMLAudioElement;

    onSoundEnded: (this: HTMLAudioElement, ev: Event) => any;
    onSoundStarted: () => any;

    constructor (
        control: Control, 
        src: string, 
        id: string, 
        optionalParam: SoundOptionalParam
    ) {
        this.optionalParam = optionalParam;
        this.id = id;
        this.src = src;
        this.control = control;

        this.audioExample = new Audio(this.src);
    }

    play (event: KeyboardEvent) {
        const keyCon = this.control.key === event.key;
        const charCodeCon = this.control.charCode && this.control.charCode === (event.charCode || event.keyCode);
        if (keyCon || charCodeCon) {
            const audio = new Audio(this.src);
            audio.addEventListener('ended', this.onSoundEnded);

            this.onSoundStarted();
            audio.play();
        }
    }

    getAudio () { 
        return { ...this.audioExample } 
    }

    switchControl (control: Control) {
        this.control = control;
    }
}