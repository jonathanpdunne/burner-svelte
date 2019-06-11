import { writable, readable, derived } from 'svelte/store';



export const input = writable('33');

export const formattedInput = derived(
    input, 
    $input => Number($input)
);


export function numPress(arg) {

    let oldVal, newVal, formatVal;
    const unsubscribe = input.subscribe(val => { oldVal = val })
    const unsubscribe2 = formattedInput.subscribe(val => { formatVal = val })

    console.log('here', input);

    if (arg === 'DEL') {
        input.update(
            n => n.slice( 0, oldVal.length - 1)
        )
    } else if (arg === '.' && oldVal.indexOf('.') !== -1) {
    return
    } else if (oldVal.length > 5) {
    return
    } else {
    input.update(n => n + arg)
    }

    console.log('here2', formatVal);

    return;
}
