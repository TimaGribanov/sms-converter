import * as baseJS from './base.js';

/**
 * Ciphers the text string in 8bit
 * @param input is a text string to cipher
 * @returns packed HEX string
 */
export const pack = (input: string): string => {
    let packed = '';

    for (let i = 0; i < input.length; i++) {
        packed += input.charCodeAt(i).toString(16).toUpperCase;
    }

    return packed;
}

/**
 * Deciphers the HEX string in 8bit
 * @param input is a HEX string to be deciphered
 * @returns a deciphered text string
 */
export const upack = (input: string): string => {
    let unpacked = '';

    const inputArr = baseJS.splitBinHex(input, 16);

    inputArr.forEach(e => {
        unpacked += String.fromCharCode(parseInt(e, 16));
    });

    return unpacked;
}