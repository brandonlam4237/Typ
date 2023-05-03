import { useEffect, useState } from "react";
import SettingsBar from "../components/SettingsBar";
import "../scss/home.scss";
import reset from "../assets/reset.svg";

function Home() {
  const text: string =
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur";
  const textArr: string[] = text.split(" ");

  const [gameInProgress, setGameInProgress] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key.length === 1 && e.key !== " ") {
        if (!gameInProgress) setGameInProgress(true);
      }

      // handle incorrect letter
      if (e.key !== text[textIndex] && e.key.length === 1 && e.key !== " ") {
        const currLetter = document.querySelector<HTMLElement>(".current");
        const incorrectLetter = document.createElement("span");
        incorrectLetter.textContent = e.key;
        incorrectLetter.classList.add("game__letter");
        incorrectLetter.classList.add("incorrect");
        currLetter?.parentNode?.insertBefore(incorrectLetter, currLetter);
      }

      // check if key press matches next letter in prompt
      if (e.key === text[textIndex] && e.key !== " ") {
        console.log(e.key, "matches", text[textIndex]);

        // letter match, change color to white
        const currLetter = document.querySelector<HTMLElement>(".current");
        currLetter?.classList.add("correct");

        // update text index to next letter in prompt
        setTextIndex(textIndex + 1);

        // handle if next char is a space e.g. need to go to next word
        if (text[textIndex + 1] === " ") {
          const nextLetter = currLetter?.parentElement?.nextSibling
            ?.firstChild as HTMLElement;
          console.log(nextLetter);
          nextLetter.classList.add("current");
        } else {
          const nextLetter = currLetter?.nextSibling as HTMLElement;
          nextLetter.classList.add("current");
        }
        currLetter?.classList.remove("current");
      }

      // space key pressed incorrectly
      if (e.key === " " && e.key !== text[textIndex]) {
        // skip to next word
        let count = 0;
        let index = textIndex;
        while (text[index] !== " ") {
          console.log(text[index]);
          count += 1;
          index += 1;
          if (text[index] !== " ") {
            const currLetter = document.querySelector<HTMLElement>(".current");
            const nextLetter = currLetter?.nextSibling as HTMLElement;
            nextLetter.classList.add("current");
            currLetter?.classList.remove("current");
          }
        }
        console.log("curr char:", text[textIndex + count + 1]);
        setTextIndex(textIndex + count + 1);
        const currLetter = document.querySelector<HTMLElement>(".current");
        const nextLetter = currLetter?.parentElement?.nextSibling
          ?.firstChild as HTMLElement;
        nextLetter.classList.add("current");
        currLetter?.classList.remove("current");
      }

      if (e.key === " " && e.key === text[textIndex]) {
        setTextIndex(textIndex + 1);
      }

      // backspace key pressed
      if (e.key === "Backspace") {
        const currLetter = document.querySelector<HTMLElement>(".current");
        const prevLetter = currLetter?.previousSibling as HTMLElement;

        // delete inccorect characters
        if (prevLetter?.classList.contains("incorrect")) {
          prevLetter?.remove();
        }

        // remove correct class from previous characters
        else if (prevLetter?.classList.contains("correct")) {
          console.log("removing", prevLetter);
          prevLetter.classList.remove("correct");
          setTextIndex(textIndex - 1);
          currLetter?.classList.remove("current");
          prevLetter.classList.add("current");
        }
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
