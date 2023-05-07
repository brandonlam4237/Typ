import "../scss/settingsbar.scss";
import time from "../assets/time.svg";
import words from "../assets/words.svg";
import { useState } from "react";

interface settingsProps {
  timeSelected: boolean;
  wordsSelected: boolean;
  timeAmount: number;
  wordAmount: number;
  setTimeSelected: Function;
  setWordsSelected: Function;
  setTimeAmount: Function;
  setWordAmount: Function;
}

const lightGray = "#757575";
const red = "#f34949";
const white = "#FFFFFF";
const svgLightGray =
  "invert(50%) sepia(0%) saturate(0%) hue-rotate(188deg) brightness(91%) contrast(87%)";
const svgRed =
  "invert(44%) sepia(71%) saturate(5029%) hue-rotate(338deg) brightness(109%) contrast(90%)";
const svgWhite =
  "invert(100%) sepia(100%) saturate(0%) hue-rotate(116deg) brightness(103%) contrast(101%)";

function SettingsBar(props: settingsProps) {
  const {
    timeSelected,
    wordsSelected,
    timeAmount,
    wordAmount,
    setTimeSelected,
    setWordsSelected,
    setTimeAmount,
    setWordAmount,
  } = props;

  const [timeColor, setTimeColor] = useState({ color: red });
  const [svgTimeColor, setSvgTimeColor] = useState({ filter: svgRed });

  const [wordsColor, setWordsColor] = useState({ color: lightGray });
  const [svgWordsColor, setSvgWordsColor] = useState({ filter: svgLightGray });

  const [time15Color, setTime15Color] = useState({ color: red });
  const [time30Color, setTime30Color] = useState({ color: lightGray });
  const [time60Color, setTime60Color] = useState({ color: lightGray });

  const [words10Color, setWords10Color] = useState({ color: red });
  const [words25Color, setWords25Color] = useState({ color: lightGray });
  const [words50Color, setWords50Color] = useState({ color: lightGray });

  return (
    <main className="settings">
      <div className="settings__bar">
        <div
          className="settings__opt"
          onClick={() => {
            setTimeColor({ color: red });
            setSvgTimeColor({ filter: svgRed });
            setWordsColor({ color: lightGray });
            setSvgWordsColor({ filter: svgLightGray });
            setTimeSelected(true);
            setWordsSelected(false);
          }}
          onMouseEnter={() => {
            if (!timeSelected) {
              setTimeColor({ color: white });
              setSvgTimeColor({ filter: svgWhite });
            }
          }}
          onMouseLeave={() => {
            if (timeSelected) {
              setTimeColor({ color: red });
              setSvgTimeColor({ filter: svgRed });
            } else {
              setTimeColor({ color: lightGray });
              setSvgTimeColor({ filter: svgLightGray });
            }
          }}
        >
          <img src={time} className="settings__icon" style={svgTimeColor} />
          <div style={timeColor}>time</div>
        </div>
        <div
          className="settings__opt settings__opt-2"
          onClick={() => {
            setTimeColor({ color: lightGray });
            setSvgTimeColor({ filter: svgLightGray });
            setWordsColor({ color: red });
            setSvgWordsColor({ filter: svgRed });
            setTimeSelected(false);
            setWordsSelected(true);
          }}
          onMouseEnter={() => {
            if (!wordsSelected) {
              setWordsColor({ color: white });
              setSvgWordsColor({ filter: svgWhite });
            }
          }}
          onMouseLeave={() => {
            if (wordsSelected) {
              setWordsColor({ color: red });
              setSvgWordsColor({ filter: svgRed });
            } else {
              setWordsColor({ color: lightGray });
              setSvgWordsColor({ filter: svgLightGray });
            }
          }}
        >
          <img src={words} className="settings__icon" style={svgWordsColor} />
          <div style={wordsColor}>words</div>
        </div>
        <div className="settings__divider" />
        {timeSelected && (
          <div className="settings__nums">
            <div
              className="settings__num"
              style={time15Color}
              onClick={() => {
                setTimeAmount(15);
                setTime15Color({ color: red });
                setTime30Color({ color: lightGray });
                setTime60Color({ color: lightGray });
              }}
              onMouseEnter={() => {
                if (timeAmount !== 15) setTime15Color({ color: white });
              }}
              onMouseLeave={() => {
                if (timeAmount === 15) setTime15Color({ color: red });
                else setTime15Color({ color: lightGray });
              }}
            >
              15
            </div>
            <div
              className="settings__num"
              style={time30Color}
              onClick={() => {
                setTimeAmount(30);
                setTime15Color({ color: lightGray });
                setTime30Color({ color: red });
                setTime60Color({ color: lightGray });
              }}
              onMouseEnter={() => {
                if (timeAmount !== 30) setTime30Color({ color: white });
              }}
              onMouseLeave={() => {
                if (timeAmount === 30) setTime30Color({ color: red });
                else setTime30Color({ color: lightGray });
              }}
            >
              30
            </div>
            <div
              className="settings__num"
              style={time60Color}
              onClick={() => {
                setTimeAmount(60);
                setTime15Color({ color: lightGray });
                setTime30Color({ color: lightGray });
                setTime60Color({ color: red });
              }}
              onMouseEnter={() => {
                if (timeAmount !== 60) setTime60Color({ color: white });
              }}
              onMouseLeave={() => {
                if (timeAmount === 60) setTime60Color({ color: red });
                else setTime60Color({ color: lightGray });
              }}
            >
              60
            </div>
          </div>
        )}
        {wordsSelected && (
          <div className="settings__nums">
            <div
              className="settings__num"
              style={words10Color}
              onClick={() => {
                setWordAmount(10);
                setWords10Color({ color: red });
                setWords25Color({ color: lightGray });
                setWords50Color({ color: lightGray });
              }}
              onMouseEnter={() => {
                if (wordAmount !== 10) setWords10Color({ color: white });
              }}
              onMouseLeave={() => {
                if (wordAmount === 10) setWords10Color({ color: red });
                else setWords10Color({ color: lightGray });
              }}
            >
              10
            </div>
            <div
              className="settings__num"
              style={words25Color}
              onClick={() => {
                setWordAmount(25);
                setWords10Color({ color: lightGray });
                setWords25Color({ color: red });
                setWords50Color({ color: lightGray });
              }}
              onMouseEnter={() => {
                if (wordAmount !== 25) setWords25Color({ color: white });
              }}
              onMouseLeave={() => {
                if (wordAmount === 25) setWords25Color({ color: red });
                else setWords50Color({ color: lightGray });
              }}
            >
              25
            </div>
            <div
              className="settings__num"
              style={words50Color}
              onClick={() => {
                setWordAmount(50);
                setWords10Color({ color: lightGray });
                setWords25Color({ color: lightGray });
                setWords50Color({ color: red });
              }}
              onMouseEnter={() => {
                if (wordAmount !== 50) setWords50Color({ color: white });
              }}
              onMouseLeave={() => {
                if (wordAmount === 50) setWords50Color({ color: red });
                else setWords50Color({ color: lightGray });
              }}
            >
              50
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default SettingsBar;
