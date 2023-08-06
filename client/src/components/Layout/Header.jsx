import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { deleteuser, setCategories } from '../../Feature_state/ecommerce_Slice'
import { toast } from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import { Badge, Avatar } from 'antd'



const Header = () => {

    const dispatch = useDispatch()



    const handlelogout = () => {
        dispatch(deleteuser())
        localStorage.removeItem('auth')
        toast.success("Logout Successful")
    }
    const data = useSelector((state) => state.app)




    const storedata = useSelector((state) => state.app)
    const locallength = localStorage.getItem('cartlength')
    const clength = JSON.parse(locallength)


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" >
                            🛍️ Kart
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link ">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to={"/categories"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">

                                    {data.categories?.map((c, i) => (

                                        <li key={i}>
                                            <Link className="dropdown-item" to={`/category/${c.slug}`}>
                                                {c.name}
                                            </Link>


                                        </li>


                                    ))}
                                </ul>

                            </li>

                            {
                                !data.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link" href="#">
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link ">
                                            Login
                                        </NavLink>
                                    </li>
                                </>) : (<>

                                    <li className="nav-item dropdown  ">
                                        <NavLink className="nav-link dropdown-toggle  "
                                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {data.user.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to={`${data?.user?.role === 1 ? '/admin/dashboard' : '/dashboard'}`} className="dropdown-item" >Dashboard</NavLink></li>
                                            <li >
                                                <NavLink onClick={handlelogout} to="/login" className="dropdown-item ">
                                                    Logout
                                                </NavLink>
                                            </li>

                                        </ul>
                                    </li>

                                </>)
                            }
                            <li className="nav-item">

                                <Badge className='mt-1' count={clength} showZero>
                                    <NavLink to="/cart" className="nav-link  ">
                                        Cart
                                    </NavLink>
                                </Badge>

                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header