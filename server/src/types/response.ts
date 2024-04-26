type ResponseType = {
    success: boolean,
    message: string,
    data?: any[]    
}

export const response = {
    onSuccess: (message: string, data?: any[]): ResponseType =>  ({success: true, message, data}),
    error: (message:string): ResponseType =>  ({success: false, message})
}