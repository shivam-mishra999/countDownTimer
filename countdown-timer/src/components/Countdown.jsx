import React, { useState, useEffect } from 'react';
import styles from "./styles.css";

const Countdown = () => {
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleInputChange = (event) => {
    setTargetDate(event.target.value);
  };

  const handleToggleTimer = () => {
    if(!isTimerRunning){
        startCountdown();
    }else{
        stopCountdown();
    }
  }

  const startCountdown = () => {
    if (validateInput(targetDate)) {
      const endDate = new Date(targetDate);
      const currentTime = new Date();
      const difference = endDate - currentTime;
      if (difference > 0 && difference <= 1000 * 60 * 60 * 24 * 99) {
        setCountdown(difference);
        const id = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown <= 1000) {
              clearInterval(intervalId);
              return 0;
            }
            return prevCountdown - 1000;
          });
        }, 1000);
        setIntervalId(id);
        setIsTimerRunning(true);
      } else if (difference > 1000 * 60 * 60 * 24 * 100) {
        alert('Selected time is more than 100 Days');

      } else {
        alert('Please enter a valid date within the next 99 days.');
      }
    } else {
      alert('Please enter a valid date and time format.');
    }
  };

  const stopCountdown = () => {
    clearInterval(intervalId);
    setIsTimerRunning(false);
  };

  const validateInput = (input) => {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    return regex.test(input);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return (
        <div className="finalOutput">
            <div className="item">{days}<br /> Days</div>
            <div className="item">{hours}<br /> Hours</div>
            <div className="item">{minutes}<br /> Minutes</div>
            <div className="item">{seconds}<br /> Seconds</div>
        </div>
    )
  };
  
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 99);
    return maxDate.toISOString().split('.')[0];
  };

  return (
    <div className="container">
      <h1>Countdown <span>Timer</span></h1>
      <form>
        <input
            type="datetime-local"
            value={targetDate}
            onChange={handleInputChange}
            max={getMaxDate()}
        />
      </form>
      
      <button onClick={handleToggleTimer}>{isTimerRunning ? "Cancel Timer" : "Start Timer"}</button>
      <div>
            {countdown > 0 ? (
            <p>
                {formatTime(countdown)}
            </p>
            ) : (
                <div className="initialOutput">
                    <div className="item">0<br /> Days</div>
                    <div className="item">0<br /> Hours</div>
                    <div className="item">0<br /> Minutes</div>
                    <div className="item">0<br /> Seconds</div>
                </div>
            )}
        
      </div>
    </div>
  );
};



export default Countdown;

