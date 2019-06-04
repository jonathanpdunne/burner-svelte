// import './styles/main.css';
import { walletStore } from './stores/wallet';

import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
}).then(() => {
	// walletStore()
	console.log('client-side app has started');
});;