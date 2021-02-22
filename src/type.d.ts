export interface Control {
    key: string,
    charCode: number | null
}

export interface MultipleSound extends Control {
    soundname: string
}