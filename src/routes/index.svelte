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
	import { CURRENCY_SYBMOL, wallet } from '../stores/wallet.js';

	function changeStore(variable, newVal){
		let x, obj;
		const unsubscribe = wallet.subscribe(walletObj => {
			walletObj[variable.valueOf()] = newVal
		});

		// wallet.set(walletObj)
	}
	
	changeStore('qr', 'thisblahblah')

	console.log('wallet', {$wallet});

	// wallet.set(newObj)
	
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
			<!-- =${state.CURRENCY_SYMBOL}${state.wallet.tokenBalance.toLocaleString() ||
			0}= -->
			={$CURRENCY_SYBMOL}=
		</div>
	</div>
	
	<div class="actions">
		<a href="/get">GET</a>
		<a href="/send">SEND</a>
		<a href="/dapps">VOTE</a>
	</div>
	
</section>
