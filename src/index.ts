import { Soundboard } from "./Soundboard";
import * as $ from 'jquery';

const soundboard = new Soundboard('public/audio', 'mp3');
soundboard
.addSound('bumbo', {key: 'q', charCode: null})
.addSound('caixa', {key: 'w', charCode: null})
.addSound('hihat1', {key: 'e', charCode: null})
.addSound('crash', {key: 'r', charCode: null})

document.body.addEventListener('keypress', event => {
    soundboard.play(event)
});

$('<div>')