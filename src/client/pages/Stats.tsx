import { useEffect, useState } from "react";
import userIcon from "../assets/account.svg";
import "../scss/stats.scss";
import { useLogout } from "../hooks/useLogout";

function Stats() {
  const [username, setUsername] = useState("Username");
  const [joinDate, setJoinDate] = useState("26 Apr 2023");
  const [totalTests, setTotalTests] = useState(13);
  const [timeTyping, setTimeTyping] = useState(1575);

  const [time15wpm, setTime15wpm] = useState(93);
  const [time15acc, setTime15acc] = useState(98);
  const [time30wpm, setTime30wpm] = useState(87);
  const [time30acc, setTime30acc] = useState(96);
  const [time60wpm, setTime60wpm] = useState(null);
  const [time60acc, setTime60acc] = useState(null);

  const [words10wpm, setWords10wpm] = useState(103);
  const [words10acc, setWords10acc] = useState(99);
  const [words25wpm, setWords25wpm] = useState(null);
  const [words25acc, setWords25acc] = useState(null);
  const [words50wpm, setWords50wpm] = useState(91);
  const [words50acc, setWords50acc] = useState(97);

  const { logout } = useLogout();

  function formatTime(seconds: number) {
    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <main className="stats">
      <div className="stats__grid">
        <div className="stats__grid-block-1">
          <div className="stats__user">
            <img src={userIcon} className="stats__user-icon" />
            <p>{username}</p>
          </div>
          <p style={{ color: "#757575", fontSize: "1rem" }}>
            {`Joined ${joinDate}`}
          </p>

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
