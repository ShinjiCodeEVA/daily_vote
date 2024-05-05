import { axios } from "../../../lib/axios";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const handleViewedPoll = async (pollId: string) => axios.get(`/api/poll/${pollId}`)

export const fetchViewedPoll = (pollId: string) => { 
    const queryKey: QueryKey = ["viewed-poll"]; 
    
    return useQuery({
        queryKey: queryKey,
        queryFn: () => handleViewedPoll(pollId),
        select: (data: AxiosResponse) => data.data.data,
        enabled: true
    })
}