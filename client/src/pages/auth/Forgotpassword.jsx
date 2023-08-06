import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Forgotpassword = () => {

    const [email, setEmail] = useState("")
    const [newpassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")




    const navigate = useNavigate()

    const handlesubmit = async (e) => {
        e.preventDefault()

        try {

            await axios.post('https://impossible-ray-headscarf.cyclic.app/auth/forgotpassword', { email, newpassword, answer }).then((response) => {
                if (response.data.success) {

                    toast.success(response.data.message)

                    navigate("/login")
                }
            }).catch((error) => {
                toast.error(error.response.data.message)
            })


        } catch (error) {
            console.log(error)
            toast.error("something is wrong")
        }

    }

    return (
        <Layout>
            <div className='form-container'>

                <form onSubmit={handlesubmit} >
                    <h1 className='title'>Reset Password</h1>


                    <div className="mb-3">

                        <input type="email" className="form-control"
                            id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)}
                            value={email} placeholder='Email' required />

                    </div>

                    <div className="mb-3">

                        <input type="text" className="form-control"
                            id="exampleInputEmail1" onChange={(e) => setAnswer(e.target.value)}
                            value={answer} placeholder='Enter your favourite sport' required />

                    </div>

                    <div className="mb-3">

                        <input type="password" className="form-control"
                            id="exampleInputPassword1" onChange={(e) => setNewPassword(e.target.value)}
                            value={newpassword} placeholder='Enter New Password' required />
                    </div>




                    <button type="submit" className="btn btn-primary mx-5">RESET</button>

                </form>

            </div>
        </Layout>
    )
}

export default Forgotpassword