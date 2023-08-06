import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SliceCategories } from '../../../Feature_state/ecommerce_Slice'
const { Option } = Select

const CreateProduct = () => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [photo, setPhoto] = useState("")
    const data = useSelector((state) => state.app)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // get all categories

    const getAllCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/categories/get-category")
            if (response.data.success) {
                setCategories(response.data?.category)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong while fetching the categories")
        }
    }

    useEffect(() => {
        getAllCategories()
        if (data?.categories.length === 0) {
            let localcateg = localStorage.getItem('categ')
            localcateg = JSON.parse(localcateg)
            dispatch(SliceCategories(localcateg))
        }
    }, [])

    //create product

    const handlecreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("category", category)
            const response = await axios.post("http://localhost:8080/products/create-product", productData,
                {
                    headers: {
                        "Authorization": data.token
                    }
                })
            if (response.data?.success) {
                toast.success("product created successfully")

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong! could not create product")
        }
    }

    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>

                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>

                    <div className='col-md-9'>
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                            <Select bordered={false} placeholder="Select a category"
                                size='large'
                                showSearch
                                className='form-select mb-3' onChange={(value) => { setCategory(value) }} required>
                                {categories?.map((cat) => (
                                    <Option key={cat._id} value={cat._id}>{cat.name}</Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "upload photo"}
                                    <input
                                        type='file'
                                        name="photo"
                                        accept='image/*'
                                        onChange={(e) => { setPhoto(e.target.files[0]) }}
                                        hidden>
                                    </input>
                                </label>
                            </div>
                            <div className="mb-3">
                                {
                                    photo && (
                                        <div className="text-center">
                                            <img
                                                src={URL.createObjectURL(photo)} //Photo preview
                                                alt='nothing here'
                                                height={"200px"}
                                                className='img img-responsive' />
                                        </div>
                                    )
                                }
                            </div>

                            <div className="mb-3">
                                <input type='text'
                                    value={name}
                                    placeholder='Name'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <textarea type='text'
                                    value={description}
                                    placeholder='Description'
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <input type='number'
                                    value={price}
                                    placeholder='Price'
                                    className='form-control'
                                    onChange={(e) => setPrice(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <input type='text'
                                    value={quantity}
                                    placeholder='Quantity'
                                    className='form-control'
                                    onChange={(e) => setQuantity(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping"
                                    size='large'
                                    className='form-select mb-3'
                                    onChange={(value) => { setShipping(value) }}>
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>

                                </Select>
                            </div>

                            <div className="mb-3">
                                <button className='btn btn-primary form-control' onClick={handlecreate}>CREATE PRODUCT</button>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct