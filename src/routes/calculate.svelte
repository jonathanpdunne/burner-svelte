<style>

    .subheadline {
        margin: auto;
        font-size: 4rem;
        height: 2em;
    }

    .phat-caret {
      width: 1.5rem;
      height: 3rem;
      background: #a7e4ae;
    }

    .proceed {
      background: #a7e4ae80;
      color: #2a333e;
    }

    .keypad-container {
        position: fixed;
        bottom: 0%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .keypad-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .keypad-button {
        flex-basis: 33%;
        flex-grow: 1;
        font-family: 'VT323';
        height: 2em;
        font-size: 3rem;
    }

</style>

<script>

    // import Tone from 'tone'

    // const dist = new Tone.Distortion(0.2).toMaster()
    // const noise = new Tone.Noise('pink').connect(dist)
    // const synth = new Tone.Synth().toMaster()
    // synth.volume.value = 0


    import { formattedInput, numPress } from '../stores/calculate.js'

    let input;
    const unsubscribe = formattedInput.subscribe(val => { input = val })
    unsubscribe();

    numPress('4');

</script>

<svelte:head>
	<title>TI-83</title>
</svelte:head>

<section class="keypad-container">
    <div class="subheadline">
        {input}
        
        <span class="phat-caret"></span>
    </div>
    <div class="keypad">
        <div class="keypad-row">
            <button class="keypad-button" onclick={() => numPress()}> 1 </button>
            <button
                class="keypad-button"
                onclick=${() => {
                    console.log('2')
                }}
            >
                2
            </button>
            <button
                class="keypad-button"
                onclick=${() => {
                    console.log('3')
                }}
            >
                3
            </button>
        </div>
        <div class="keypad-row">
            <button
                class="keypad-button"
                onclick=${() => {
                    console.log('4')
                }}
            >
                4
            </button>
            <button
                class="keypad-button"
                onclick=${() => {
                    console.log('5')
                }}
            >
                5
            </button>
            <button
                class="keypad-button"
                onclick=${() => {
                    console.log('6')
                }}
            >
                6
            </button>
        </div>
        <div class="keypad-row">
            <button
                class="keypad-button"
                onclick=${() => {
                    console.log('7')
                }}
            >
                7
            </button>
            <button
                class="keypad-button"
                onclick=${() => {
                    console.log('8')
                }}
            >
                8
            </button>
            <button
                class="keypad-button"
                onclick=${() => {
                    console.log('9')
                }}
            >
                9
            </button>
        </div>
        <div class="keypad-row">
            <button
                class="keypad-button"
                onclick=${() => {
                    console.log('del')
                }}
            >
                DEL
            </button>
            <button
                class="keypad-button"
                onclick=${() => {
                    console.log('0')
                }}
            >
                0
            </button>
            <span class="keypad-button"></span>
        </div>
        <div class="keypad-row">
            <button class="keypad-button">
                BACK
            </button>
            <span class="keypad-button"></span>
            <button
                class="keypad-button proceed"
                onclick={ () => {
                    console.log('go')
                }
                }
            >
                GO
            </button>
        </div>
    </div>
</section>