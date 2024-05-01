import { UserType } from "../../../common/types"
import { axios } from "../../../lib/axios"
import { useMutation } from "@tanstack/react-query";

const handleExist = async (user: UserType) => await axios.get(`/api/user?username=${user.username}`);

const handleInsert = async (user: UserType) => await axios.post(`/api/user`, user)

export const insertUser = (callback: any) => {
    return useMutation({
        mutationFn: async (user: UserType) =>  await handleExist(user),
        onSuccess: (user) => callback(user),
        onError: (user: UserType) => handleInsert(user),
    })
}


