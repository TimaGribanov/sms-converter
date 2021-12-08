  /**
   * Splits binary or HEX string to octets.
   * @param input input string of the function (either HEX or binary)
   * @param base original radix (2 for binary input and 16 for HEX input)
   * @returns an array containing octets
   */
export const splitBinHex = (input: string, base: number): string[] => {
    let charArray = input.split('');
    let finalCharsArray: string[] = [];
    let err = '';
  
    if (base === 16) { //to split HEX
      //check for wrong symbols
      for (let element of charArray) {
        if (!element.match(/[a-fA-F0-9]/)) {
          alert('Error! HEX string must contain only digits or letters from A to F!');
          err = 'non-hex';
          break;
        }
      };
      //process depending on err
      if (err === 'non-hex') {
        console.log('Input string is not HEX!');
      } else {
        for (let i = 0; i < charArray.length; i += 2) {
          let digits = charArray[i] + charArray[i + 1];
          finalCharsArray.push(digits);
        }
      }
    } else if (base === 2) { //to split binary
      //check for wrong symbols
      for (let element of charArray) {
        if (element != '0' && element != '1') {
          alert('Error! Binary string must contain only 0 or 1!');
          err = 'non-binary';
          break;
        }
      };
      //process depending on err
      if (err == 'non-binary') {
        console.log('Input string is not binary!');
      } else {
        for (let i = 0; i < charArray.length; i += 8) {
          let digits = charArray[i] + charArray[i + 1] + charArray[i + 2] + charArray[i + 3] + charArray[i + 4] + charArray[i + 5] + charArray[i + 6] + charArray[i + 7];
          finalCharsArray.push(digits);
        }
      }
    } else { //if not binary or HEX
      alert('Error! Base not 2 or 16!');
    }
    return finalCharsArray;
  }

  export const splitBinSeptets = (input: string): string[] => {
    let finalSeptets: string[] = [];
    let charArray = input.split('');

    for (let i = 0; i < charArray.length; i += 7) {
      let digits: string;
      if (typeof charArray[i + 1] !== 'undefined') {
        if (typeof charArray[i + 2] !== 'undefined') {
          if (typeof charArray[i + 3] !== 'undefined') {
            if (typeof charArray[i + 4] !== 'undefined') {
              if (typeof charArray[i + 5] !== 'undefined') {
                if (typeof charArray[i + 6] !== 'undefined') {
                  digits = charArray[i] + charArray[i + 1] + charArray[i + 2] + charArray[i + 3] + charArray[i + 4] + charArray[i + 5] + charArray[i + 6];
                } else {
                  digits = charArray[i] + charArray[i + 1] + charArray[i + 2] + charArray[i + 3] + charArray[i + 4] + charArray[i + 5]
                }
              } else {
                digits = charArray[i] + charArray[i + 1] + charArray[i + 2] + charArray[i + 3] + charArray[i + 4]
              }
            } else {
              digits = charArray[i] + charArray[i + 1] + charArray[i + 2] + charArray[i + 3]
            }
          } else {
            digits = charArray[i] + charArray[i + 1] + charArray[i + 2]
          }
        } else {
          digits = charArray[i] + charArray[i + 1]
        }
      } else {
        digits = charArray[i]
      }
      //digits = charArray[i] + charArray[i + 1] + charArray[i + 2] + charArray[i + 3] + charArray[i + 4] + charArray[i + 5] + charArray[i + 6];
      finalSeptets.push(digits);
    }

    return finalSeptets;
  }

  /**
 * Returns the converted string.
 * @param input input string of the function (either HEX or binary)
 * @param base original radix (2 for binary input and 16 for HEX input)
 * @returns converted string
 */
export const convertBinHex = (input: string, base: number): string => {
  let convertedString = '';

  if (base === 16) { //convert from HEX to binary
    const splitHex = splitBinHex(input, 16);
    let bin = '';
    splitHex.forEach(e => {
      bin += (parseInt(e, 16).toString(2)).padStart(8, '0');
    });
    convertedString = bin;
  } else if (base === 2) { //convert from binary to HEX
    const splitBin = splitBinHex(input, 2);
    let hex = '';
    splitBin.forEach(e => {
      hex += (parseInt(e, 2).toString(16).toUpperCase()).padStart(2, '0');
    });
    //const hex = (parseInt(input, 2).toString(16).toUpperCase()).padStart(2, '0');
    convertedString = hex;
  } else {
    console.log('Error! Base for convertBinHex is not 2 or 16!');
  }

  return convertedString;
}