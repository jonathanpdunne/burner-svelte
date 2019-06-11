
<style>

	.video {
      object-fit: cover;
    }
    .absolute-center {
      position: fixed;
      width: 75%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .action-overlay {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .action-overlay a {
      background: transparent !important;
    }
    .action-overlay a::hover,
    .action-overlay a::active {
      background: #a7e4ae !important;
    }

</style>


<script>
	
</script>

<svelte:head>
	<title>SEND</title>
</svelte:head>

<section class="flex">
	<div id="qr-preview">
		<video
			id="video"
			class="video h-100 w-100 position-absolute"
			playsinline
			autoplay
		></video>
		<div class="actions action-overlay">
			<a class="pa2" href='/'>BACK</a>
		</div>
		<img class="absolute-center" alt='' src="../static/qr-overlay.png" />
	</div>
</section>