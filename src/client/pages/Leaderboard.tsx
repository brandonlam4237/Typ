import SettingsBar from "../components/SettingsBar";
import { useEffect, useState } from "react";
import "../scss/leaderboard.scss";
import arrow_left from "../assets/arrow-left.png";
import arrow_right from "../assets/arrow-right.png";

function Leaderboard() {
  const [timeSelected, setTimeSelected] = useState(true);
  const [wordsSelected, setWordsSelected] = useState(false);
  const [timeAmount, setTimeAmount] = useState(15);
  const [wordAmount, setWordAmount] = useState(10);
  const [leaderStats, setLeaderStats] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchLeaderboard();
  }, [timeSelected, wordsSelected, timeAmount, wordAmount]);

  async function fetchLeaderboard() {
    const res = await fetch("http://localhost:3000/api/stats");
    const json = await res.json();
    const arr: any = [];
    for (let user of json) {
      if (timeSelected) {
        arr.push([`${user.username}`, user[`wpm_pb_${timeAmount}_time`]]);
      }
      if (wordsSelected) {
        arr.push([`${user.username}`, user[`wpm_pb_${wordAmount}_words`]]);
      }
    }
    arr.sort((a: any, b: any) => b[1] - a[1]);
    setLeaderStats(arr);
  }

  return (
    <main className="leaderboard">
      <p className="leaderboard__title">Leaderboard</p>
      <SettingsBar
        timeSelected={timeSelected}
        setTimeSelected={setTimeSelected}
        wordsSelected={wordsSelected}
        setWordsSelected={setWordsSelected}
        timeAmount={timeAmount}
        setTimeAmount={setTimeAmount}
        wordAmount={wordAmount}
        setWordAmount={setWordAmount}
        gameInProgress={false}
      />
      <div className="leaderboard__board">
        <div className="leaderboard__stats">
          {leaderStats.length &&
            leaderStats.map((ele, i) => {
              if (i + 1 > pageNumber * 7 || i + 1 < (pageNumber - 1) * 7)
                return <div key={i} className="hidden"></div>;
              return (
                <div className="leaderboard__row" key={i}>
                  <div className="leaderboard__text-next">
                    <p className="leaderboard__number">{i + 1}.</p>
                    <p>{ele[0]}</p>
                  </div>
                  <div className="leaderboard__text-next">
                    <p className="leaderboard__number">{ele[1]}</p>
                    <p className="wpm">wpm</p>
                  </div>
                </div>
              );
            })}
        </div>
        <footer className="arrows">
          <span
            className="arrows__box"
            onClick={() => {
              if (pageNumber > 1) setPageNumber(pageNumber - 1);
            }}
          >
            <img src={arrow_left} className="arrows__arrow" />
          </span>
          <p className="arrows__page">page {pageNumber}</p>
          <span
            className="arrows__box"
            onClick={() => {
              if (pageNumber * 7 < leaderStats.length) {
                setPageNumber(pageNumber + 1);
              }
            }}
          >
            <img src={arrow_right} className="arrows__arrow" />
          </span>
        </footer>
      </div>
    </main>
  );
}

export default Leaderboard;
