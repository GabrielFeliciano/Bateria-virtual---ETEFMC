export interface Control {
    key: string,
    charCode: number | null
}

export interface SoundOptionalParam {
    imageUrl?: string
}

export interface MultipleSound extends Control {
    soundname: string,
    optionalParam?: SoundOptionalParam
}