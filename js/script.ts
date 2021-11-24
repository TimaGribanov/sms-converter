/// <reference types="jquery" />
import * as gsm7 from './gsm7.js';
import * as ucs2 from './ucs2.js';
import * as eightBit from './8bit.js';
import * as baseJS from './base.js';

/**
 * Converts body (with UDH or without) from HEX.
 * @param input string with SM body
 * @returns converted SM body
 */
 let decodeBody = (input: string, udh: boolean, alphabet:string): string => {
   let splitBody = baseJS.splitBinHex(input, 2);
   if (udh) {
     const udl = parseInt(splitBody[0], 16); //SM length without UDL, total number of septets from UDHL until the end
     const udhl = parseInt(splitBody[1], 16); //UDH length without UDH and UDHL, total number of octets in UDH
     const notSM = udhl + 2; //UDH length, UDHL value plus 2 octets (UDL and UDHL themselves)
     const smBody: string = input.slice(notSM); //SM body except UDH

     for (let i = 0; i < notSM; i++) {
                
     }
 
   } else {
     gsm7.upack(input);
   }
 
   let decodedBody = '';
 
   return decodedBody;
 }
 
 /**
  * Converts SM from HEX.
  * @param input string with SM
  * @returns converted SM
  */
 let gsmSeven = (input: string): string => {
   let decodedSM = '';
 
   return decodedSM;
 }
 
let alphabet = 0; //0 – gsm7, 1 – ucs2, 2 – 8bit

$('#gsm7-radio').on('click', function() {
   $('#gsm7-radio').prop('checked', true);
   $('#ucs2-radio').prop('checked', false);
   $('#8bit-radio').prop('checked', false);
   alphabet = 0;
})

$('#ucs2-radio').on('click', function() {
   $('#gsm7-radio').prop('checked', false);
   $('#ucs2-radio').prop('checked', true);
   $('#8bit-radio').prop('checked', false);
   alphabet = 1;
})

$('#8bit-radio').on('click', function() {
   $('#gsm7-radio').prop('checked', false);
   $('#ucs2-radio').prop('checked', false);
   $('#8bit-radio').prop('checked', true);
   alphabet = 2;
})

$('#unpack-msg-radio').on('click', function() {
   $('#unpack-msg-radio').prop('checked', true);
   $('#pack-msg-radio').prop('checked', false);
})

$('#pack-msg-radio').on('click', function() {
   $('#unpack-msg-radio').prop('checked', false);
   $('#pack-msg-radio').prop('checked', true);
})

$('#submit').on('click', function() {
   switch (alphabet) {
      case 0:
         if($('#unpack-msg-radio').is(':checked')) { $('#output').val(gsm7.upack(String($('#input').val()))) };
         if($('#pack-msg-radio').is(':checked')) { $('#output').val(gsm7.pack(String($('#input').val()))) };
         break;
      case 1:
         if($('#unpack-msg-radio').is(':checked')) { $('#output').val(ucs2.upack(String($('#input').val()))) };
         if($('#pack-msg-radio').is(':checked')) { $('#output').val(ucs2.pack(String($('#input').val()))) };
         break;
      case 2:
         if($('#unpack-msg-radio').is(':checked')) { $('#output').val(eightBit.upack(String($('#input').val()))) };
         if($('#pack-msg-radio').is(':checked')) { $('#output').val(eightBit.pack(String($('#input').val()))) };
         break;
   }
});