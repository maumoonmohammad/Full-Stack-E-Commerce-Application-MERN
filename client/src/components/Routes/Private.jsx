import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner'
import { useDispatch } from 'react-redux'
import { userInfo } from '../../Feature_state/ecommerce_Slice'

const PrivateRoute = () => {
    const dispatch = useDispatch()
    const [ok, setOk] = useState(false)

    const data = useSelector((state) => state.app)





    useEffect(() => {



        const local_data = localStorage.getItem("auth")

        if (local_data) {

            const parseddata = JSON.parse(local_data)
            if (data?.user === null) {

                dispatch(userInfo(parseddata))
            }

        }



        const authCheck = async () => {

            const response = await axios.get('http://localhost:8080/auth/user-auth', {
                headers: {
                    "Authorization": data?.token
                }
            })
            if (response.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }
        if (data?.token) authCheck()
    }, [data?.token])


    return ok ? <Outlet /> : <Spinner />
}

export default PrivateRoute