// import './styles/main.css';
import { walletInit } from './stores/wallet';

import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
}).then(() => {
	console.log('client-side app has started');
	walletInit();
});;