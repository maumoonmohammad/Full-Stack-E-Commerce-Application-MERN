import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from './UserMenu'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { SliceCategories } from '../../Feature_state/ecommerce_Slice'

const UserOrders = () => {
    const [orders, setOrders] = useState([])
    const storedata = useSelector((state) => state.app)
    const dispatch = useDispatch()



    //get orders

    const getOrders = async () => {
        try {
            const response = await axios.get('https://impossible-ray-headscarf.cyclic.app/auth/orders', {
                headers: {
                    "Authorization": storedata?.token
                }
            })
            setOrders(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (storedata?.token) {
            getOrders()
        }
    }, [storedata?.token])


    useEffect(() => {
        if (storedata?.categories.length === 0) {
            let localcateg = localStorage.getItem('categ')
            localcateg = JSON.parse(localcateg)
            dispatch(SliceCategories(localcateg))
        }

    }, [])
    return (
        <Layout>
            <div className='m-3'>
                <div className="row">
                    <div className="col-md-2">
                        <UserMenu />
                    </div>
                    <div className="col-md-10 orders">

                        <h1 > All Orders</h1>
                        {orders?.map((o, i) => {
                            return (
                                <div className='border shadow mt-2' style={{ width: "70%" }} key={i}>
                                    <table className='table' >
                                        <thead>
                                            <tr>
                                                <th scope='col'>#</th>
                                                <th scope='col'>Status</th>
                                                <th scope='col'>Buyer</th>
                                                <th scope='col'>Date</th>
                                                <th scope='col'>Payment</th>
                                                <th scope='col'>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createdAt).fromNow()}</td>
                                                <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container ">
                                        {
                                            o?.products?.map((p, i) => (
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

                                                    </div>
                                                </div>
                                            ))}

                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default UserOrders