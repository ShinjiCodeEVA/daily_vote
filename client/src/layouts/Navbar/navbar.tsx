import { Head } from "../../components/Elements/Head"
import { MdOutlineRocketLaunch } from "react-icons/md";
import { Icon } from "../../components/Elements";
import { Button } from "../../components/Elements";

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
        
        <Button 
            variant="btn-login-dark"
            icon={true}>
            Login
        </Button>
    </header>
  )
}
