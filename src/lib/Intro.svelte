<script>
  let { goto } = $props();
</script>


<h1>Grooversity Call Quiz</h1>

<h2>Hear the call,<br />guess the song.</h2>
<p>Turn up the volume 🪘🔊</p>

<button type="button" class="button fade-background" onclick={() => goto("countdown")}>Start the Quiz!</button>

<style>
  h1 {
    margin: 3rem 0;
    padding: 0px;
  }

  h2, p {
    margin: 2rem 0;
  }

  .fade-background {
    animation: fadeOpacity 1s infinite;
  }

  @keyframes fadeOpacity {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.75;
    }
    100% {
      opacity: 1;
    }
  }
</style>