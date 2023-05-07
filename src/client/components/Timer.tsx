import { useEffect, useState } from "react";

interface timerProps {
  timeAmount: number;
  endGame: Function;
}

function Timer(props: timerProps) {
  const { timeAmount, endGame } = props;
  const [time, setTime] = useState(timeAmount);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((prev) => prev - 1);
      clearInterval(timer);
      if (time === 0) {
        endGame();
      }
    }, 1000);
  }, [time]);
  return <div>{time}</div>;
}

export default Timer;
