import { Sound } from "./Sound";
import { Control, MultipleSound, SoundOptionalParam } from "./type";

const createUrlBuilder = (urlToSounds: string, extensionSoundFile: string) => {
    return (soundfilename : string): string => (
        urlToSounds.replace(/(?<!\/)$/g, '/') + 
        soundfilename.replace(/(?<!\.)$/g, '.') + 
        extensionSoundFile
    )
}

interface Settings {
    caseSensitive?: boolean
}

interface SoundEventPayload {
    type: 'create'|'delete'|'controlchanged'
}

const defaultOptions: Settings = {
    caseSensitive: false
}

export class Soundboard {

    private readonly buildUrl: (soundfilename: string) => string;
    private readonly sounds: Sound[] = []
    private readonly settings: Settings

    private readonly soundObservers: ((param1: Sound[]) => any)[] = []

    constructor (
        urlToSounds: string, 
        extensionSoundFile: string, 
        options?: Settings
    ) {
        this.settings = options ? {...defaultOptions, ...options} : defaultOptions
        this.buildUrl = createUrlBuilder(urlToSounds, extensionSoundFile);

        document.body.addEventListener('keypress', event => {
            if (event.target === document.body) { 
                this.play(event); 
            }
        });
    }

    public addSound (soundname: string, control: Control, optionalParam: SoundOptionalParam) {
        const audio = new Sound(
            control, 
            this.buildUrl(soundname), 
            soundname, 
            optionalParam
        );

        this.sounds.push(audio);

        this.triggerSoundObservers();
        return this;
    }

    public addMultipleSounds (sounds: MultipleSound[]) {
        sounds.forEach(sound => {
            const {key, charCode, soundname, optionalParam } = sound;
            const control = {key, charCode};
            this.addSound(soundname, control, optionalParam || {});
        })

        return this;
    }

    public switchSoundKeybind (sound: Sound, control: Control) {
        sound.switchControl(control);

        this.triggerSoundObservers();
        return this;
    }

    private triggerSoundObservers () {
        this.soundObservers.forEach(observer => observer(this.sounds));
    }

    public onSoundsChange (
        observer: (param1: Sound[]) => any
    ) {
        this.soundObservers.push(observer);
        return this;
    }

    public play (event: KeyboardEvent) {
        for (let sound of this.sounds) {
            sound.play(this.settings.caseSensitive ? (
                event
            ) : (
                {
                    ...event, 
                    key: event.key.toLowerCase(),
                    charCode: String.fromCharCode(event.charCode || event.keyCode).toLowerCase().charCodeAt(0)
                }
            ));
        }
        
        return this;
    }

    public getSounds () { return [...this.sounds] }
}