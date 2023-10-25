import { useEffect, useState } from 'react'

type useDebounseReturnType = [string, string, (s:string) => void]

export default function useDebounce(): useDebounseReturnType {
   const [value, setValue] = useState<string>('')
   const [delayed, setDelayed] = useState<string>('')
   
   function changeValue(text: string) {
      setValue(text)
   }

   useEffect(() => {
      const timer = setTimeout(() => {
       setDelayed(value)         
      }, 500)

      return () => clearTimeout(timer)
   }, [value])
   
   return [value, delayed, changeValue]
}
