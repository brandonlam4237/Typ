import userIcon from "../assets/account.svg";
import "../scss/stats.scss";

function Stats() {
  return (
    <main className="stats">
      <div className="stats__grid">
        <div className="stats__grid-block-1">
          <div className="stats__user">
            <img src={userIcon} className="stats__user-icon" />
            <p className="stats__title">Username</p>
          </div>
          <p style={{ color: "#757575" }}>Joined 26 Apr 2023</p>

          <div>
            <p className="stats__title">Tests Completed</p>
            <p className="stats__highlight stats__num-big">13</p>
          </div>
          <div>
            <p className="stats__title">Time Typing</p>
            <p className="stats__highlight stats__num-big">00:26:15</p>
          </div>
          <button className="stats__logout-btn">Logout</button>
        </div>
        <div className="stats__grid-block">
          <div className="stats__grid-block-col">
            <p className="stats__title">15 seconds</p>
            <p className="stats__highlight stats__num-big">93</p>
            <p className="stats__highlight">98%</p>
          </div>
          <div className="stats__grid-block-col">
            <p className="stats__title">30 seconds</p>
            <p className="stats__highlight stats__num-big">87</p>
            <p className="stats__highlight">96%</p>
          </div>
          <div className="stats__grid-block-col">
            <p className="stats__title">60 seconds</p>
            <p className="stats__highlight stats__num-big">-</p>
            <p className="stats__highlight">-</p>
          </div>
        </div>
        <div className="stats__grid-block">
          <div className="stats__grid-block-col">
            <p className="stats__title">10 words</p>
            <p className="stats__highlight stats__num-big">103</p>
            <p className="stats__highlight">99%</p>
          </div>
          <div className="stats__grid-block-col">
            <p className="stats__title">25 words</p>
            <p className="stats__highlight stats__num-big">-</p>
            <p className="stats__highlight">-</p>
          </div>
          <div className="stats__grid-block-col">
            <p className="stats__title">50 words</p>
            <p className="stats__highlight stats__num-big">91</p>
            <p className="stats__highlight">97%</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Stats;
