import * as baseJS from './base.js';
/**
 * Ciphers the text string in UCS2/Unicode
 * @param input is a text string to cipher
 * @returns packed HEX string
 */
export const pack = (input) => {
    let packed = '';
    for (let i = 0; i < input.length; i++) {
        packed += input.charCodeAt(i).toString(16).padStart(4, '0').toUpperCase;
    }
    return packed;
};
/**
 * Deciphers the HEX string in UCS2/Unicode
 * @param input is a HEX string to decipher
 * @returns unpacked UCS2/Unicode string
 */
export const upack = (input) => {
    let unpacked = '';
    const inputArr = baseJS.splitBinHex(input, 16);
    for (let i = 0; i < inputArr.length; i++) {
        let tempInput = parseInt(inputArr[i] + '' + inputArr[i + 1], 16);
        unpacked += String.fromCharCode(tempInput);
        i++;
    }
    return unpacked;
};
