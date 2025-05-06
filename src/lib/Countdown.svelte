<script>
import { onMount } from 'svelte';
let { goto } = $props();

const COUNTDOWN_DELAY_MS = 700; 

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

<div class="row">
  <div class="col-lg-12">
    <span id="number"></span>
  </div>
</div>

<style>
  #number {
    text-align: center;
    display: block;
    font-family: AlphaEcho, sans-serif;
    color: var(--primary-color);
    margin: 4rem 0;
    font-size: 10rem;
  }
</style>