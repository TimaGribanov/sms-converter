"use strict";
let gsmSevenArr = [
    ['@', '£', '$', '¥', 'è', 'é', 'ù', 'ì', 'ò', 'Ç', '\\n', 'Ø', 'ø', '\\r', 'Å', 'å'],
    ['Δ', '_', 'Φ', 'Γ', 'Λ', 'Ω', 'Π', 'Ψ', 'Σ', 'Θ', 'Ξ', '', '\\f', '^', '{', '}', '\\', '[', '~', ']', '|', '€', 'Æ', 'æ', 'ß', 'É'],
    [' ', '!', '\"', '#', '¤', '%', '&', '\'', '(', ')', '*', '\=+', ',', '-', '.', '/'],
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?'],
    ['¡', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
    ['P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä', 'Ö', 'Ñ', 'Ü', '§'],
    ['¿', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'],
    ['p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ñ', 'ü', 'à']
];
//split binary or HEX string to octets
let splitBinHex = (input, base) => {
    let charArray = input.split('');
    let finalCharsArray = [];
    let err = '';
    if (base === 16) { //to convert from HEX
        //check for wrong symbols
        for (let element of charArray) {
            if (!element.match(/[a-fA-F0-9]/)) {
                alert('Error! HEX string must contain only digits or letters from A to F!');
                err = 'non-hex';
                break;
            }
        }
        ;
        //process depending on err
        if (err === 'non-hex') {
            console.log('Input string is not HEX!');
        }
        else {
            for (let i = 0; i < charArray.length; i += 2) {
                let digits = charArray[i] + charArray[i + 1];
                finalCharsArray.push(digits);
            }
        }
    }
    else if (base === 2) { //to convert to HEX
        //check for wrong symbols
        for (let element of charArray) {
            if (element != '0' && element != '1') {
                alert('Error! Binary string must contain only 0 or 1!');
                err = 'non-binary';
                break;
            }
        }
        ;
        //process depending on err
        if (err == 'non-binary') {
            console.log('Input string is not binary!');
        }
        else {
            for (let i = 0; i < charArray.length; i += 8) {
                let digits = charArray[i] + charArray[i + 1] + charArray[i + 2] + charArray[i + 3] + charArray[i + 4] + charArray[i + 5] + charArray[i + 6] + charArray[i + 7];
                finalCharsArray.push(digits);
            }
        }
    }
    else { //if not binary or HEX
        alert('Error! Base not 2 or 16!');
    }
    return finalCharsArray;
};
//convert body (with UDH or wiihout)
let gsmSevenBody = (input) => {
    let udh = false;
    let splitBody = splitBinHex(input, 2);
    if (udh) {
        const udl = parseInt(splitBody[0], 2); //SM length without UDL, total number of septets from UDHL until the end
        const udhl = parseInt(splitBody[1], 2); //UDH length without UDH and UDHL, total number of octets in UDH
        const notSM = udhl + 2; //UDH length, UDHL value plus 2 octets (UDL and UDHL themselves)
    }
    else {
    }
    let decodedBody = '';
    return decodedBody;
};
let gsmSeven = (input) => {
    let decodedSM = '';
    return decodedSM;
};
