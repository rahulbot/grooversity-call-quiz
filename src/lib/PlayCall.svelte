<script>
  import { Howl } from 'howler';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import PlayIcon from './icons/PlayFillIcon.svelte';
  import PauseFill from './icons/PauseFill.svelte';

  let { goto, question, updateScore, questionNumber, totalQuestions } = $props();

  let showAnswers = $state(false);
  let pickedAnswerIdx = $state(null);
  let isCorrect = $state(null);
  let isPlaying = $state(false);
  let startTime = null;
  let duration = null;
  let earnedPoints = 0;

  var songHeadClip;
 
  function playAnswerFeedback() {
    const clipFileName = isCorrect ? 'right.mp3' : 'wrong.mp3';
    var sound = new Howl({
      src: [`audio/${clipFileName}`],
      volume: 1
    });
    sound.play();
  }

  function handlePlay(evt) {
    if (!songHeadClip) { // important lazy load for iOS playing
      songHeadClip = new Howl({
        src: [`audio/${question.song.src}`],
        loop: true,
        volume: 1,
      });
    }
    if (songHeadClip.playing()) {
      songHeadClip.pause();
      isPlaying = false;
    } else {
      songHeadClip.play();
      isPlaying = true;
      showAnswers = true;
      startTime = Date.now();
    }
  }

  function durationToPoints(duration) {
    const maxPoints = 20;
    const maxDuration = 10000;
    let p = 0;
    if (duration <= maxDuration) {
      p = Math.round(maxPoints * (1 - duration / maxDuration));
    }
    return p;
  }

  function handleAnswer(evt) {
    if (pickedAnswerIdx) {
      return;
    }
    duration = Date.now() - startTime;
    if (songHeadClip.playing()) {
      songHeadClip.volume(0.5);
    }
    pickedAnswerIdx = evt.target.getAttribute("data-idx");
    isCorrect = pickedAnswerIdx == question.correctIndex;
    earnedPoints = isCorrect ? durationToPoints(duration) : 0;
    playAnswerFeedback();
    updateScore(isCorrect);
    evt.preventDefault();
  }
</script>


<button id="play" onclick={handlePlay} class:playing={isPlaying}>
  {#if isPlaying }
    <PauseFill size=80 />
  {:else}
    <PlayIcon size=80 />
  {/if}
</button>

{#if showAnswers}
  <h3>Which song is it?</h3>
  <div transition:fade>
    <ul class="answers">
    {#each question.answers as answer, i}
      <li data-idx={i}>
        <input type="radio" name="answer" value={answer} id={answer}
          onclick={handleAnswer}
          data-idx={i}
          disabled={pickedAnswerIdx ? true : false}
          />
        <label for={answer} class="button" class:disabled={pickedAnswerIdx!=null} class:picked={pickedAnswerIdx==i}>
          {#if pickedAnswerIdx!=null}
            {#if i == question.correctIndex}
              <span>✅</span>
            {:else}
              <span>❌</span>
            {/if}
          {/if}
          {answer}
        </label>
      </li>
    {/each}
  </div>
{/if}

{#if pickedAnswerIdx}
  <div transition:fade>
    <button class="button" onclick={() => {songHeadClip.stop(); goto("interim-results");}}>
      {#if isCorrect}
        Yay 😍
      {:else}
        Darn 😬
      {/if}
    </button>
  </div>
{/if}

<style>
  #play {
    margin: 1rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--secondary-color);
    border: 0px;
    padding: 2rem;
    font-family: AlphaEcho, sans-serif;
    background-color: var(--primary-color);
    border-radius: 50%;
    text-align: center;
  }
    
  .answers {
    list-style-type: none;
    padding: 0;

    li {
      text-align: center;

      input[type="radio"] {
        opacity: 0.01;
        z-index: 100;
      }

      label {
        padding: 5px;
        border: 1px solid #CCC;
        cursor: pointer;
        z-index: 90;
        &.disabled {
          background-color: #000;
        }
        &.picked {
          background-color: var(--primary-color);
          color: var(--secondary-color);
        }
      }
    
    
    }

  }
</style>