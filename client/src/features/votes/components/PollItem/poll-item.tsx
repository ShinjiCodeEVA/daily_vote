import { PollItemProp } from "./poll-item.interface";

export const PollItem = ({voteCount, pollName}: PollItemProp) => {
  
  const width = voteCount * 10 * 2+ "%";

  return (
    <div className="text-white">
      <div className="flex items-center">
        <div className="w-40">{pollName}</div>
        <div className="w-[100%] flex items-center gap-3  border-l-[1px] py-2 ">
          <div
            className="bg-yellow-400 h-20 rounded-r-xl  hover:border-l-2"
            style={{ width: width }}
          ></div>
          <span>{voteCount}</span>
        </div>
      </div>
    </div>
  );
};
