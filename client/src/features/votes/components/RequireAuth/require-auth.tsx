import { LoginBtn } from "../../../auth/components/LoginBtn/login-btn"

export const RequireAuth = () => {
  return (
    <div className="mt-6 text-white flex items-center justify-center border border-dashed p-10 h-[480px] max-h-[500px]">
        <div className="flex items-center justify-center flex-col gap-3">
            <h2 className="text-2xl font-bold">Login to Vote</h2>
            <LoginBtn 
                variant="btn-login-yellow"
                text="Login with Github"/>
        </div>
    </div>
  )
}
