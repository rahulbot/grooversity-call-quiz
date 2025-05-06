<script>
  import { Howl } from 'howler';
  import songs from './data/songs.json';
  const { goto } = $props();

  let selectedSongSrc = $state(null);
  let clip;

  function playPause(mp3FileName) {
    selectedSongSrc = mp3FileName;
    if (clip) {
      if (clip.playing()) {
        clip.stop();
      }
    }
    clip = new Howl({
      src: [`audio/${mp3FileName}`],
      volume: 1,
      onend: () => selectedSongSrc = null
    });
    clip.play();
  }

</script>

<h1>Practice Room</h1>

<p>Listen to the calls for each song to learn them. Once you're ready, pop back over to the quiz.</p>

<div id="song-list">
  {#each songs as song}
    <button type="button" class="button secondary" onclick={() => playPause(song.src)}
      class:playing={selectedSongSrc == song.src}>
      {song.name} {clip && clip.playing() && selectedSongSrc == song.src}
    </button>
  {/each}
</div>

<button type="button" class="button" onclick={() => goto('countdown')}>Start the Quiz</button>

<style>
  .secondary {
    display: inline-block;
    text-align: center;
    margin: 10px;
  }
  .playing {
    background-color: var(--secondary-color);
    color: white;
  }
  #song-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 20px 0;
  }
</style>
