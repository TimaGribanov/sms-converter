/**
 * Splits binary or HEX string to octets.
 * @param input input string of the function (either HEX or binary)
 * @param base original radix (2 for binary input and 16 for HEX input)
 * @returns an array containing octets
 */
export const splitBinHex = (input, base) => {
    let charArray = input.split('');
    let finalCharsArray = [];
    let err = '';
    if (base === 16) { //to split HEX
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
    else if (base === 2) { //to split binary
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
