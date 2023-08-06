import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../Form/CategoryForm'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { SliceCategories } from '../../../Feature_state/ecommerce_Slice'


const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedname, Setupdatedname] = useState("")
    const dispatch = useDispatch()


    const data = useSelector((state) => state.app)

    //handle Form

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("/categories/create-category", { name },
                {
                    headers: {

                        'Authorization': data.token
                    }
                }
            )
            if (response.data?.success) {
                toast.success("Category Created Scuccesfully")
                getAllCategories()
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Error in Form")
        }
    }

    const getAllCategories = async () => {
        try {
            const response = await axios("/categories/get-category")
            if (response.data.success) {
                setCategories(response.data.category)
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

    // Update Category
    const handleupdate = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`/categories/update-category/${selected._id}`, { name: updatedname },
                {
                    headers: {
                        "Authorization": data.token
                    }
                })
            if (response.data.success) {
                toast.success("updated successfully")
                setSelected(null)
                Setupdatedname("")
                setVisible(false)
                getAllCategories()

            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("something went wrong")
        }
    }

    // delete category


    const handledelete = async (id) => {
        try {
            const response = await axios.delete(`/categories/delete-category/${id}`,
                {
                    headers: {
                        "Authorization": data.token
                    }
                })
            if (response.data.success) {
                toast.success(response.data.message)

                getAllCategories()
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong! Could not delete the category")
        }
    }
    return (
        <Layout>
            <div className='conatiner-fluid m-3 p-3'>
                <div className='row'>

                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>

                    <div className='col-md-9'>
                        <h1>Manage Category</h1>

                        <div className="p-3 w-75">
                            <CategoryForm handlesubmit={handlesubmit} value={name} setValue={setName} />
                        </div>

                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>

                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((cat, i) => (
                                        <>
                                            <tr >
                                                <td key={i}>{cat.name}</td>
                                                <td>
                                                    <button className='btn btn-primary mx-2'
                                                        onClick={() => {
                                                            setVisible(true);
                                                            Setupdatedname(cat.name); setSelected(cat)
                                                        }}>Edit</button>
                                                    <button className='btn btn-danger' onClick={() => handledelete(cat._id)}>Delete</button>
                                                </td>

                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                        <CategoryForm value={updatedname} setValue={Setupdatedname} handlesubmit={handleupdate} />

                    </Modal>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory