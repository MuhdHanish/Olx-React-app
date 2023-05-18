import { useState } from "react"

export const useForm =(intialState)=>{
 const [state,setState] = useState(intialState)
 const handleInput = (event) =>{
  setState({
   ...state,
   [event.target.name]:event.target.value
  })
 }
 return [state,handleInput]
}