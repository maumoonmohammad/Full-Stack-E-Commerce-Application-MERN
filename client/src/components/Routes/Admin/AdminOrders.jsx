import React, { useEffect, useState } from 'react'
import AdminMenu from '../../Layout/AdminMenu'
import Layout from '../../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import { Select } from 'antd'
import { SliceCategories } from '../../../Feature_state/ecommerce_Slice'
const { Option } = Select

const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Processed", "Processing", "Shipped", "Delivered", "Canceled"])
    const [changestatus, setChangeStatus] = useState("")
    const [orders, setOrders] = useState([])
    const dispatch = useDispatch()
    const storedata = useSelector((state) => state.app)




    //get orders

    const getOrders = async () => {
        try {
            const response = await axios.get('https://impossible-ray-headscarf.cyclic.app/auth/all-orders', {
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
        if (storedata?.categories.length === 0) {
            let localcateg = localStorage.getItem('categ')
            localcateg = JSON.parse(localcateg)
            dispatch(SliceCategories(localcateg))
        }
    }, [storedata?.token])

    const handlechange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`https://impossible-ray-headscarf.cyclic.app/auth/order-status/${orderId}`, { status: value }, {
                headers: {
                    "Authorization": storedata?.token
                }
            })
            getOrders()
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <Layout title={'All Orders'}>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9 adminorders">
                            <h1 className='text-center'>All Orders</h1>

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
                                                    <td>
                                                        <Select bordered={false} onChange={(value) => handlechange(o._id, value)} defaultValue={o?.status}>
                                                            {
                                                                status?.map((s, i) => (
                                                                    <Option key={i} value={s}>{s}</Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </td>
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
            </Layout >
        </>
    )
}

export default AdminOrders