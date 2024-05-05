import { PollItemProp } from "./poll-item.interface";
import { useEffect, useState } from "react";
import { useHover } from "../../../../hooks/useHover";

export const PollItem = ({handleCastVote, userId, pollId, choiceId, voteCount, pollName}: PollItemProp) => {
  
  const [width, setWidth] = useState<string>();
  const {ref, isHovered} = useHover();

  useEffect(() => { 
    setWidth(`${voteCount * 10 * 2}%`)
  }, [voteCount])


  return (
    <div className="text-white">
      <div className="flex items-center gap-8">
        <div className="w-40">{pollName}</div>
        <div 
          onClick={() => handleCastVote({userId, pollId, choiceId})}
          className="w-full flex items-center gap-3  border-l-[1px] border-gray-400 py-2">
          <div
            className={`bg-yellow-400 h-20 rounded-r-xl cursor-pointer hover:border-l-2 ${isHovered && 'border'}`}
            style={{ width: width }}
          ></div>
          <span 
            ref={ref}
            className="cursor-pointer"
            >{voteCount}</span>
        </div>
      </div>
    </div>
  );
};
