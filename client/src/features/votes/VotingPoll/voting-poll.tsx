import { useState } from "react";
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
import io from "socket.io-client"
import { useQueryClient } from "@tanstack/react-query";
const socket = io("http://localhost:3000")

export const VotingPoll = () => {

  const {user} = useAuthContext();
  const {voteId} = useParams();
  const {data, refetch} = fetchViewedPoll(voteId?.toString() ?? "");
  const {mutate} = castVote();
  const queryClient = useQueryClient();
  
  useEffect(() => {
    if (voteId) { 
      refetch();
    }
  }, [])

  useEffect(() => {
    const handleNewVote = async (data: any) => { 
      console.log('new vote');
      await queryClient.invalidateQueries({queryKey: ["viewed-poll"], exact: true})
    };

    socket.on("newVote", handleNewVote);

    return () => {
      socket.off('newVote', handleNewVote);
    };
  }, [socket]);

  const handleCastVote = (data: VoteType) => {
    if (socket) { 
      socket.emit('vote', data);
      console.log('emitting')
    }
    mutate(data);
  }


  const increaseVoteCount = (choiceId: number) => { 
    if (data) {
      data.choices.map((choice: ChoiceType) => {
        if (choice.choiceId === choiceId && choice.voteCount) 
            choice.voteCount + 1;
        return choice;
      })
    }
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
