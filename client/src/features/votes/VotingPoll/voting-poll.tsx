import { Counter } from "../components/Counter"
import { PollItem } from "../components/PollItem"
import { ActiveCrums } from "../components/ActiveCrumbs";
import { RequireAuth } from "../components/RequireAuth";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { fetchViewedPoll } from "../api/fetchViewedPoll";
import { useEffect } from "react";
import { ChoiceType, VoteType } from "../../../common/types";
import { castVote } from "../api/castVote";

export const VotingPoll = () => {

  const currentDate = new Date();
  const targetDate = new Date(currentDate.setDate(currentDate.getDate() + 3));
  const {user} = useAuthContext();
  const {voteId} = useParams();
  const {data, refetch} = fetchViewedPoll(voteId?.toString() ?? "");
  const {mutate} = castVote();
    
  useEffect(() => {
    if (voteId) { 
      refetch();
    }
  }, [])

  const handleCastVote = (data: VoteType) => {
    mutate(data);
  }

  return (
    <div className="w-full mt-3">
      {data && 
      <>
        <div className="mt-16">
            <Counter 
              remainingTime={new Date(data.expirationDate)}  
              pollTitle={data.pollName}/>
        </div>
        {user ? 
          <>
            <ActiveCrums/>
            <div className="mt-10">
                {data?.choices && 
                data.choices.map((choice: ChoiceType, index:number) => {
                  return (
                    <PollItem 
                      key={index}
                      handleCastVote={handleCastVote}
                      userId={user.userId ?? -1}
                      pollId={data.pollId}
                      choiceId={choice.choiceId ?? -1}
                      voteCount={choice.voteCount ?? 0}
                      pollName={choice.choiceName}/>
                  )  
                } )}
            </div> 
          </>: 
          <RequireAuth/> } 
        </>}
    </div>
  )
}
