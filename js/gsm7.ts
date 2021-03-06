import * as baseJS from './base.js';

const gsmSevenArr = [
  ['@', '£', '$', '¥', 'è', 'é', 'ù', 'ì', 'ò', 'Ç', '\\n', 'Ø', 'ø', '\\r', 'Å', 'å'],
  ['Δ', '_', 'Φ', 'Γ', 'Λ', 'Ω', 'Π', 'Ψ', 'Σ', 'Θ', 'Ξ', '', 'Æ', 'æ', 'ß', 'É'],
  [' ', '!', '\"', '#', '¤', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/'],
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?'],
  ['¡', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
  ['P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä', 'Ö', 'Ñ', 'Ü', '§'],
  ['¿', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'],
  ['p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ñ', 'ü', 'à']
]

const extensionTable = [
  ['', '', '', '', '', '', '', '', '', '', '\\f', '', '', '', '', ''],
  ['', '', '', '', '^', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '{', '}', '', '', '', '', '', '\\'],
  ['', '', '', '', '', '', '', '', '', '', '', '', '[', '~', ']', ''],
  ['|', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '€', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
]

//const extensionTable = ['\\f', '^', '{', '}', '\\', '[', '~', ']', '|', '€'];

/**
 * Searches for indexes of two-dimensional array
 * @param input string for each it looks for in an array
 * @param array array of strings to look in
 * @returns an array of numbers containing indexes
 * https://stackoverflow.com/a/16102526
 */
const find2DimIndex = (input: string, array: string[][]): number[] => {
  let index1 = 0;
  let index2 = 0;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    index2 = element.indexOf(input);
    if (index2 > -1) {
      index1 = i;
      break;
    }
  }
  return [index1, index2];
}

/**
 * Packs SM body from symbols to HEX for 7-bit algotithm
 * @param input string with message payload in HEX
 * @returns unpacked from 7-bit to 8-bit string
 */
export const pack = (input: string): string => {
  let packed = '';
  const inputArr = input.split(''); //An array of the input string split into separate symbols
  let septetArr: string[] = [];
  let j = 0;
  let indexes: number[];
  inputArr.forEach(e => {
    let sept = ''; //A character converted into septets
    if (e === '^' || e === '{' || e === '}' || e === '\\' || e === '[' || e === ']' || e === '~' || e === '|' || e === '€' || e === '\\f') {
      indexes = find2DimIndex(e, extensionTable);
      septetArr[j] = '0011011';
      j++;
    } else {
      console.log('usual');
      indexes = find2DimIndex(e, gsmSevenArr);
    }
    let indexesBin: string[] = [];
    indexes.forEach(element => {
      indexesBin.push(Number(element).toString(2));
    });
    indexesBin[0] = indexesBin[0].padStart(3, '0');
    indexesBin[1] = indexesBin[1].padStart(4, '0');
    septetArr.push(sept);
    sept = indexesBin[0] + '' + indexesBin[1];
    septetArr[j] = sept;
    j++;
  });

  let octetArr: string[] = [];
  let octetArrTemp: string[] = [];
  const septetsEightsCount: number = Math.floor(septetArr.length / 8); //A number of eights
  let septetsEightsTail: boolean;
  if (septetArr.length / 8 == septetsEightsCount) {
    septetsEightsTail = false;
  } else {
    septetsEightsTail = true;
  }

  let l: number = 0; //start of new sub-array
  for (let k = 1; k <= septetsEightsCount; k++) {
    const slicedSeptetArr = septetArr.slice(l, 8 * k);

    octetArrTemp[2] = slicedSeptetArr[0];

    for (let m = 0; m < slicedSeptetArr.length - 1; m++) {
      let tail = 8 - octetArrTemp[2].length;
      octetArrTemp[1] = slicedSeptetArr[m + 1].slice(-tail);
      octetArrTemp[0] = octetArrTemp[1] + '' + octetArrTemp[2];
      octetArrTemp[2] = slicedSeptetArr[m + 1].slice(0, -tail);
      octetArr.push(octetArrTemp[0]);
    }

    l = 8 * k;
  }

  if (septetsEightsTail) {
    const slicedSeptetArr = septetArr.slice(l, septetArr.length);

    octetArrTemp[2] = slicedSeptetArr[0];

    for (let m = 0; m < slicedSeptetArr.length - 1; m++) {
      let tail = 8 - octetArrTemp[2].length;
      octetArrTemp[1] = slicedSeptetArr[m + 1].slice(-tail);
      octetArrTemp[0] = octetArrTemp[1] + '' + octetArrTemp[2];
      octetArrTemp[2] = slicedSeptetArr[m + 1].slice(0, -tail);
      octetArr.push(octetArrTemp[0]);
    }

    octetArr.push(octetArrTemp[2]);
  }

  octetArr.forEach(element => {
    let hexElement = baseJS.convertBinHex(element, 2);
    packed += hexElement;
  });

  return packed;
}

/**
 * Unpacks SM body from HEX to symbols for 7-bit algorithm
 * @param input string with message payload in HEX
 * @returns unpacked from 7-bit to 8-bit string
 */
export const upack = (input: string): string => {
  let unpacked = '';

  const binInput = baseJS.convertBinHex(input, 16);
  const binOctets = baseJS.splitBinHex(binInput, 2);
  const binOctetsLength = binOctets.length / 7;
  let binOctetsTemp: string[] = [];
  let binSeptets: string[] = [];
  binOctetsTemp[2] = binOctets[0];

  for (let i = 0; i < binOctets.length + binOctetsLength - 1; i++) {
    binOctetsTemp[0] = binOctetsTemp[2].slice(0, -7); //Head
    binOctetsTemp[1] = binOctetsTemp[2].slice(-7); //Septet

    binSeptets.push(binOctetsTemp[1]); //Move septet to another array
    binOctetsTemp[2] = binOctets[i + 1] + '' + binOctetsTemp[0]; //Connect next octet with its tail
  };

  for (let i = 0; i < binSeptets.length; i++) {
    const e = binSeptets[i];

    if (e === '0011011') {
      let nextElem = binSeptets[i + 1];

      const head = parseInt(nextElem.slice(0, 3), 2);
      const tail = parseInt(nextElem.slice(-4), 2);

      unpacked += extensionTable[head][tail];

      i++;
    } else {
      const head = parseInt(e.slice(0, 3), 2);
      const tail = parseInt(e.slice(-4), 2);

      unpacked += gsmSevenArr[head][tail];
    }
  }

  return unpacked;
}