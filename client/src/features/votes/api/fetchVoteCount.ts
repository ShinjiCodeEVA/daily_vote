import { AxiosResponse } from "axios";
import { axios } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";


const handleGetVoteCount = async (voteId: number) => {
    console.log(voteId)
    return axios.get(`/api/vote/${voteId}`); 
}

export const getVoteCount = (voteId: number) => { 
    return useQuery({
        queryKey: ["vote count"],
        queryFn: () => handleGetVoteCount(voteId),
        select: (data: AxiosResponse) => data.data.data,
    })
}