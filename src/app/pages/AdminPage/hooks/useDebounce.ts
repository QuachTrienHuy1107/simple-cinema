import React, {ChangeEvent} from "react";

export function useDebounce () {
    const typingRef = React.useRef(null) as any
    const [input,setInput] = React.useState('')
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      console.log('xxxx')

      if(typingRef.current){
        clearTimeout(typingRef.current)
      }

     typingRef.current = setTimeout(() => {
       console.log('zzzz')
      setInput(value)
     }, 500);
    }
    return {handleChange,input}
}
