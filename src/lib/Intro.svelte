<script>
    let { goto } = $props();
</script>

<h1>Grooversity Quiz Time</h1>

<p>Test your knowledge. Hear the call, guess the song. The faster you get it right, the more points you get.</p>
<p>Tip: turn up the volume!</p>

<button type="button" class="btn btn-primary" onclick={() => goto("countdown")}>Go</button>
