import axios from 'axios'
import Layout from '../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addcart } from '../Feature_state/ecommerce_Slice'

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const dispatch = useDispatch()
    const storedata = useSelector((state) => state.app)

    //get similar products

    const getSimilarProducts = async (pid, cid) => {
        try {
            const resposne = await axios.get(`http://localhost:8080/products/related-products/${pid}/${cid}`)
            if (resposne?.data?.success) {
                setRelatedProducts(resposne.data.products)
            } else {
                console.log(resposne.data.message)
            }
        } catch (error) {

        }
    }


    //initila load

    useEffect(() => {
        if (params?.slug) {
            getProduct()
        }
    }, [params?.slug])

    //get products

    const getProduct = async () => {
        try {

            const resposne = await axios.get(`http://localhost:8080/products/single-product/${params.slug}`)
            setProduct(resposne?.data?.product)

            getSimilarProducts(resposne?.data.product._id, resposne?.data.product.category._id) //calling similar products with id's
        } catch (error) {
            console.log(error)
        }
    }

    const handlecart = (product) => {
        dispatch(addcart(product))
        localStorage.setItem('cart', JSON.stringify([...storedata.usercart, product]))
        localStorage.setItem('cartlength', JSON.stringify(storedata.usercart.length + 1))


    }
    return (
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img
                        src={`http://localhost:8080/products/product-photo/${product._id}`}
                        className="card-img-top"
                        height="500"
                        alt={product.name} />
                </div>
                <div className="col-md-6">
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name: {product.name}</h6>
                    <h6>Description: {product.description}</h6>
                    <h6>Price: ${product.price}</h6>
                    <h6>Category: {product.category?.name}</h6>
                    <button class="btn btn-primary " onClick={() => handlecart(product)}>Add To Cart</button>


                </div>
            </div>
            <div className="row">
                {relatedProducts.length === 0 && <p className='text center'>No similar Products Found</p>}
                <h1 className='text-center'>Similar Products</h1>

                <div className='d-flex flex-wrap'>
                    {relatedProducts?.map((p) => (

                        <div className="card m-3" style={{ width: "18rem" }}  >
                            <img
                                src={`http://localhost:8080/products/product-photo/${p._id}`}
                                className="card-img-top" alt={p.name} style={{ height: "75%" }} />

                            <div className="card-body">
                                <h5 className="card-title text-center">{p.name}</h5>
                                <p className="card-text text-center">{p.description}</p>
                                <p className="card-text text-center">${p.price}</p>
                                <div className='text-center'>
                                    <button class="btn btn-primary" onClick={() => handlecart(p)}>Add To Cart</button>

                                </div>


                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails