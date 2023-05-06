import { useState } from "react";

interface timerProps {
  timeAmount: number;
}

function Timer(props: timerProps) {
  const { timeAmount } = props;
  const [time, setTime] = useState(timeAmount);
  return <div>{time}</div>;
}

export default Timer;
