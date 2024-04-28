import { VotingPoll } from "../../features/votes/VotingPoll"
import { Comments } from "../../features/comments/Comments"

export const VotePage = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row w-full gap-16">
        <VotingPoll/>
        <Comments/>
      </div>
    </div>
  )
}
