import songs from "./songs.json";

export default function buildQuiz() {
  const quiz = [];
  const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
  shuffledSongs.forEach((currentSong, index) => {
    const answers = shuffledSongs
      .filter((_, i) => i !== index)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(song => song.name);
    const correctIndex = Math.floor(Math.random() * (answers.length + 1));
    answers.splice(correctIndex, 0, currentSong.name);
    quiz.push({
      song: currentSong,
      answers,
      correctIndex
    });
  });
  return quiz;
}