import { writable, readable } from 'svelte/store';
// import { ethers } from 'ethers';


import { abi } from '../../contracts/ERC223TOKEN';


/**
 * This is the main "state store" of the application. It attempts to contain
 * everything which is relevant to the act of actually dealing with sending
 * monies. "Monies" in this instance is the ERC223 token deployed for usage
 * with this instance of the burner wallet. Any code relating to interacting
 * with that token contract should be contained within this file.
 *
 * Any other contract interactions should be moved to a file which is specific
 * to them, under the /dapps/ folder.
 */



// constant stores

export const CURRENCY_SYBMOL = readable('៛');
export const JSON_RPC_URL= readable('http://dai.poa.network/');



// wallet store

export const wallet = writable(
    {
        qr: null,
        ethBalance: Number(-1), // or xDAI
        tokenContract: null,
        tokenBalance: 0,
        address: '0x0000000000000000000000000000000000000000',
        burner: {
          signingKey: {
            privateKey: '0x0000000000000000000000000000000000000000'
          }
        },
        nextTx: {
          beforeParams: `You're sending`,
          price: -1,
          joiningStatement: '',
          param: '',
          afterParams: ``,
          cta: `Swipe to confirm`
        },
        afterConfirm: () => {},
        afterSend: () => {}, // allow specification of a callback after send
        refreshFuncs: [] // allow addition of functions which "refresh" the app
      }
)