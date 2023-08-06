import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { SliceCategories, userInfo } from '../../Feature_state/ecommerce_Slice';


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const location = useLocation()
    const storedata = useSelector((state) => state.app)


    const navigate = useNavigate()

    const handlesubmit = async (e) => {
        e.preventDefault()

        try {

            await axios.post('https://impossible-ray-headscarf.cyclic.app/auth/login', { email, password }).then((response) => {
                if (response.data.success) {

                    toast.success(response.data.message)
                    dispatch(userInfo(response.data))

                    localStorage.setItem('auth', JSON.stringify(response.data))

                    navigate(location.state || "/")
                }
            }).catch((error) => {
                toast.error(error.response.data.message)
            })


        } catch (error) {
            console.log(error)
            toast.error("something is wrong")
        }

    }
    useEffect(() => {
        if (storedata?.categories.length === 0) {
            let localcateg = localStorage.getItem('categ')
            localcateg = JSON.parse(localcateg)
            dispatch(SliceCategories(localcateg))
        }
    })
    return (
        <Layout title={"Sign In"}>
            <div className='form-container'>

                <form onSubmit={handlesubmit} >
                    <h1 className='title'>Login</h1>


                    <div className="mb-3">

                        <input type="email" className="form-control"
                            id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)}
                            value={email} placeholder='Email' required />

                    </div>

                    <div className="mb-3">

                        <input type="password" className="form-control"
                            id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}
                            value={password} placeholder='Password' required />
                    </div>




                    <button type="submit" className="btn btn-primary">Login</button>
                    <div className='mt-3'>
                        <button type="submit" className="btn btn-primary" onClick={() => navigate("/forgot-password")}>Forgot Password</button>
                    </div>
                </form>

            </div>
        </Layout>
    )
}

export default Login