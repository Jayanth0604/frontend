import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();

      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      const dateFormatted = currentDate.toLocaleString('en-US', options);

      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');

      const timeFormatted = `${hours}:${minutes}:${seconds}`;
      setTime(`${dateFormatted} ${timeFormatted}`);
    }, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  return <div className='clock'>{time}</div>;
}

export default Clock;
