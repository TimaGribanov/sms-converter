let gsmSevenArr: string[][] = [
  ['@','£','$','¥','è','é','ù','ì','ò','Ç','\\n','Ø','ø','\\r','Å','å'],
  ['Δ','_','Φ','Γ','Λ','Ω','Π','Ψ','Σ','Θ','Ξ','','\\f','^','{','}','\\','[','~',']','|','€','Æ','æ','ß','É'],
  [' ','!','\"','#','¤','%','&','\'','(',')','*','\=+',',','-','.','/'],
  ['0','1','2','3','4',	'5','6','7','8','9',':',';','<','=','>','?'],
  ['¡','A','B','C','D',	'E','F','G','H','I','J','K','L','M','N','O'],
  ['P','Q','R','S','T',	'U','V','W','X','Y','Z','Ä','Ö','Ñ','Ü','§'],
  ['¿','a','b','c','d',	'e','f','g','h','i','j','k','l','m','n','o'],
  ['p','q','r','s','t','u','v','w','x','y','z','ä','ö','ñ','ü','à']
]

/**
 * Splits binary or HEX string to octets.
 * @param input input string of the function (either HEX or binary)
 * @param base original radix (2 for binary input and 16 for HEX input)
 * @returns an array containing octets
 */
let splitBinHex = (input: string, base: number): string[] => {
  let charArray: string[] = input.split('');
  let finalCharsArray: string[] = [];
  let err: string = '';

  if (base === 16) { //to split HEX
    //check for wrong symbols
    for (let element of charArray){
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
        let digits: string = charArray[i] + charArray[i + 1];
        finalCharsArray.push(digits);
      }
    }
  } else if (base === 2) { //to split binary
    //check for wrong symbols
    for (let element of charArray){
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
        let digits: string = charArray[i] + charArray[i + 1] + charArray[i + 2]+ charArray[i + 3] + charArray[i + 4] + charArray[i + 5] + charArray[i + 6] + charArray[i + 7];
        finalCharsArray.push(digits);
      }
    }
  } else { //if not binary or HEX
    alert('Error! Base not 2 or 16!');
  }
  return finalCharsArray;
}

/**
 * Returns the converted string.
 * @param input input string of the function (either HEX or binary)
 * @param base original radix (2 for binary input and 16 for HEX input)
 * @returns converted string
 */
let convertBinHex = (input: string, base: number): string => {
  let convertedString: string = '';

  if (base === 16) { //convert from HEX to binary
    const splitHex: string[] = splitBinHex(input, 16);
    let bin: string = '';
    splitHex.forEach(e => {
      bin += (parseInt(e, 16).toString(2)).padStart(8, '0');
    });
    convertedString = bin;
  } else if (base === 2) { //convert from binary to HEX
    const hex: string = parseInt(input, 2).toString(16).toUpperCase();
    convertedString = hex;
  } else {
    console.log('Error! Base for convertBinHex is not 2 or 16!');
  }

  return convertedString;
}

/**
 * Packs SM body from symbols to HEX for 7-bit algotithm
 * @param input string with message payload in HEX
 * @returns unpacked from 7-bit to 8-bit string
 */
let pack = (input: string): string => {
  let packed: string = '';
  return packed;
}

/**
 * Unpacks SM body from HEX to symbols for 7-bit algorithm
 * @param input string with message payload in HEX
 * @returns unpacked from 7-bit to 8-bit string
 */
let upack = (input: string): string => {
  let unpacked: string ='';
  return unpacked;
}

/**
 * Converts body (with UDH or without) from HEX.
 * @param input string with SM body
 * @returns converted SM body
 */
let gsmSevenBody = (input: string): string => {
  let udh: boolean = false;
  let splitBody: string[] = splitBinHex(input, 2);
  if (udh) {
    const udl: number = parseInt(splitBody[0], 2); //SM length without UDL, total number of septets from UDHL until the end
    const udhl: number = parseInt(splitBody[1], 2); //UDH length without UDH and UDHL, total number of octets in UDH
    const notSM: number = udhl + 2; //UDH length, UDHL value plus 2 octets (UDL and UDHL themselves)

  } else {
    upack(input);
  }

  let decodedBody: string = '';

  return decodedBody;
}

/**
 * Converts SM from HEX.
 * @param input string with SM
 * @returns converted SM
 */
let gsmSeven = (input: string): string => {
  let decodedSM: string = '';

  return decodedSM;
}
