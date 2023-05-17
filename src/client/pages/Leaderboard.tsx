import SettingsBar from "../components/SettingsBar";
import { useEffect, useState } from "react";
import "../scss/leaderboard.scss";

function Leaderboard() {
  const [timeSelected, setTimeSelected] = useState(true);
  const [wordsSelected, setWordsSelected] = useState(false);
  const [timeAmount, setTimeAmount] = useState(15);
  const [wordAmount, setWordAmount] = useState(10);
  const [leaderStats, setLeaderStats] = useState<any[]>([]);

  useEffect(() => {
    fetchLeaderboard();
  }, [timeSelected, wordsSelected, timeAmount, wordAmount]);

  async function fetchLeaderboard() {
    const res = await fetch("http://localhost:3000/api/stats");
    const json = await res.json();
    console.log(json);
    const arr: any = [];
    for (let user of json) {
      console.log(user);
      if (timeSelected) {
        arr.push([`${user.username}`, user[`wpm_pb_${timeAmount}_time`]]);
      }
      if (wordsSelected) {
        arr.push([`${user.username}`, user[`wpm_pb_${wordAmount}_words`]]);
      }
    }
    arr.sort((a: any, b: any) => b[1] - a[1]);
    console.log(arr);
    setLeaderStats(arr.slice(0, 10));
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
        {leaderStats.length &&
          leaderStats.map((ele, i) => {
            return (
              <div className="leaderboard__board-row" key={i}>
                <p>{ele[0]}</p>
                <p>{ele[1]}</p>
              </div>
            );
          })}
      </div>
    </main>
  );
}

export default Leaderboard;
