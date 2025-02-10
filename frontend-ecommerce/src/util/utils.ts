export const LOW_STOCK_THRESHOLD = 30; //%

import { KeyboardEvent } from "react";
export const onlyNumberInput = (e: KeyboardEvent) => {
    if (!/[0-9]|Delete|Backspace|ArrowLeft|Tab|ArrowRight/i.test(e.key)) {
        e.preventDefault()
    }
};

export const decodeBadEncodeStrings = (str: string) => {
    const decoder = new TextDecoder("utf-8");
    const bytes = new Uint8Array(
        str.split("").map((char) => char.charCodeAt(0))
    );
    return decoder.decode(bytes);
}
export const decodeToken = (token: string) => {
    return JSON.parse(window.atob(token.split(".")[1]))
}


export const noAccents = (str: string) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
}

export function shuffle(array: any[]) {
    let currentIndex: number = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}