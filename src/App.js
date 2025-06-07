import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Set target time to 7 PM today
      const targetTime = new Date();
      targetTime.setHours(19, 15, 0, 0); // 7 PM (20:00:00)

      // If it's already past 7 PM, set target to 8 PM tomorrow
      if (now >= targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format the time units to always show two digits
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="countdown-container">
          <img
            src="/download.png"
            className="spinning-image"
            alt="Spinning Logo"
          />
          <div className="countdown-timer">
            <div className="countdown-text">
              <div className="time-display">
                <span>{formatTime(timeLeft.minutes)}</span>:
                <span>{formatTime(timeLeft.seconds)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

