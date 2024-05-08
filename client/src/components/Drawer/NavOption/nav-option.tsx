import { Button } from "../../Elements"
import { Icon } from "../../Elements"
import { CiSettings } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { MdLockOpen } from "react-icons/md";
import { NavOptionProp } from "./nav-option.interface";

export const NavOption = ({...rest}: NavOptionProp) => {
  return (
    <div
    className={`border border-gray-300 py-4 px-3  min-w-[200px] w-[250px]`}
    {...rest}>
        <Button
        className="flex justify-between w-full py-2 px-3  text-sm hover:bg-gray-300">
            <span>Profile</span>
            <Icon>
                <CiSettings />
            </Icon>
        </Button>
        <Button
        className="flex justify-between w-full py-2 px-3  text-sm hover:bg-gray-300">
            <span>Create</span>
            <Icon>
                <GoPlus />
            </Icon>
        </Button>
        <Button
        className="flex justify-between w-full p-3 px-3  text-sm hover:bg-gray-300 border-t border-t-gray-300">
            <span>Logout</span>
            <Icon>
                <MdLockOpen />
            </Icon>
        </Button>
    </div>
  )
}
