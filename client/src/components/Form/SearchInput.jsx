import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setkeyword, setresults } from '../../Feature_state/ecommerce_Slice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchInput = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector((state) => state.app)


    const handlesubmit = async (e) => {
        try {

            e.preventDefault()

            const response = await axios.get(`/products/search/${search}`)
            if (response.data.success) {
                dispatch(setresults(response.data.products))
                navigate('/search')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form className="d-flex mx-4" role="search" onSubmit={handlesubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchInput