import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { SliceCategories, addcart, getcartLength, userInfo } from '../Feature_state/ecommerce_Slice'



const Homepage = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const storedata = useSelector((state) => state.app)

    //get total count

    const getTotal = async () => {
        try {
            const response = await axios.get('http://localhost:8080/products/product-count')
            if (response.data.success) {
                setTotal(response.data?.total)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const dispatch = useDispatch()

    // get all categories

    const getAllCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/categories/get-category")

            if (response.data.success) {
                setCategories(response.data?.category)
                dispatch(SliceCategories(response.data?.category))
                localStorage.setItem('categ', JSON.stringify(response.data?.category))
            }

        } catch (error) {
            console.log(error)

        }
    }

    /// get Products
    const getAllproducts = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:8080/products/product-list/${page}`)
            setLoading(false)
            if (response.data.success) {
                setProducts(response.data.products)

            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)

        }
    }

    // get filtered products
    const filterProducts = async () => {
        try {
            const response = await axios.post('http://localhost:8080/products/filter-products', { checked, radio })
            if (response.data.success) {
                setProducts(response.data?.products)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTotal()
        getAllCategories()
        const data = localStorage.getItem("auth")
        if (data) {

            const parseddata = JSON.parse(data)
            dispatch(userInfo(parseddata))
        }
    }, [])

    useEffect(() => {
        if (checked.length === 0 || !radio.length === 0) {
            getAllproducts()
        }
    }, [checked.length, radio.length])

    useEffect(() => {
        if (checked.length || radio.length) filterProducts()
    }, [checked, radio])


    //filter by categorty
    const handlefilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter((c) => c !== id)
        }
        setChecked(all)
    }

    const handleload = (e) => {
        e.preventDefault()
        setPage(page + 1)
    }

    //load-more
    const loadMore = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:8080/products/product-list/${page}`)
            setLoading(false)
            if (response.data.success) {
                setProducts([...products, ...response.data?.products])
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])


    const handlecart = (product) => {
        dispatch(addcart(product))
        localStorage.setItem('cart', JSON.stringify([...storedata.usercart, product]))
        localStorage.setItem('cartlength', JSON.stringify(storedata.usercart.length + 1))

    }

    return (
        <Layout title={'HomePage -Best Offers'}>
            <div className='row mt-3'>

                <div className='col-md-3'>
                    <h4 className='text-center'>Filte By Category</h4>
                    {categories?.map((c, i) => (
                        <div className='d-flex flex-column ms-5' key={i}>
                            <Checkbox key={c._id} onChange={(e) => handlefilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        </div>
                    ))}

                    {/* Filter by Price */}
                    <h4 className='text-center mt-5'>Filte By Price</h4>
                    <div className='d-flex flex-column ms-5'>
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>

                                    <Radio value={p.array}>{p.name}</Radio>

                                </div>

                            ))}
                        </Radio.Group>
                        <div className='text-center'>
                            <button className='btn btn-primary mt-3 justify-center'
                                style={{ width: "40%" }}
                                onClick={() => window.location.reload()}>Clear Fliters</button>

                        </div>

                    </div>

                </div>

                <div className='col-md-9'>

                    <h1 className='text-center'>All Products</h1>


                    <div className='d-flex flex-wrap'>
                        {products?.map((p, i) => (

                            <div className="card m-3 p-2 homepagecard" style={{ width: "18rem" }} key={i} >
                                <img
                                    src={`http://localhost:8080/products/product-photo/${p._id}`}
                                    className="card-img-top" alt={p.name} style={{ height: "75%" }} />
                                <hr />
                                <div className="card-body">
                                    <div className='article'>
                                        <h5 className="card-title text-center">{p.name}</h5>
                                        <p className="card-text text-center" style={{ color: 'green' }} >${p.price}</p>
                                    </div>
                                    <p className="card-text ">{p.description}</p>
                                    <button className="btn btn-primary " onClick={() => handlecart(p)}>Add To Cart</button>
                                    <button
                                        className="btn btn-secondary mx-1"
                                        onClick={() => navigate(`/product-details/${p.slug}`)}>More Details</button>

                                </div>
                            </div>

                        ))}
                    </div>
                    <div className='m-2 p-3 text-center'>
                        {products && products.length < total && (
                            <button className='btn btn-warning' onClick={handleload}>
                                {loading ? "Loading...." : "Loadmore"}
                            </button>
                        )}

                    </div>
                </div>

            </div>



        </Layout>
    )
}

export default Homepage