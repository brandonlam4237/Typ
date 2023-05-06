import { useEffect, useState } from "react";
import SettingsBar from "../components/SettingsBar";
import "../scss/home.scss";
import reset from "../assets/reset.svg";

function Home() {
  const text: string =
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur";
  const textArr: string[] = text.split(" ");

  const [gameInProgress, setGameInProgress] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const cursor = document.querySelector(".game__cursor") as HTMLElement;

      // start the game if key press is correct
      if (!gameInProgress && e.key !== text[0]) return;
      if (!gameInProgress) setGameInProgress(true);

      // handle incorrect letter
      if (e.key !== text[textIndex] && e.key.length === 1 && e.key !== " ") {
        const currLetter = document.querySelector<HTMLElement>(".current");
        const incorrectLetter = document.createElement("span");
        incorrectLetter.textContent = e.key;
        incorrectLetter.classList.add("game__letter");
        incorrectLetter.classList.add("incorrect");
        currLetter?.parentNode?.insertBefore(incorrectLetter, currLetter);

        // move cursor
        cursor.style.left =
          `${currLetter?.getBoundingClientRect().left}` + "px";
        cursor.style.top = `${currLetter?.getBoundingClientRect().top}` + "px";
      }

      // check if key press matches next letter in prompt
      if (e.key === text[textIndex] && e.key !== " ") {
        // letter match, change color to white
        const currLetter = document.querySelector<HTMLElement>(".current");
        currLetter?.classList.add("correct");

        // update text index to next letter in prompt
        setTextIndex(textIndex + 1);

        // handle if next char is a space e.g. need to go to next word
        if (text[textIndex + 1] === " ") {
          const nextLetter = currLetter?.parentElement?.nextSibling
            ?.firstChild as HTMLElement;
          nextLetter.classList.add("current");

          // move cursor
          cursor.style.left =
            `${currLetter?.getBoundingClientRect().right}` + "px";
          cursor.style.top =
            `${currLetter?.getBoundingClientRect().top}` + "px";

          // correct char entered
        } else {
          const nextLetter = currLetter?.nextSibling as HTMLElement;
          nextLetter.classList.add("current");

          // move cursor
          cursor.style.left =
            `${nextLetter?.getBoundingClientRect().left}` + "px";
        }

        currLetter?.classList.remove("current");
      }

      // space key pressed incorrectly
      if (e.key === " " && e.key !== text[textIndex] && gameInProgress) {
        // skip to next word
        let count = 0;
        let index = textIndex;
        while (text[index] !== " ") {
          count += 1;
          index += 1;
          if (text[index] !== " ") {
            const currLetter = document.querySelector<HTMLElement>(".current");
            const nextLetter = currLetter?.nextSibling as HTMLElement;
            nextLetter.classList.add("current");
            currLetter?.classList.remove("current");
          }
        }
        setTextIndex(textIndex + count + 1);
        const currLetter = document.querySelector<HTMLElement>(".current");
        const nextLetter = currLetter?.parentElement?.nextSibling
          ?.firstChild as HTMLElement;
        nextLetter.classList.add("current");
        currLetter?.classList.remove("current");
        // move cursor
        cursor.style.left =
          `${nextLetter?.getBoundingClientRect().left}` + "px";
        cursor.style.top = `${nextLetter?.getBoundingClientRect().top}` + "px";

        // calculate the distance from the top using timer and current word
        const timer = document.querySelector(".game__timer");
        const timerY = timer?.getBoundingClientRect().top;
        if (nextLetter && timerY) {
          const space = nextLetter?.getBoundingClientRect().top - timerY;

          // scroll words up a row if needed (past second row)
          if (space > 90) {
            console.log("spacing");
            const words = document.querySelector(".game__words") as HTMLElement;
            const top: any = words.style.marginTop.slice(0, -2);
            words.style.marginTop = `${top - 35}` + "px";
            cursor.style.top =
              `${nextLetter?.getBoundingClientRect().top}` + "px";
          }
        }
      }

      // space key pressed correctly
      if (e.key === " " && e.key === text[textIndex]) {
        setTextIndex(textIndex + 1);
        const currLetter = document.querySelector<HTMLElement>(".current");

        // move cursor to next word
        cursor.style.left =
          `${currLetter?.getBoundingClientRect().left}` + "px";
        const nextLetter = currLetter?.parentElement?.nextSibling
          ?.firstChild as HTMLElement;

        // check if word is not the last word in the line
        if (nextLetter && currLetter) {
          if (
            nextLetter.getBoundingClientRect().top <=
            currLetter.getBoundingClientRect().top
          ) {
            cursor.style.top =
              `${nextLetter.getBoundingClientRect().top}` + "px";
          }
        }

        // calculate the distance from the top using timer and current word
        const timer = document.querySelector(".game__timer");
        const timerY = timer?.getBoundingClientRect().top;
        if (currLetter && timerY) {
          const space = currLetter?.getBoundingClientRect().top - timerY;

          // scroll words up a row if needed (past second row)
          if (space > 90) {
            const words = document.querySelector(".game__words") as HTMLElement;
            const top: any = words.style.marginTop.slice(0, -2);
            words.style.marginTop = `${top - 35}` + "px";
            cursor.style.top =
              `${currLetter?.getBoundingClientRect().top}` + "px";
          }
        }
      }

      // backspace key pressed
      if (e.key === "Backspace" && textIndex !== 0) {
        const currLetter = document.querySelector<HTMLElement>(".current");
        const prevLetter = currLetter?.previousSibling as HTMLElement;

        // delete inccorect characters
        if (prevLetter?.classList.contains("incorrect")) {
          prevLetter?.remove();
          cursor.style.left =
            `${currLetter?.getBoundingClientRect().left}` + "px";
          cursor.style.top =
            `${currLetter?.getBoundingClientRect().top}` + "px";
        }

        // remove correct class from previous characters
        else if (prevLetter?.classList.contains("correct")) {
          prevLetter.classList.remove("correct");
          setTextIndex(textIndex - 1);
          currLetter?.classList.remove("current");
          prevLetter.classList.add("current");

          // move cursor
          cursor.style.left =
            `${prevLetter?.getBoundingClientRect().left}` + "px";
        }

        // go back to previous word
        else if (!prevLetter) {
          console.log("test test");
          const prevWordLastLetter = currLetter?.parentElement?.previousSibling
            ?.lastChild?.previousSibling as HTMLElement;
          currLetter?.classList.remove("current");
          prevWordLastLetter?.classList.remove("correct");
          prevWordLastLetter?.classList.add("current");

          if (text[textIndex] === " ") {
            setTextIndex(textIndex - 1); // if at the end of a word
          } else setTextIndex(textIndex - 2); // at the start of next word going back

          // need to handle backspace when there is no prev letter in the word / prev is a space
          cursor.style.left =
            `${prevWordLastLetter?.getBoundingClientRect().left}` + "px";
        } else {
          console.log("else");
          setTextIndex(textIndex - 1);
          currLetter?.classList.remove("current");
          prevLetter.classList.add("current");
          cursor.style.left =
            `${prevLetter?.getBoundingClientRect().left}` + "px";
        }
      }

      if (true) {
        const currLetter = document.querySelector<HTMLElement>(".current");
        const nextLetter = currLetter?.parentElement?.nextSibling
          ?.firstChild as HTMLElement;
        console.log("curr", currLetter);
        console.log("next", nextLetter);
        console.log("*******************");
      }
    };

    document.addEventListener("keydown", handleKey);

    // clean up event listener
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [textIndex]);

  return (
    <main className="home">
      <SettingsBar />
      <div className="game">
        {gameInProgress && <div className="game__timer">53</div>}
        {!gameInProgress && (
          <div className="game__timer game__timer--inactive">53</div>
        )}
        <div className="game__container">
          <div className="game__cursor"></div>
          <div className="game__words">
            {textArr.map((word, i) => {
              return (
                <div className="game__word" key={i}>
                  {word.split("").map((letter, j) => {
                    if (j === 0 && i === 0)
                      return (
                        <span className="game__letter current" key={j}>
                          {letter}
                        </span>
                      );
                    else
                      return (
                        <span className="game__letter" key={j}>
                          {letter}
                        </span>
                      );
                  })}{" "}
                </div>
              );
            })}
          </div>
        </div>
        <div className="game__reset-container">
          <img className="game__reset" src={reset} />
        </div>
      </div>
    </main>
  );
}

export default Home;
