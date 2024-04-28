import { FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";

export const ActiveCrums = () => {
    
  const [activeClr, setActiveClr] = useState(true);   

  useEffect(() => { 
    const interval = setInterval(() => { 
        setActiveClr(prevState => !prevState);
    }, 1000)

    return () => clearInterval(interval);
  }, [])

  return (
    <div className="flex items-center text-white gap-3 mt-10">
        <div className={`h-[18px] w-[18px] rounded-full  ${activeClr ? 'bg-green-400' : 'bg-green-700'}`}/>
        <p>{1}</p>
        <div><FaRegUser/></div>
        <p className="text-sm">live on this vote channel</p>
    </div>
  )
}
