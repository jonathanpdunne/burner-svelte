<style>

	.actions {
		font-size: 5em;
		text-transform: uppercase;
		font-weight: 350;
		margin: auto;
		text-align: center;
		max-width: 3em;
		position: relative;
		margin-top: 30%;
	}

	.wallet-status {
		text-align: center;
		font-size: 5em;
		margin-top: 30%;
	}

	h3 {
		text-align: center;
		margin: auto;
		font-size: 1.8em;
		font-weight: 250;
	}

</style>


<script>
	import { CURRENCY_SYBMOL, wallet, changeStore, walletInit } from '../stores/wallet.js';
	
	// walletInit()
	let walletStore;
	wallet.subscribe(value => {
		walletStore = value
	})

	// console.log('wallet', {$wallet})
	
</script>

<svelte:head>
	<title>FLEXBUXX</title>
</svelte:head>

<section>
	<div class="wallet-title">
		<h3>
			The Ceremonious Flex Dapps© NYC Blockchain Week Debreif Voting Experience
		</h3>
		<div class="wallet-status">
			={$CURRENCY_SYBMOL}{walletStore.tokenBalance.toLocaleString()}=
		</div>
	</div>
	
	<div class="actions">
		<a href="/get">GET</a>
		<a href="/send">SEND</a>
		<a href="/dapps">DAPPS</a>
	</div>
	
</section>
