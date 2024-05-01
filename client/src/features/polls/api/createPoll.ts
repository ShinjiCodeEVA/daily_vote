import { axios } from "../../../lib/axios";
import { PollType } from "../../../common/types";
import { useMutation } from "@tanstack/react-query";

const handleCreatePoll = async (data: PollType) => { 
    const response = await axios.post('/api/poll', data);
    return response.data; 
}

export const useCreatePoll = () => {
    return useMutation({
        mutationFn: (data: PollType) => handleCreatePoll(data)
    });
};