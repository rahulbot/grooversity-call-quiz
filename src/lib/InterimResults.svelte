<script>
  import Score from './Score.svelte';
  const { results, goto, currentIndex } = $props();
</script>

<h2>Results so far</h2>
<Score {results} size=40 />

<button class="button" onclick={() => goto("play-call")}>
  Next
</button>

<style>
  h2 {
    margin: 4rem 0;
  }
  .button {
    margin-top: 4rem;
  }
</style>