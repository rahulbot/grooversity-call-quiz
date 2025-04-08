<script>
  import { Howl } from 'howler';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  let { goto, question, updateScore, questionNumber, totalQuestions } = $props();

  let showAnswers = $state(false);
  let pickedAnswer = $state(null);
  let isCorrect = $state(null);
  let startTime = null;
  let duration = null;
  let earnedPoints = 0;

  var songHeadClip = new Howl({
    src: [`audio/${question.song.src}`],
    volume: 1,
  });
 
  function playAnswerFeedback() {
    const clipFileName = isCorrect ? 'right.mp3' : 'wrong.mp3';
    console.log(clipFileName);
    var sound = new Howl({
      src: [`audio/${clipFileName}`],
      volume: 1,
    });
    sound.play();
  }

  function handlePlay(evt) {
    songHeadClip.play();
    showAnswers = true
    startTime = Date.now();
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
    duration = Date.now() - startTime;
    if (songHeadClip.playing()) {
      songHeadClip.volume(0.5);
    }
    pickedAnswer = evt.target.getAttribute("data-idx");
    isCorrect = pickedAnswer == question.correctIndex;
    earnedPoints = isCorrect ? durationToPoints(duration) : 0;
    playAnswerFeedback();
    updateScore(earnedPoints);
  }
 </script>

<h1>Question {questionNumber + 1} of {totalQuestions}</h1>

<button onclick={handlePlay}>play</button>

<br /><br /><br />

{#if showAnswers}
  <div transition:fade>
    <ul class="answers">
    {#each question.answers as answer, i}
      <li data-idx={i}>
        <input type="radio" name="answer" value={answer} id={answer}
          onclick={handleAnswer}
          data-idx={i}
          disabled={pickedAnswer ? true : false}
          />
        <label for={answer}>{answer}</label>
      </li>
    {/each}
  </div>
{/if}

{#if pickedAnswer}
  <div transition:fade>
    {#if isCorrect}
      <p>Correct!</p>
      <p>You answered in {(duration / 1000).toFixed(1)} seconds, earning {durationToPoints(duration)} points.</p>
      {:else}
      <p>Wrong! The correct answer was {question.answers[question.correctIndex]}</p>
      <p>You earned 0 points</p>
    {/if}
    <button onclick={() => {songHeadClip.stop(); goto("countdown");}}>Next</button>
  </div>
{/if}

<style>
.answers {
  list-style-type: none;
  margin: 25px 0 0 0;
  padding: 0;

  li {
    float: left;
    margin: 0 5px 0 0;
    width: 100px;
    height: 40px;
    position: relative;
  }

  label, input {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  input[type="radio"] {
    opacity: 0.01;
    z-index: 100;
  }

  input[type="radio"]:checked+label {
    background: yellow;
  }

  label {
    padding: 5px;
    border: 1px solid #CCC;
    cursor: pointer;
    z-index: 90;
  }

  label:hover {
    background: #DDD;
  }
}
</style>