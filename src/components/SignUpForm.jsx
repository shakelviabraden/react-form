
import React from "react"
import { useState } from "react"


export function SignUp({token, setToken}) {
{/*we are creating our state here so that we could use its values throughout our app and in children functions such as HandleSubmit*/}

  /* stannie's notes- we're actually creating this state so we can store the value that user inputs into the input fields

  imagine you didnt have a state- you'd just have an input field like this

  <input />

  when user presses the submit button, how would you get the value of that input? you cannot unless you store it in a state
  */
const [ formData, setFormData] = useState({
    username: '',
    password: ''
  })
const [ error, setError ] = useState(null)
const [ success, setSuccess ] = useState(null)


  //we need to update our state first before hitting submit because we are updating our state here
  // stannie's note: more specifically, whenever user types into the input field, we want to update the state to whatever the user typed in
  const handleInputChange = (e) => {
    //name and value are props from our input field (since we targeted it)
    //the value of the key {name} is 'username'
    //the value of the key {value} is the input from the text field.
    setSuccess(null)
    const { name, value } = e.target;
    
    setFormData({...formData, [name]: value})
    
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = {
        method: 'POST',
        body: JSON.stringify({formData})
    }

    try {
        const data = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', request)
        const response = await data.json()
        setSuccess(response.message)
        setToken(response.token)
    } catch (error) {
        setError(error.message)
    }
    
    setFormData({
        username: '',
        password: ''
      })
  }


  return (
    <>
    <h2>SignUp Form</h2>
    {error && <p>{error}</p>}
    {success && <p>{success}</p>}
      {/* stannie's note- a bit more specifically, INPUTS should always have the name, type and value. forms only need an onSubmit
      actually inputs dont *need* a type. if you dont specify a type, it defaults to 'text'
      */}
    {/*FORMS should always include name, type of input, value*/}
    <form onSubmit={handleSubmit}>
      {/*username field*/}
      <label>
        Name: <input
        type='text' 
        name='username'
        value={formData.username}
        onChange={handleInputChange}
        />
      </label>
      {/*for value, we are setting the VALUE of the formData.username as the user's input. Just doing this will not rerender and update the state.
      
      call onChange function using the event (which is the user's input)*/}

      {/*password field*/}
      <label>
        Password: <input 
        type='text' 
        name='password'
        value={formData.password}
        onChange={handleInputChange}
        />
      </label>

      {/*submit button*/}
      <button type="submit">Submit Form</button>
    </form>
    </>
  )
}

