import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../lib/axios";


const fetchExpiredPolls = async () => await axios.get('/api/poll?state=expired');

export const getExpiredPolls = () => { 
    return useQuery({
        queryKey: ["expired-polls"],
        queryFn: async () => await fetchExpiredPolls(),
        select: (data) => data.data.data          
    })
} 


