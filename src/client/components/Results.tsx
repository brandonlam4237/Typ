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
          {timeSelected && (
            <p className="container__field-val">{`${Math.floor(
              (wordsCorrect / timeAmount) * 60
            )}`}</p>
          )}
          {wordsSelected && <p className="container__field-val">53</p>}
        </div>
        <div className="container__field">
          <p>Test</p>
          {timeSelected && (
            <p className="container__field-val">{`time ${timeAmount}s`}</p>
          )}
          {wordsSelected && (
            <p className="container__field-val">{`words ${wordAmount}`}</p>
          )}
        </div>
        <div className="container__field">
          <p>Acc</p>
          {timeSelected && (
            <p className="container__field-val">{`${Math.floor(
              (wordsCorrect / wordsCompleted) * 100
            )}%`}</p>
          )}
          {wordsSelected && <p className="container__field-val">10</p>}
        </div>
        <div className="container__field">
          <p>Time</p>
          {timeSelected && (
            <p className="container__field-val">{`${timeAmount}s`}</p>
          )}
          {wordsSelected && <p className="container__field-val">10</p>}
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
