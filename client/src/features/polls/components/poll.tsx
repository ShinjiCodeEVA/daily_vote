import { PollProp } from "./poll.interface";
import { Head } from "../../../components/Elements/Head";
import { Button } from "../../../components/Elements";
import { Icon } from "../../../components/Elements";
import { formatDate } from "../../../utils";

const stickers = ["🔔", "👽", "🌟", "🌌", "🗽", "⛩️"]

const cls = [
    {bg: "#0b1c14", bd: "#19813f"},
    {bg: "#09090b", bd: "#224278"},
    {bg: "#0e1523", bd: "#224278"}
]

export const Poll = ({poll, active}: PollProp) => {
  const {user}= poll;

  return (
    <div className="w-full">
      <div className="relative p-[1px]">
        <div className="transition-transform hover:translate-x-3 hover:translate-y-3 relative rounded-md w-full bg-gray-600 py-4 px-5 z-10
                       ">
        <Icon className="absolute -top-3 right-2 z-[99] text-xl">
        👽
        </Icon>
          <div className="flex items-center gap-2">
          <img 
            src={user.userProfile} 
            alt="profile"
            className="object-cover max-w-[40px] rounded-full border-2 border-green-400"/>
            <Head text={user.username} className="text-sm" />
          </div>
          <Head
              text={poll.pollName}
              className="text-xl font-semibold mt-3" />
          {active ?
            <p className="text-gray-400 text-sm mt-3">Until {formatDate(poll.expirationDate.toString())}</p>
          : <Button variant="btn-poll-expired">Expired</Button>}
        </div>
        <div
          style={{backgroundColor: cls[0].bg, borderColor: cls[0].bd}}
          className={`border h-full  rounded-md w-full absolute top-3 left-3 z-0`}></div>
      
      </div>
    </div>
  );
};
