import { useEffect, useState } from "react";
import StyledText from "../StyledText/StyledText";
import { s } from "./ClockHHMM.style";

function getCurrentTime() {
  const currentTime = new Date();
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const date = `${String(currentTime.getDate()).padStart(2, "0")}/${String(
    currentTime.getMonth() + 1
  ).padStart(2, "0")}/${currentTime.getFullYear()}`;

  return {
    date,
    time: currentTime.toLocaleTimeString("en-US", timeOptions),
  };
}

export default function ClockHHMM() {
  const [clock, setClock] = useState<{ date: string; time: string }>(
    getCurrentTime()
  );
  useEffect(() => {
    const updateClockInterval = setInterval(
      () => setClock(getCurrentTime()),
      1000
    );
    return () => clearInterval(updateClockInterval);
  }, []);
  return (
    <>
      <StyledText style={s.clock}>{clock.date}</StyledText>
      <StyledText style={s.clock}>{clock.time}</StyledText>
    </>
  );
}
