<style>

.qrcode {
	font-size: 5em;
	text-transform: uppercase;
	font-weight: 350;
	margin: auto;
	text-align: center;
	position: relative;
	margin-top: 20%;
	}

.button {
	margin-top: 10%;
}

</style>

<script>
	import QRCode from 'qrcode'
	import { wallet, getValue, changeStore } from '../stores/wallet.js';
	
	let walletStore;
	const unsubscribe = wallet.subscribe(value => {
		walletStore = value
	})

	const address = getValue(walletStore, 'address')

	QRCode.toDataURL(
		address,
		{
			margin: 1,
			color: {
				light: '#A7E4AE',
				dark: '#2A333E'
		},
			scale: 10
		},
			(err, url) => {
			changeStore('qr', url)
		}
  	)


	// console.log('qrqrqr', walletStore.qr)

</script>



<svelte:head>
	<title>GET</title>
</svelte:head>

<section class="qrcode">
	<img src={walletStore.qr} alt=''/>
	<div class="button">
		<a href="/">Back</a>
	</div>
</section>