import React, { useEffect } from 'react'
import { useState } from 'react'
import Spinner from '../../Spinner'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { userInfo } from '../../../Feature_state/ecommerce_Slice'



const AdminRoute = () => {
    const [ok, setOk] = useState(false)
    var data = useSelector((state) => state.app)
    const dispatch = useDispatch()




    useEffect(() => {
        const local_data = localStorage.getItem("auth")

        if (local_data) {

            const parseddata = JSON.parse(local_data)
            if (data?.user === null) {

                dispatch(userInfo(parseddata))
            }

        }



        const authCheck = async () => {

            const response = await axios.get('http://localhost:8080/auth/admin-auth', {
                headers: {
                    "Authorization": data.token
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


    return ok ? <Outlet /> : <Spinner path="" />
}



export default AdminRoute