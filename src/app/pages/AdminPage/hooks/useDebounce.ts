import React, {ChangeEvent} from "react";

export function useDebounce () {
    const typingRef = React.useRef(null) as any
    const [input,setInput] = React.useState<string>('')
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value




      if(typingRef.current){
        clearTimeout(typingRef.current)
      }

     typingRef.current = setTimeout(() => {

      setInput(value)
     }, 500);
    }
    return {handleChange,input}
}
