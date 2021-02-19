import { Sound } from "./Sound";
import { Control } from "./type";

const createUrlBuilder = (urlToSounds: string, extensionSoundFile: string) => {
    return (soundfilename : string): string => (
        urlToSounds.replace(/(?<!\/)$/g, '/') + 
        soundfilename.replace(/(?<!\.)$/g, '.') + 
        extensionSoundFile
    )
}

export class Soundboard {

    buildUrl: (soundfilename: string) => string;
    sounds: Sound[] = []

    constructor (urlToSounds: string, extensionSoundFile: string) {
        this.buildUrl = createUrlBuilder(urlToSounds, extensionSoundFile)
    }

    addSound (soundname: string, control: Control) {
        const audio = new Sound(control, this.buildUrl(soundname));

        this.sounds.push(audio);

        return this;
    }

    addMultipleSounds () {
        throw new Error('not implemented');
    }

    play (event: KeyboardEvent) {
        for (let sound of this.sounds) {
            sound.play(event);
        }
        
        return this;
    }

    getSounds () { return [...this.sounds] }
}