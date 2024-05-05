import { VotingPoll } from "../../features/votes/VotingPoll"
import { Comments } from "../../features/comments/Comments"
import { useAuthContext } from "../../hooks/useAuthContext"


export const VotePage = () => {

  const {user} = useAuthContext();
  
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row w-full gap-16">
        <VotingPoll/>
        {user && 
        <Comments/>}
      </div>
    </div>
  )
}
