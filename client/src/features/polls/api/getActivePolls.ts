import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../lib/axios";


const fetchActivePolls = async () => await axios.get('/api/poll?state=active');


export const getActivePolls = () => { 
    return useQuery({
        queryKey: ["active-polls"],
        queryFn: async () => await fetchActivePolls(),
        select: (data) => data.data.data   
    })
} 


