import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from './UserMenu'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { updatedUser } from '../../Feature_state/ecommerce_Slice'


const UserProfile = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const data = useSelector((state) => state.app)
    const dispatch = useDispatch()

    //handle form
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            debugger
            const response = await axios.put('/auth/profile', { name, email, password, phone, address }, {
                headers: {
                    "Authorization": data?.token
                }
            })
            if (response?.data?.success) {
                dispatch(updatedUser(response?.data?.updatedUser))

                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = response?.data.updatedUser
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success("profile updated successfully")
            } else {
                toast.error(response?.data?.error)
            }

        } catch (error) {
            console.log(error)
            toast.error("something is wrong")
        }

    }
    useEffect(() => {

        const { name, email, phone, address } = data?.user
        setAddress(address)
        setName(name)
        setEmail(email)
        setPhone(phone)

    }, [data?.user])
    return (
        <Layout>
            {/* <div className='container fluid m-1 p-3'> */}
            <div className=' m-3'>
                <div className="row">
                    <div className="col-md-2">
                        <UserMenu />
                    </div>
                    <div className="col-md-10 ">
                        <div className='form-container'>

                            <form onSubmit={handlesubmit} >
                                <h1 className='title'>User Profile</h1>
                                <div className="mb-3">

                                    <input type="text" className="form-control"
                                        id="exampleInputEmail1" onChange={(e) => setName(e.target.value)}
                                        value={name} placeholder='Name' />

                                </div>

                                <div className="mb-3">

                                    <input type="email" className="form-control"
                                        id="exampleInputEmail1" disabled onChange={(e) => setEmail(e.target.value)}
                                        value={email} placeholder='Email' />

                                </div>

                                <div className="mb-3">

                                    <input type="password" className="form-control"
                                        id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}
                                        value={password} placeholder='Password' />
                                </div>

                                <div className="mb-3">

                                    <input type="text" className="form-control"
                                        id="exampleInputEmail1" onChange={(e) => setPhone(e.target.value)}
                                        value={phone} placeholder='Phone Number' />

                                </div>

                                <div className="mb-3">

                                    <input type="text" className="form-control"
                                        id="exampleInputEmail1" onChange={(e) => setAddress(e.target.value)}
                                        value={address} placeholder='Address' required />

                                </div>




                                <button type="submit" className="btn btn-primary">UPDATE</button>
                            </form>

                        </div>


                    </div>
                </div>
            </div>
            {/* </div> */}
        </Layout>
    )
}

export default UserProfile