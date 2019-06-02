<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>FLEXBUXX</title>
</svelte:head>

<h1>Great success!</h1>

<section class="flex flex-column justify-between pa4 pt5">
	<div class="wallet-status">
	<div class="description">
	The Ceremonious Flex Dapps© NYC Blockchain Week Debreif Voting Experience
	</div>
	<div class="f-subheadline">
		<!-- =${state.CURRENCY_SYMBOL}${state.wallet.tokenBalance.toLocaleString() ||
		0}= -->
	</div>
	</div>
	<div class="actions flex flex-column tc">
	<a href="/dapps">VOTE</a>
	</div>
</section>
