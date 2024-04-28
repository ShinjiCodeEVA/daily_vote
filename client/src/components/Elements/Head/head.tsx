import { HeadProp } from "./head.interface"
import clsx, { ClassValue } from "clsx"

export const Head = ({className, children, text, ...rest}: HeadProp) => {

  const merge = clsx('gap-2 text-white', className as ClassValue);

  return (
    <div 
    className={merge}
    {...rest}>
        <p>{text}</p>
        {children}
    </div>
  )
}
