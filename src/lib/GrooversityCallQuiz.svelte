<script>
    import Intro from "./Intro.svelte";
    import Countdown from "./Countdown.svelte";
    import PlayCall from "./PlayCall.svelte";
    import { onMount } from 'svelte';
    import buildQuiz from "./data/logic.js";

    const QUESTIONS_PER_ROUND = 5;

    let currentScreen = $state("intro");
    let onQuestionIndex = $state(0);
    let quiz = buildQuiz();
    let score = $state(0);

    function goto(screen) {
        console.log(`goto ${screen} from ${currentScreen}`);
        if (currentScreen=="round-over" && screen=="intro"){
            quiz = buildQuiz();
            onQuestionIndex = 0;
        } else if (currentScreen=="play-call" && screen=="countdown"){
            onQuestionIndex+=1;
        }
        currentScreen = screen;
        if (onQuestionIndex == (QUESTIONS_PER_ROUND)) {
            currentScreen = 'round-over';
        }
    }

    function updateScore(points) {
        score += points;
    }

    onMount(() => {
        console.log(quiz);
    });
</script>

{#if currentScreen === "intro"}
    <Intro {goto} />
{:else if currentScreen === "countdown"}
    <Countdown {goto} />
{:else if currentScreen === "play-call"}
    <PlayCall {goto} {updateScore} question={quiz[onQuestionIndex]}
        questionNumber={onQuestionIndex}
        totalQuestions={QUESTIONS_PER_ROUND} />
{:else if currentScreen === "round-over"}
    Round Over.
    <p>Your score: {score}</p>
    <p>Click to play again.</p>
    <button type="button" onclick={() => goto("intro")}>Play Again</button>
{:else}
    Invalid
{/if}
