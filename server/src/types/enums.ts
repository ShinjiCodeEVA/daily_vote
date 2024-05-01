
export enum AuthEndpoints {
    GET_ACCESS_TOKEN = "/token",
    GET_USER_DATA = "/user",
    GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token",
    GITHUB_USER_DATA_URL = "https://api.github.com/user"
}

export enum PollState {
    ACTIVE = "active",
    EXPIRED = "expired"
}