import { IconProp } from "./icon.interface"

export const Icon = ({children, ...rest}: IconProp) => {
  return (
    <span
    className="text-xl"
    {...rest}>
        {children}
    </span>
  )
}
