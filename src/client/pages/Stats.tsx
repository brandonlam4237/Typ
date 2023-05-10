import userIcon from "../assets/account.svg";

function Stats() {
  return (
    <main className="stats">
      <div className="stats__grid">
        <div className="stats__grid-block">
          <img src={userIcon} />
          <p>Username</p>
          <p>Joinged 26 Apr 2023</p>
          <div>
            <p>Tests Completed</p>
            <p>13</p>
          </div>
          <div>
            <p>Time Typing</p>
            <p>00:26:15</p>
          </div>
        </div>
        <div className="stats__grid-block">
          <div>
            <p>15 seconds</p>
            <p>93</p>
            <p>98%</p>
          </div>
          <div>
            <p>30 seconds</p>
            <p>87</p>
            <p>96%</p>
          </div>
          <div>
            <p>60 seconds</p>
            <p>-</p>
            <p>-</p>
          </div>
        </div>
        <div className="stats__grid-block">
          <div>
            <p>10 words</p>
            <p>103</p>
            <p>99%</p>
          </div>
          <div>
            <p>25 words</p>
            <p>-</p>
            <p>-</p>
          </div>
          <div>
            <p>50 words</p>
            <p>91</p>
            <p>97%</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Stats;
