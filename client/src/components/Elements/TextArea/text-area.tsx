import { TextAreaProp } from "./text-area.interface";
import { ChangeEvent, useCallback } from "react"

export const TextArea = ({value, placeholder, handleInputChange, ...rest}: TextAreaProp) => {
  
  const handleChange = useCallback((e:ChangeEvent<HTMLTextAreaElement>) => { 
    const { value } = e.target;
    handleInputChange(value); 
  }, [])

  return (
    <textarea 
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      className="w-full h-28 border outline-yellow-400 py-2 px-3 placeholder:gray-400 text-sm rounded-md border-gray-300 bg-transparent"
      {...rest} 
    />
  )
}
