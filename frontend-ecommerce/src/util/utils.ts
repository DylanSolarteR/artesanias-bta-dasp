import { KeyboardEvent } from "react";
export const onlyNumberInput = (e: KeyboardEvent) => {
    if (!/[0-9]|Delete|Backspace|ArrowLeft|ArrowRight/i.test(e.key)) {
        e.preventDefault()
    }
};

export const decodeBadEncodeStrings = (str: string) => {
    const decoder = new TextDecoder("utf-8");
    let bytes = new Uint8Array(
        str.split("").map((char) => char.charCodeAt(0))
    );
    return decoder.decode(bytes);
}