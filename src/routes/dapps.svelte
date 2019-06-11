<script>

  import Speaker from '../components/speaker'
  import { speakers } from '../stores/dapps/config'

  let speakerList;

  const unsubscribe = speakers.subscribe(i => {
      speakerList = i;
  })
  console.log('speakerList', speakerList)

  // function renderSpeakers(){
  //   console.log('here')
  //   // speakerList.list.map((speaker, i) => {
  //   //   return `<Speaker />`;
  //   // })
  //   return (<Speaker />)
  // }

</script>



<svelte:head>
	<title>DAPPS</title>
</svelte:head>

<section>
  <div>
    <!-- {renderSpeakers()} -->
    <Speaker />
  </div>
  <div class="actions">
    <a href="/">BACK</a>
  </div>
  
</section>