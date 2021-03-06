import { writable, readable } from 'svelte/store.js';
import { ethers } from 'ethers';

import { provider } from './provider';

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
export const NETWORK_ID = readable(100)
export const TOKEN_ADDRESS = '0x5eb7e67ec2ce404ebabafed0a79bab10d030c58a'


// set default state

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

// store helper functions

export function changeStore(variable, newVal){
    const unsubscribe = wallet.subscribe(walletObj => {
        walletObj[variable.valueOf()] = newVal
    });
}

export function getValue(store, variable){
  let objectTree;
  if (variable){
    objectTree = variable.split('.');
  }

  let x = store;
  objectTree.forEach(i => {
    x=x[i.valueOf()]
  })

  return x; 
}

// -------------------------


export async function walletInit() {
    
    // creates a wallet if there is not already one in localstorage    
    let providerStore, walletStore
    const unsubscribeProvider = provider.subscribe(value => {
      // providerStore = getWallet(val)
      providerStore = value
    })

    const unsubscribeWallet = wallet.subscribe(value => {
      walletStore = value;
    })

    changeStore('burner', getWallet(providerStore))
    
    // console.log('blah', getValue(walletStore, 'burner.signingKey.address'))
  
    changeStore('address', getValue(walletStore, 'burner.signingKey.address'))
  
    // this is where you would stick some code that filled the user's wallet with
    // xDAI or whatever, if you were going to do it that way
    // getSomeGas()
  
    // // set this such that other parts of our application can refresh the wallet UI
    // wallet.refresh = () => {
    //   for (let refreshFunc of wallet.refreshFuncs) {
    //     refreshFunc()
    //   }
    // }
  
    // grab a contract instance attached to our burner wallet
    changeStore('tokenContract', getTokenContract(
      TOKEN_ADDRESS,
      abi,
      providerStore,
      getValue(walletStore, 'burner')
    ))
  
    // set up an event listener and notifications for the transfer function
    // setupTransferNotifications(walletStore, state)
  
    setTokenBalance()
  
    // // a whole bunch of events for you to configure the 'confirm' screen in the
    // // wallet. YOU DON'T HAVE TO USE THE CONFIRM SCREEN, this is just a handy
    // // little set of helpers if you do
    // // for an example of how this looks, set play around with the /vip dapp
    // // will probably rip this out as i don't think the confirm dialog should be a
    // // default part of the application, dapps can create one if they like
    // emitter.on('nextTx.setBeforeParams', s => (wallet.nextTx.beforeParams = s))
    // emitter.on('nextTx.setPrice', s => (wallet.nextTx.price = s))
    // emitter.on(
    //   'nextTx.setJoiningStatement',
    //   s => (wallet.nextTx.joiningStatement = s)
    // )
    // emitter.on('nextTx.setParam', s => (wallet.nextTx.param = s))
    // emitter.on('nextTx.setAfterParams', s => (wallet.nextTx.afterParams = s))
    // emitter.on('nextTx.setCta', s => (wallet.nextTx.cta = s))
    // emitter.on('nextTx.confirm', () => wallet.afterConfirm())
    // emitter.on('nextTx.sent', () => wallet.afterSend())
  
    // // send the wallet's tokens (this is hardcoded to an ERC223 at the moment)
    // // @todo add a function param so that methods other than tokenFallback can be
    // // called on the receiving contract
    // emitter.on(
    //   'wallet.sendTokens',
    //   async (to, value, bytes = '0x', messages, error) => {
    //     // handle not enough cash here
    //     if (value > wallet.tokenBalance) {
    //       state.assist.notify('error', `Balance too low`)
    //       if (error && typeof error === 'function') error()
    //       return
    //     }
    //     sendTokenTransaction(to, value, bytes, messages)
    //     emitter.emit('nextTx.sent')
    //   }
    // )
  
    // wallet.refreshFuncs.push(setTokenBalance, getEthbalance)
  
    // emitter.on('wallet.addRefreshFunc', f => {
    //   wallet.refreshFuncs.push(f)
    // })
  
    // function which gets the balance of the user in a token then renders an update
    async function setTokenBalance() {
      try {
        changeStore('tokenBalance', await getTokenBalance(
          getValue(walletStore, 'tokenContract'),
          getValue(walletStore, 'address')
        ))
        // wallet.tokenBalance = await getTokenBalance(
        //   wallet.tokenContract,
        //   wallet.address
        // )
        // // emitter.emit('render')
      } catch (e) {
        console.log(e)
      }
    }
  
    // // sends a token transaction (currently hardcoded to a single wallet token)
    // // uses the standard token tx messages unless you pass in something as messages
    // async function sendTokenTransaction(to, value, bytes = '0x', messages = {}) {
    //   const txMessages = Object.assign(getDefaultTokenMessages(value), messages)
    //   const dismiss = state.assist.notify('pending', txMessages.txSent(), -1)
    //   const c = wallet.tokenContract.connect(wallet.burner)
    //   const nonce = await state.provider.getTransactionCount(wallet.address)
    //   const tx = c['transfer(address,uint256,bytes)'](to, value, bytes, {
    //     gasPrice: ethers.utils.parseUnits('1', 'gwei'), // default on xDAI
    //     // gasLimit: ethers.utils.bigNumberify(500000).toHexString(),
    //     nonce: nonce
    //   })
    //   tx.then(async r => {
    //     await r.wait()
    //     dismiss()
    //     state.assist.notify('success', txMessages.txConfirmed())
    //   })
    // }
  
    // // gets the default token sending messages (should allow tokens to set a
    // // symbol or something like that)
    // function getDefaultTokenMessages(value) {
    //   return {
    //     txSent: () =>
    //       `Sending ${state.CURRENCY_SYMBOL}${Number(value).toLocaleString()}`,
    //     txConfirmed: () =>
    //       `Sent ${state.CURRENCY_SYMBOL}${Number(value).toLocaleString()}`,
    //     txStall: () => `Something's wrong...`,
    //     txConfirmed: () =>
    //       `Sent ${state.CURRENCY_SYMBOL}${Number(value).toLocaleString()}`
    //   }
    // }
  
    async function getEthbalance() {
      walletStore.ethBalance = ethers.utils.formatEther(
        await providerStore.getBalance(wallet.address)
      )
    }
  
    function getTokenContract(address, abi, provider, burner) {
      const c = new ethers.Contract(address, abi, provider)
      // connect our burner account with the contract so we can send txs
      return c.connect(burner)
    }
  
    // function setupTransferNotifications(
    //   { tokenContract, address, refresh },
    //   state // we can't pull assist off state because it's not initialised yet
    // ) {
    //   tokenContract.on(tokenContract.filters.Transfer(null, null), (f, t, v) => {
    //     if (t.toLowerCase() === address.toLowerCase()) {
    //       state.assist.notify(
    //         'success',
    //         `Received ${state.CURRENCY_SYMBOL}${v.toNumber().toLocaleString()}!`
    //       )
    //     } else if (f.toLowerCase() === address.toLowerCase()) {
    //       // we were the person who sent the money but we get this notification
    //       // already from the send function
    //       // state.assist.notify('success', `Sent ${state.CURRENCY_SYMBOL}${v.toNumber().toLocaleString()}!`)
    //     }
    //     refresh()
    //   })
    // }
  
    // gets the balance of a given user on a given token contract
    async function getTokenBalance(contract, address) {
      try {
        const b = await contract.balanceOf(address)
        return b.toNumber()
      } catch (e) {
        return -1
      }
    }
  
    // gets the burner wallet from localstorage or else creates a new one
    function getWallet(provider) {
      let w = localStorage.getItem('wallet')
      if (w) {
        w = new ethers.Wallet(JSON.parse(w).signingKey.privateKey, provider)
        // console.log('w', w)
      } else {
        // console.log('here', provider)
        w = ethers.Wallet.createRandom()
        localStorage.setItem('wallet', JSON.stringify(w))
        w = w.connect(provider)
      }
      return w
    }
  }