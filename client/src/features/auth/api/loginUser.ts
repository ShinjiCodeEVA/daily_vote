import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../lib/axios";

const handleUserLogin = async (code: string) => {
    const response = await axios.get(`/api/auth/token?code=${code}`);
    return response.data;
}

export const userLogin = (callback: React.Dispatch<React.SetStateAction<string>>) => { 
    return useMutation({
        mutationFn: (code: string) => handleUserLogin(code),
        onSuccess: (data) => callback(data.data.access_token)
    })
}