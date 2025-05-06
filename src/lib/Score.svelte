<script>
  import EmptyCircle from './icons/Circle.svelte';
  import FilledCircle from './icons/CircleFill.svelte';
  const { results, size, currentIndex } = $props();
</script>

<div class="results">
  {#each results as result, index}
    <div class="icon">
      {#if (index == currentIndex) && (results == null) }
        <FilledCircle {size} color={'rgb(245, 228, 0)'} />
      {:else if result === null}
        <EmptyCircle {size} />
      {:else}
        <FilledCircle {size} color={result ? 'rgb(100,130,32)' : 'rgb(255,0,0)'} />
      {/if}
    </div>
  {/each}
</div>

<style>
  .results {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon {
    display: inline-block;
    margin: 0 3px;
  }
</style>
