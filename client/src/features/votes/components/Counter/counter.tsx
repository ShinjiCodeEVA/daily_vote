import { CounterProp } from "./counter.interface"
import { RxTimer } from "react-icons/rx";
import { useEffect, useState } from "react";

export const Counter = ({remainingTime, pollTitle}: CounterProp) => {

  const calculateTimeLeft = () => {
		const now = new Date();
		const targetTime = remainingTime.getTime();
		const difference = targetTime - now.getTime();

		if (difference < 0) {
			return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}

		const seconds = Math.floor(difference / 1000) % 60;
		const minutes = Math.floor(difference / (1000 * 60)) % 60;
		const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
		const days = Math.floor(difference / (1000 * 60 * 60 * 24));

		return { days, hours, minutes, seconds };
	};

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => { 
    const timer = setInterval(() => { 
      const updatedTimeLeft = calculateTimeLeft();
			setTimeLeft(calculateTimeLeft);
			if (
				updatedTimeLeft.days === 0 &&
				updatedTimeLeft.hours === 0 &&
				updatedTimeLeft.minutes === 0 &&
				updatedTimeLeft.seconds === 0
			) {
				clearInterval(timer);
			}
    }, 1000)

    return () => clearInterval(timer);
  }, [])

  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold">{pollTitle}</h1>
      <div className="flex items-center gap-3">
        <span className="text-gray-400"><RxTimer/></span>
        <span className="text-gray-400 text-3xl mt-2"> {`${timeLeft.days}D: ${timeLeft.hours}H: ${timeLeft.minutes}M: ${timeLeft.seconds} S`}</span>
      </div>
    </div>
  )
}
