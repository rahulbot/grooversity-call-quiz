<script>
import { onMount } from 'svelte';
let { goto } = $props();

const COUNTDOWN_DELAY_MS = 600; 

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function countdown() {
    const countdownElement = document.getElementById("number");
    countdownElement.innerHTML = "3";
    await delay(COUNTDOWN_DELAY_MS);
    countdownElement.innerHTML = "2";
    await delay(COUNTDOWN_DELAY_MS);
    countdownElement.innerHTML = "1";
    await delay(COUNTDOWN_DELAY_MS);
    countdownElement.innerHTML = "Go!";
    await delay(COUNTDOWN_DELAY_MS);
    goto("play-call");
}
onMount(() => {
    countdown();
});
</script>

<h1 id="number"></h1>