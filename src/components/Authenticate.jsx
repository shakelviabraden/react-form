import { useState } from "react"


export const Authenticate = ({token}) => {
    const [error, setError] = useState(null)
    const [success, setSuccess ] = useState(null)

    const handleOnClick = async () => {
        const request = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        }

        try {
            const data = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', request)
            const response = await data.json()
            setSuccess(response.message)
        } catch (error) {
            setError(error.message)
        }
    }    

    return (
        <>
        <h1>Authenticate</h1>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <button onClick={handleOnClick}>Authenticate Token</button>
        </>
    )

}