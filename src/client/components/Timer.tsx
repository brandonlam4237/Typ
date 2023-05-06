import { useEffect, useState } from "react";

interface timerProps {
  timeAmount: number;
}

function Timer(props: timerProps) {
  const { timeAmount } = props;
  const [time, setTime] = useState(timeAmount);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((prev) => prev - 1);
      clearInterval(timer);
    }, 1000);
  }, [time]);
  return <div>{time}</div>;
}

export default Timer;
