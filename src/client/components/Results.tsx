import "../scss/results.scss";
import resetIcon from "../assets/reset.svg";

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
      <div className="container">
        <div className="container__field">
          <p>WPM</p>
          <p className="container__field-val">87</p>
        </div>
        <div className="container__field">
          <p>Test</p>
          <p className="container__field-val">time 30s</p>
        </div>
        <div className="container__field">
          <p>Acc</p>
          <p className="container__field-val">93%</p>
        </div>
        <div className="container__field">
          <p>Time</p>
          <p className="container__field-val">30s</p>
        </div>
        <div className="container__reset-container">
          <img
            src={resetIcon}
            className="container__reset"
            onClick={() => {
              reset();
            }}
          />
        </div>
      </div>
    </main>
  );
}

export default Results;
