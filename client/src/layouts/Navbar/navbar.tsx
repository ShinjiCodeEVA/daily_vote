import { Head } from "../../components/Elements/Head"
import { MdOutlineRocketLaunch } from "react-icons/md";
import { Icon } from "../../components/Elements";
import { LoginBtn } from "../../features/auth/components/LoginBtn/login-btn";

export const Navbar = () => {


  return (
    <header className="bg-black-400 text-white flex items-center justify-between pt-6 w-full">
        <Head 
            text="DailyVote"
            className="text-2xl font-bold flex items-center gap-2 ">
            <Icon>
                <MdOutlineRocketLaunch/>
            </Icon>
        </Head>
        
        <LoginBtn 
          variant="btn-login-dark"
          text="Login"/>
    </header>
  )
}
