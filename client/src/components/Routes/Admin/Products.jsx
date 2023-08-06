import toast from 'react-hot-toast'
import AdminMenu from '../../Layout/AdminMenu'
import Layout from '../../Layout/Layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SliceCategories } from '../../../Feature_state/ecommerce_Slice'

const Products = () => {
    const [products, setProducts] = useState([])
    const [photos, setphotos] = useState([])
    const storedata = useSelector((state) => state.app)
    const dispatch = useDispatch()

    //get All Products

    const getAllProducts = async () => {
        try {
            const response = await axios.get("/products/get-products")
            if (response.data.success) {
                setProducts(response.data.products)


            }

        } catch (error) {
            console.log(error)
            toast.error("something went Wrong! Could not fetch Products")
        }
    }



    useEffect(() => {
        getAllProducts()
        if (storedata?.categories.length === 0) {
            let localcateg = localStorage.getItem('categ')
            localcateg = JSON.parse(localcateg)
            dispatch(SliceCategories(localcateg))
        }

    }, [])


    return (
        <Layout>
            <div className="row m-3 p-3">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'>Products List</h1>
                    <div className="d-flex flex-wrap">

                        {products?.map((p) => (
                            <Link key={p._id} to={`/admin/dashboard/update-product/${p.slug}`} className='product-link'>
                                <div className="card m-3" style={{ width: "18rem", height: "80%" }}  >
                                    <img
                                        src={`/products/product-photo/${p._id}`}
                                        className="card-img-top"
                                        style={{ height: "70%" }} alt={p.name} />

                                    <div className="card-body">
                                        <h5 className="card-title text-center">{p.name}</h5>
                                        <p className="card-text">{p.decription}</p>


                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Products