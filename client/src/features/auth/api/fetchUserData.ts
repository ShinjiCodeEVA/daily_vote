import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../lib/axios"; 

const handleFetchUserData = async () => {
    const response = await axios.get('/api/auth/user', {
    });

    return response.data;
}

export const fetchUserData = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => handleFetchUserData(),
        select: (data) => data.data,
        enabled: false
    })
}