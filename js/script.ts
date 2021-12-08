/// <reference types="jquery" />
import * as gsm7 from './gsm7.js';
import * as ucs2 from './ucs2.js';
import * as eightBit from './8bit.js';
import * as baseJS from './base.js';

/**
 * Converts body (with UDH or without) from HEX.
 * @param input string with SM body
 * @returns an array with UDHL, UDH (SM type, refnum, total parts and current part) and decoded body
 */
let decodeBody = (input: string, udh: boolean, alphabet: number): [number, string, number, number, number, string] => {
   let returnArr: [number, string, number, number, number, string];
   let decodedBody = '';
   let splitBody = baseJS.splitBinHex(input, 16);
   let smBody = '';

   if (udh) {
      const udhl = parseInt(splitBody[0], 16); //UDH length without UDH and UDHL, total number of octets in UDH
      const udh = udhl + 1; //UDH in octets
      let binInputBody = baseJS.convertBinHex(input, 16); //Input body in binary form
      const binInputBodyArr = baseJS.splitBinHex(binInputBody, 2); //Array of input body in binary form split in octets
      const smNotUDH = binInputBodyArr.splice(udh); //Array of input body in binary form split in octets but without UDH

      //Next if statement goes only if SM is packed in gsm7
      if (alphabet == 0) {
         const fillBits = 7 - ((udh * 8) % 7);
         let firstOctet = smNotUDH[0];
         let firstOctetCut = firstOctet.slice(0, -fillBits);
         decodedBody = gsm7.upack(baseJS.convertBinHex(firstOctetCut, 2));
         let binInputSMNoFirstOctet = smNotUDH.splice(1).join('');
         smBody = baseJS.convertBinHex(binInputSMNoFirstOctet, 2);
      } else {
         smBody = baseJS.convertBinHex(smNotUDH.join(''), 2);
      }

      if (udhl == 5) {
         const iei = parseInt(splitBody[1], 16);
         if (iei == 0) {
            const ieidl = parseInt(splitBody[2], 16);
            if (ieidl == 3) {
               let iedArr: string[] = [];
               for (let i = 0; i < ieidl; i++) {
                  iedArr.push(splitBody[3 + i]);
               }
               const refnum = parseInt(iedArr[0], 16);
               const totalParts = parseInt(iedArr[1], 16);
               const currPart = parseInt(iedArr[2], 16);
               returnArr = [udhl, 'Concatenated SM', refnum, totalParts, currPart, ''];
            } else {
               alert('Sorry! Only IEI 00 with IEDL 3 is supported now!');
               returnArr = [udhl, 'Concatenated SM', 0, 0, 0, ''];
            }
         } else {
            alert('Sorry! Only IEI 00 is supported now!');
            returnArr = [udhl, 'null', 0, 0, 0, ''];
         }
      } else {
         alert('Sorry! Not yet supported!');
         returnArr = [udhl, 'null', 0, 0, 0, ''];
      }
   } else {
      returnArr = [0, 'null', 0, 0, 0, ''];
      smBody = input;
   }

   switch (alphabet) {
      case 0:
         decodedBody += gsm7.upack(smBody);
         break;
      case 1:
         decodedBody = ucs2.upack(smBody);
         break;
      case 2:
         decodedBody = eightBit.upack(smBody);
         break;
   }
   returnArr[5] = decodedBody;

   return returnArr;
}

/**
 * Converts body to HEX.
 * @param input string with SM body
 * @param alphabet is a number showing which DCS to use
 * @returns a string in HEX
 */
let codeBody = (input: string, alphabet: number): string => {
   let codedBody = '';

   switch (alphabet) {
      case 0:
         codedBody = gsm7.pack(input);
         break;
      case 1:
         codedBody = ucs2.pack(input);
         break;
      case 2:
         codedBody = eightBit.pack(input);
         break;
   }

   return codedBody;
}

let alphabet = 0; //0 – gsm7, 1 – ucs2, 2 – 8bit
let udh = false;

$(function () {
   $('#udh-checkbox').prop('checked', false);
   $('.udh-row').hide();
})

$('#gsm7-radio').on('click', function () {
   $('#gsm7-radio').prop('checked', true);
   $('#ucs2-radio').prop('checked', false);
   $('#8bit-radio').prop('checked', false);
})

$('#ucs2-radio').on('click', function () {
   $('#gsm7-radio').prop('checked', false);
   $('#ucs2-radio').prop('checked', true);
   $('#8bit-radio').prop('checked', false);
})

$('#8bit-radio').on('click', function () {
   $('#gsm7-radio').prop('checked', false);
   $('#ucs2-radio').prop('checked', false);
   $('#8bit-radio').prop('checked', true);
})

$('#unpack-msg-radio').on('click', function () {
   $('#unpack-msg-radio').prop('checked', true);
   $('#pack-msg-radio').prop('checked', false);
})

$('#pack-msg-radio').on('click', function () {
   $('#unpack-msg-radio').prop('checked', false);
   $('#pack-msg-radio').prop('checked', true);
   $('#udh-checkbox').prop('disabled', true);
   $('#udh-checkbox').prop('checked', false);
})

$('#submit').on('click', function () {
   if ($('#gsm7-radio').is(':checked')) {
      alphabet = 0;
   }

   if ($('#ucs2-radio').is(':checked')) {
      alphabet = 1;
   }

   if ($('#8bit-radio').is(':checked')) {
      alphabet = 2;
   }

   if ($('#udh-checkbox').is(':checked')) {
      udh = true
   }

   if (udh) {
      $('.udh-row').show();
   } else {
      $('.udh-row').hide();
   }

   if ($('#unpack-msg-radio').is(':checked')) {
      $('#udhl-cell').text(decodeBody(String($('#input').val()), udh, alphabet)[0]);
      $('#udh-cell').html('<p>' + decodeBody(String($('#input').val()), udh, alphabet)[1] + '</p><p>Reference Number: ' + decodeBody(String($('#input').val()), udh, alphabet)[2] + '</p><p>Total Parts: ' + decodeBody(String($('#input').val()), udh, alphabet)[3] + '</p><p>Current Part: ' + decodeBody(String($('#input').val()), udh, alphabet)[4] + '</p>');
      $('#output').val(decodeBody(String($('#input').val()), udh, alphabet)[5]);
   };
   if ($('#pack-msg-radio').is(':checked')) { $('#output').val(codeBody(String($('#input').val()), alphabet)) };
});