type ResponseType = {
    success: boolean,
    message: string,
    data?: any[] | any    
}

export const response = {
    onSuccess: (message: string, data?: any[] | any): ResponseType =>  ({success: true, message, data}),
    error: (message:string): ResponseType =>  ({success: false, message})
}