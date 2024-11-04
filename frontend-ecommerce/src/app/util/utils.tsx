import { KeyboardEvent } from "react";
export const onlyNumberInput = (e: KeyboardEvent) => { 
    if (!/[0-9]|Delete|Backspace|ArrowLeft|ArrowRight/i.test(e.key))
        { e.preventDefault() 
    }
};