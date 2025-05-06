<script>
  import Score from './Score.svelte';
  const { results, goto } = $props(); 

  const countRight = $derived(results.filter(result => result === true).length);
</script>

<h1>Round Over</h1>
<h2>You got {countRight}/{results.length} right</h2>
<Score {results} size=40 asEmoji={true} />

<button type="button" class="button" onclick={() => goto("intro")}>Start Over</button>

<style>
  h1 {
    margin: 4rem 0;
  }
  h2 {
    margin: 1rem 0;
  }
  .button {
    margin-top: 4rem;
  }
</style>
