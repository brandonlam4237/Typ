import "../scss/settingsbar.scss";
import time from "../assets/time.svg";
import words from "../assets/words.svg";

function SettingsBar() {
  return (
    <main className="settings">
      <div className="settings__bar">
        <div className="settings__opt">
          <img src={time} className="settings__icon" />
          <div>time</div>
        </div>
        <div className="settings__opt settings__opt-2">
          <img src={words} className="settings__icon" />
          <div>words</div>
        </div>
        <div className="settings__divider" />
        <div>15</div>
        <div>30</div>
        <div>60</div>
      </div>
    </main>
  );
}

export default SettingsBar;
