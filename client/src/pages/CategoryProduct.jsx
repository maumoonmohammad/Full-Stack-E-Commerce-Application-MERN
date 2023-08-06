import axios from 'axios'
import Layout from '../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const params = useParams()
    const getProductbyCat = async () => {
        try {
            const response = await axios.get(`https://impossible-ray-headscarf.cyclic.app/products/product-category/${params.slug}`)
            if (response.data?.success) {
                setProducts(response.data?.products)
                setCategory(response.data?.category)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProductbyCat()
    }, [params?.slug])
    return (
        <Layout>
            <div className='container mt-3'>
                <h1 className='text-center'>Category-{category?.name}</h1>
                <h1 className='text-center'>{products?.length} results found</h1>
                <div className="row">
                    <div className='d-flex flex-wrap'>
                        {products?.map((p, i) => (

                            <div className="card m-3" style={{ width: "18rem" }} key={i} >
                                <img
                                    src={`https://impossible-ray-headscarf.cyclic.app/products/product-photo/${p._id}`}
                                    className="card-img-top" alt={p.name} style={{ height: "75%" }} />

                                <div className="card-body">
                                    <h5 className="card-title text-center">{p.name}</h5>
                                    <p className="card-text text-center">{p.description}</p>
                                    <p className="card-text text-center">${p.price}</p>
                                    <div className='text-center'>

                                        <button href="#" className="btn btn-primary ">Add To Cart</button>
                                    </div>


                                </div>
                            </div>

                        ))}
                    </div>
                </div>

            </div>

        </Layout>
    )
}

export default CategoryProduct