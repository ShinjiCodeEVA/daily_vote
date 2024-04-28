import { ActivePolls } from "../../features/polls/ActivePolls"
import { PastPolls } from "../../features/polls/PastPolls/past-polls"

export const HomePage = () => {
  return (
    <div className="h-full">
       <div>
          <ActivePolls />
       </div>

       <div>
          <PastPolls />
       </div>
    </div>
  )
}
