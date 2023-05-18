import { useState} from "react"

// const name = /^[a-zA-Z\s]+$/;
// const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const phone = /^\+?[1-9]\d{1,14}$/;
// const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


export const HandelState = (intialState) => {
 const [state, setState] = useState(intialState)
 const handleInput = (event) => {
  setState({
   ...state,
   [event.target.name]: event.target.value
  })
 }
 return [state, handleInput]
}

