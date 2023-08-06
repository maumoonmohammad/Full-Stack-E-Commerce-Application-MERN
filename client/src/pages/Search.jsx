import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSelector } from 'react-redux'

const Search = () => {
    const data = useSelector((state) => state.app)
    console.log(data.results)
    return (
        <Layout title={'search results'}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    Found: {data.results.length}

                    <div className='d-flex flex-wrap mt-4'>
                        {data?.results.map((p) => (

                            <div className="card m-3" style={{ width: "18rem" }}  >
                                <img
                                    src={`https://impossible-ray-headscarf.cyclic.app/products/product-photo/${p._id}`}
                                    className="card-img-top" alt={p.name} style={{ height: "75%" }} />

                                <div className="card-body">
                                    <h5 className="card-title text-center">{p.name}</h5>
                                    <p className="card-text text-center">{p.description}</p>
                                    <p className="card-text text-center">${p.price}</p>
                                    <button href="#" class="btn btn-primary ">Add To Cart</button>
                                    <button href="#" class="btn btn-secondary mx-2">More Details</button>

                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search