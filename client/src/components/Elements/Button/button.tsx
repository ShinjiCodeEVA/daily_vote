import { ButtonProp } from "./"
import { Icon } from "../Icon"
import clsx from "clsx"
import { FaGithub } from "react-icons/fa";

/**
 *  <Button variant="btn-login-yellow" icon={true}>
            Login with Github
    </Button>
 */

export const Button = ({children, icon, variant, ...rest}: ButtonProp) => {

  const merge = clsx('btn-default', variant);

  return (
    <button
    className={merge}
    {...rest}>
        {icon && 
         <Icon>
          <FaGithub/>
         </Icon>
        }
        {children}
    </button>
  )
}
