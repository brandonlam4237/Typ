import { useEffect, useState } from "react";
import userIcon from "../assets/account.svg";
import "../scss/stats.scss";
import { useLogout } from "../hooks/useLogout";
import { useUserContext } from "../hooks/useUserContext";

function Stats() {
  //const [joinDate, setJoinDate] = useState("26 Apr 2023");
  const [totalTests, setTotalTests] = useState(0);
  const [timeTyping, setTimeTyping] = useState(0);

  const [time15wpm, setTime15wpm] = useState(0);
  const [time15acc, setTime15acc] = useState(0);
  const [time30wpm, setTime30wpm] = useState(0);
  const [time30acc, setTime30acc] = useState(0);
  const [time60wpm, setTime60wpm] = useState(0);
  const [time60acc, setTime60acc] = useState(0);

  const [words10wpm, setWords10wpm] = useState(0);
  const [words10acc, setWords10acc] = useState(0);
  const [words25wpm, setWords25wpm] = useState(0);
  const [words25acc, setWords25acc] = useState(0);
  const [words50wpm, setWords50wpm] = useState(0);
  const [words50acc, setWords50acc] = useState(0);

  const { user } = useUserContext();
  const { logout } = useLogout();

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const res = await fetch(
      "http://localhost:3000/api/stats/" + user.user.user_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.authToken}`,
        },
      }
    );
    const json = await res.json();

    setWords10wpm(json.wpm_pb_10_words);
    setWords25wpm(json.wpm_pb_25_words);
    setWords50wpm(json.wpm_pb_50_words);
    setWords10acc(json.acc_pb_10_words);
    setWords25acc(json.acc_pb_25_words);
    setWords50acc(json.acc_pb_50_words);

    setTime15wpm(json.wpm_pb_15_time);
    setTime30wpm(json.wpm_pb_30_time);
    setTime60wpm(json.wpm_pb_60_time);
    setTime15acc(json.acc_pb_15_time);
    setTime30acc(json.acc_pb_30_time);
    setTime60acc(json.acc_pb_60_time);

    setTotalTests(json.total_games);
    setTimeTyping(json.total_time);
  }

  function formatDate() {
    const arr = user.user.creationdate.split("-");
    const year = arr[0];
    const day = arr[2];

    const month_names = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = month_names[arr[1] - 1];
    return `Joined ${day} ${month} ${year}`;
  }

  function formatTime(seconds: number) {
    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  return (
    <main className="stats">
      <div className="stats__grid">
        <div className="stats__grid-block-1">
          <div className="stats__user">
            <img src={userIcon} className="stats__user-icon" />
            <p>{user.user.username}</p>
          </div>
          <p style={{ color: "#757575", fontSize: "1rem" }}>{formatDate()}</p>

          <div className="stats__grid-block-1-div">
            <p>Tests Completed</p>
            <p className="stats__highlight stats__num-big">{totalTests}</p>
          </div>
          <div className="stats__grid-block-1-div">
            <p>Time Typing</p>
            <p className="stats__highlight stats__num-big">
              {formatTime(timeTyping)}
            </p>
          </div>
          <button className="stats__logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="stats__grid-block">
          <div className="stats__grid-block-col">
            <p className="stats__title">15 seconds</p>
            {time15wpm ? (
              <>
                <p className="stats__highlight stats__num-big">{time15wpm}</p>
                <p className="stats__highlight">{`${time15acc}%`}</p>
              </>
            ) : (
              <>
                <p className="stats__highlight stats__num-big stats__null">-</p>
                <p className="stats__highlight stats__null">-</p>
              </>
            )}
          </div>
          <div className="stats__grid-block-col">
            <p className="stats__title">30 seconds</p>
            {time30wpm ? (
              <>
                <p className="stats__highlight stats__num-big">{time30wpm}</p>
                <p className="stats__highlight">{`${time30acc}%`}</p>
              </>
            ) : (
              <>
                <p className="stats__highlight stats__num-big stats__null">-</p>
                <p className="stats__highlight stats__null">-</p>
              </>
            )}
          </div>
          <div className="stats__grid-block-col">
            <p className="stats__title">60 seconds</p>
            {time60wpm ? (
              <>
                <p className="stats__highlight stats__num-big">{time60wpm}</p>
                <p className="stats__highlight">{`${time60acc}%`}</p>
              </>
            ) : (
              <>
                <p className="stats__highlight stats__num-big stats__null">-</p>
                <p className="stats__highlight stats__null">-</p>
              </>
            )}
          </div>
        </div>
        <div className="stats__grid-block">
          <div className="stats__grid-block-col">
            <p className="stats__title">10 words</p>
            {words10wpm ? (
              <>
                <p className="stats__highlight stats__num-big">{words10wpm}</p>
                <p className="stats__highlight">{`${words10acc}%`}</p>
              </>
            ) : (
              <>
                <p className="stats__highlight stats__num-big stats__null">-</p>
                <p className="stats__highlight stats__null">-</p>
              </>
            )}
          </div>
          <div className="stats__grid-block-col">
            <p className="stats__title">25 words</p>
            {words25wpm ? (
              <>
                <p className="stats__highlight stats__num-big">{words25wpm}</p>
                <p className="stats__highlight">{`${words25acc}%`}</p>
              </>
            ) : (
              <>
                <p className="stats__highlight stats__num-big stats__null">-</p>
                <p className="stats__highlight stats__null">-</p>
              </>
            )}
          </div>
          <div className="stats__grid-block-col">
            <p className="stats__title">50 words</p>
            {words50wpm ? (
              <>
                <p className="stats__highlight stats__num-big">{words50wpm}</p>
                <p className="stats__highlight">{`${words50acc}%`}</p>
              </>
            ) : (
              <>
                <p className="stats__highlight stats__num-big stats__null">-</p>
                <p className="stats__highlight stats__null">-</p>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Stats;
