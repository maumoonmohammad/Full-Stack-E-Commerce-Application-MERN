import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import { useDispatch, useSelector } from 'react-redux'
import { SliceCategories } from '../../../Feature_state/ecommerce_Slice'

const Users = () => {
    const dispatch = useDispatch()
    const storedata = useSelector((state) => state.app)

    useEffect(() => {
        if (storedata?.categories.length === 0) {
            let localcateg = localStorage.getItem('categ')
            localcateg = JSON.parse(localcateg)
            dispatch(SliceCategories(localcateg))
        }
    }, [])
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>

                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>

                    <div className='col-md-9'>
                        All Users
                    </div>

                </div>

            </div>
        </Layout>
    )
}

export default Users