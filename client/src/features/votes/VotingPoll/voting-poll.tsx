import { Counter } from "../components/Counter"
import { PollItem } from "../components/PollItem"
import { ActiveCrums } from "../components/ActiveCrumbs";


export const VotingPoll = () => {

  const currentDate = new Date();
  const targetDate = new Date(currentDate.setDate(currentDate.getDate() + 3));

  return (
    <div className="w-full mt-3">
        <div className="mt-16">
            <Counter remainingTime={targetDate} pollTitle="Best Frontend Framework"/>
        </div>
        <ActiveCrums/>
        <div className="mt-10">
            <PollItem voteCount={100} pollName="React" />
            <PollItem voteCount={1} pollName="Angular"/>
            <PollItem voteCount={1} pollName="Vue"/>
            <PollItem voteCount={2} pollName="Svelete"/>
        </div>
    </div>
  )
}
