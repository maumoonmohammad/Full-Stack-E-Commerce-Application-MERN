import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SliceCategories } from '../../Feature_state/ecommerce_Slice';


const Register = () => {
    const storedata = useSelector((state) => state.app)
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/auth/register', { name, email, password, phone, address, answer })
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/login")
            } else {
                toast.error(response.data.message)
            }
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
        <Layout title={'User Registration'}>
            <div className='form-container'>

                <form onSubmit={handlesubmit} >
                    <h1 className='title'>Register Now</h1>
                    <div className="mb-3">

                        <input type="text" className="form-control"
                            id="exampleInputEmail1" onChange={(e) => setName(e.target.value)}
                            value={name} placeholder='Name' required />

                    </div>

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

                    <div className="mb-3">

                        <input type="text" className="form-control"
                            id="exampleInputEmail1" onChange={(e) => setPhone(e.target.value)}
                            value={phone} placeholder='Phone Number' required />

                    </div>

                    <div className="mb-3">

                        <input type="text" className="form-control"
                            id="exampleInputEmail1" onChange={(e) => setAddress(e.target.value)}
                            value={address} placeholder='Address' required />

                    </div>

                    <div className="mb-3">

                        <input type="text" className="form-control"
                            id="exampleInputEmail1" onChange={(e) => setAnswer(e.target.value)}
                            value={answer} placeholder='What is your favourite sport' required />

                    </div>


                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register