import React from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {

    const data = useSelector((state) => state.app)
    return (
        <Layout>
            <div className='conatiner-fluid m-3 p-3'>
                <div className='row'>

                    <div className="col-md-3">
                        <AdminMenu />
                    </div>

                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                            <h3>{data?.user?.name}</h3>


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard