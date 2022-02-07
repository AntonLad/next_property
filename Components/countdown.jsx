import React, { useEffect } from 'react'

const Countdown = () => {
  const [counter, setCounter] = React.useState(30);
  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [counter])

  return (
    <div className="countdown">
      {counter === 0 ? 'Time over' : <div className="countDownText">{`Загрузка данных  ${counter}`}</div>}
    </div>
  );
}

export default Countdown
