import { axios } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const handleViewedPoll = async (pollId: string) => axios.get(`/api/poll/${pollId}`)

export const fetchViewedPoll = (pollId: string) => { 
    return useQuery({
        queryKey: ["viewed-poll"],
        queryFn: () => handleViewedPoll(pollId),
        select: (data: AxiosResponse) => data.data.data,
        enabled: true
    })
}