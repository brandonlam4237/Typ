interface resultsProps {
  wordsCorrect: number;
  wordsCompleted: number;
  timeSelected: boolean;
  wordsSelected: boolean;
  timeAmount: number;
  wordAmount: number;
  reset: Function;
}

function Results(props: resultsProps) {
  const {
    wordsCorrect,
    wordsCompleted,
    timeSelected,
    wordsSelected,
    timeAmount,
    wordAmount,
    reset,
  } = props;
  return (
    <main className="results">
      <div className="results__container">
        <div>
          <p>WPM</p>
          <p>87</p>
        </div>
        <div>
          <p>Test Type</p>
          <p>time 30s</p>
        </div>
        <div>
          <p>Acc</p>
          <p>93%</p>
        </div>
        <div>
          <p>Time</p>
          <p>30s</p>
        </div>
      </div>
    </main>
  );
}

export default Results;
