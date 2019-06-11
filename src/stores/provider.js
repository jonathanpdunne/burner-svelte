import { writable, readable } from 'svelte/store';
import { ethers } from 'ethers';

// export const JSON_RPC_URL= readable('http://dai.poa.network/');

export const JSON_RPC_URL = 'https://xdai.flexdapps.com:7361/'
// export const JSON_RPC_URL = 'https://xdai.flexdapps.com:6371/'

export const provider = writable(new ethers.providers.JsonRpcProvider(JSON_RPC_URL))