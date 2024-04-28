import { InputFieldProp } from "./input-field.interface"
import { ChangeEvent, useCallback } from "react"

export const InputField = ({value, placeholder, handleInputChange, ...rest}: InputFieldProp) => {
  
  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>) => { 
    const { value } = e.target;
    handleInputChange(value); 
  }, [])

  return (
    <input 
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      className="w-full outline-yellow-400 py-2 px-3 placeholder:gray-400 text-sm rounded-md border border-gray-300 bg-transparent"
      {...rest} 
    />
  )
}
