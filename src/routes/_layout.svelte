<script>
	// import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	@font-face {
	font-family: 'VT323';
	src: url('static/VT323-Regular.ttff') format('truetype');
	}

	main {
		position: relative;
		background-color: #2A333E;
		padding: 2em;
		margin: auto;
		font-family: 'VT323';
	}
</style>

<main>
	<slot></slot>
</main>