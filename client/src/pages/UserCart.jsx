import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { SliceCategories, addfromlocal, deletecart, deletecartitem, userInfo } from '../Feature_state/ecommerce_Slice'
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-hot-toast';




const UserCart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("")
    const [loading, setLoading] = useState(false)


    const data = useSelector((state) => state.app)
    const cart = useSelector((state) => state.app.usercart)

    useEffect(() => {

        const data = localStorage.getItem("auth")
        if (data) {

            const parseddata = JSON.parse(data)
            dispatch(userInfo(parseddata))
        }
    }, [])

    const handleremove = (pid) => {


        dispatch(deletecartitem(pid))

    }

    useEffect(() => {
        const local = localStorage.getItem('cart')

        dispatch(addfromlocal(JSON.parse(local)))

    }, [])

    //Total Price

    const totalPrice = () => {
        try {
            let total = 0
            data?.usercart?.map((item) => { total = item.price + total })
            return total
        } catch (error) {
            console.log(error)
        }
    }

    // get payment gateway token

    const geTtoken = async () => {
        try {


            const response = await axios.get('https://impossible-ray-headscarf.cyclic.app/products/braintree/token')
            setClientToken(response?.data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        geTtoken()
    }, [data?.token])


    ///handle payment
    const handlepayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod()
            const { response } = await axios.post("https://impossible-ray-headscarf.cyclic.app/products/braintree/payment", {
                nonce, cart
            }, {
                headers: {
                    "Authorization": data?.token
                }
            })
            setLoading(false)
            localStorage.removeItem('cart')
            dispatch(deletecart([]))
            navigate('/dashboard/orders')
            toast.success('Payment done')

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {

        if (data?.categories.length === 0) {

            let localcateg = localStorage.getItem('categ')
            localcateg = JSON.parse(localcateg)
            dispatch(SliceCategories(localcateg))
        }
    }, [])

    return (
        <Layout title={'Cart'}>

            <div className='container'>
                <div className='row'>
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`Hello ${data?.token && data?.user?.name}`}
                        </h1>
                        <h4 className='text-center mt-3'>
                            {data?.usercart?.length > 0 ? `You Have ${data.usercart.length} items in your cart 
                        ${data?.token ? "" : "Please login to checkout"}` : "your cart is empty"}

                        </h4>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-8">
                        {
                            data?.usercart?.map((p, i) => (
                                <div className="row mb-2 p-3 card flex-row" key={i}>
                                    <div className="col-md-4">
                                        <img
                                            src={`https://impossible-ray-headscarf.cyclic.app/products/product-photo/${p._id}`}
                                            className="card-img-top" alt={p.name} width="100px" height="100px" />
                                    </div>
                                    <div className="col-md-8">
                                        <p>{p.name}</p>
                                        <p>{p.description}</p>
                                        <p>Price: ${p.price}</p>
                                        <button className='btn btn-danger' onClick={() => handleremove(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))}

                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total: $ {totalPrice()}</h4>
                        {data?.user?.address ? (
                            <>
                                <div >
                                    <h5 className='mb-3'>Current Address: {data?.user?.address}</h5>
                                    <button className='btn btn-warning'
                                        onClick={() => navigate('/dashboard/profile')}>
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div>
                                {data?.token ? (
                                    <button
                                        className='btn btn-warning'
                                        onClick={() => navigate('/dashboard/profile')}>
                                        Add Address
                                    </button>
                                ) : (
                                    <div>
                                        <button
                                            className='btn btn-primary'
                                            onClick={() => navigate('/login', {
                                                state: '/cart'
                                            })}>
                                            Please Login to Checkout
                                        </button>

                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-2">
                            {
                                data?.user === null || !clientToken || !data?.usercart.length ? (
                                    ""
                                ) : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault',
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />
                                        <button className='btn btn-primary'
                                            onClick={handlepayment}
                                        >
                                            Make Payment
                                        </button>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>

        </Layout >

    )
}

export default UserCart