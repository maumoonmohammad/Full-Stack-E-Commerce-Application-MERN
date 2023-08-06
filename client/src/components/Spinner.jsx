import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Spinner = ({ path = "login" }) => {
    const [timer, setTimer] = useState(1)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const id = setInterval(() => {
            setTimer((prevvalue) => --prevvalue)
        }, 1000)

        timer === 0 && navigate(`/${path}`, {
            state: location.pathname
        })
        return () => clearInterval(id)

    }, [timer, navigate, location, path])
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
                <h1 className='text-center'>Unauthorized User-Redirecting to login page in {timer} </h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner