import { Soundboard } from "./Soundboard";
import { ControlSetting } from "./ControlSetting";
import { sounds } from "./sounds";

const soundboard = new Soundboard('public/audio', 'mp3');

soundboard.onSoundsChange(sounds => {
    document.querySelectorAll('.controls-painel').forEach(settingsPainel => {
        settingsPainel.innerHTML = "";
        sounds.forEach(sound => {
            const child = ControlSetting(sound.id, sound.control.key, event => {
                soundboard.switchSoundKeybind(sound, event);
            }, sound.optionalParam);

            sound.onSoundStarted = () => {
                child.classList.add('played');
                setTimeout(
                    () => child.classList.remove('played'), 
                    100
                );
            }

            settingsPainel.appendChild(child);
        })
    })
})

soundboard.addMultipleSounds(sounds);

console.log(soundboard)