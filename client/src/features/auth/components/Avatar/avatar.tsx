import { AvatarProp } from "./avatar.interface"

export const Avatar = ({avatar_url, ...rest}: AvatarProp) => {
  return (
    <img 
        src={avatar_url}
        alt="profile"
        {...rest} />
  )
}
