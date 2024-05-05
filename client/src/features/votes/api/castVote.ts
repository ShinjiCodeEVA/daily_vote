import { axios } from "../../../lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VoteType } from "../../../common/types";

const handleCastVote = async (data: VoteType) => await axios.post('/api/vote', data);

export const castVote = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: VoteType) => handleCastVote(data),
        onSuccess: () => {
            console.log('should invalidate')
            queryClient.invalidateQueries({queryKey: ["viewed-poll"], exact: true,});
        }
    })
} 