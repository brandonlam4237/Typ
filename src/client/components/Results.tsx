import "../scss/results.scss";
import resetIcon from "../assets/reset.svg";
import { useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";

interface resultsProps {
  wordsCorrect: number;
  wordsCompleted: number;
  mistakes: number;
  letterCount: number;
  timeSelected: boolean;
  wordsSelected: boolean;
  timeAmount: number;
  wordAmount: number;
  reset: Function;
  endTime: number;
}

function Results(props: resultsProps) {
  const {
    wordsCorrect,
    wordsCompleted,
    mistakes,
    letterCount,
    timeSelected,
    wordsSelected,
    timeAmount,
    wordAmount,
    reset,
    endTime,
  } = props;

  const { user } = useUserContext();

  useEffect(() => {
    if (user) updateStats();
  }, []);

  async function updateStats() {
    if (wordsSelected) {
      await fetch("http://localhost:3000/api/stats/" + user.user.user_id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.authToken}`,
        },
        body: JSON.stringify({
          test_type: `words_${wordAmount}`,
          wpm: Math.floor((wordsCorrect / endTime) * 60),
          acc: Math.floor(((letterCount - mistakes) / letterCount) * 100),
          total_time: endTime,
        }),
      });
    } else if (timeSelected) {
      await fetch("http://localhost:3000/api/stats/" + user.user.user_id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.authToken}`,
        },
        body: JSON.stringify({
          test_type: `time_${timeAmount}`,
          wpm: Math.floor((wordsCorrect / timeAmount) * 60),
          acc: Math.floor(((letterCount - mistakes) / letterCount) * 100),
          total_time: timeAmount,
        }),
      });
    }
  }

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
          {wordsSelected && (
            <p className="container__field-val">{`${Math.floor(
              (wordsCorrect / endTime) * 60
            )}`}</p>
          )}
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
          <p className="container__field-val">{`${Math.floor(
            ((letterCount - mistakes) / letterCount) * 100
          )}%`}</p>
        </div>
        <div className="container__field">
          <p>Time</p>
          {timeSelected && (
            <p className="container__field-val">{`${timeAmount}s`}</p>
          )}
          {wordsSelected && (
            <p className="container__field-val">{`${endTime}s`}</p>
          )}
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
