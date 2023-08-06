import React from 'react'

const CategoryForm = ({ handlesubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">

                    <input type="text" className="form-control" placeholder='Enter New Category'
                        value={value} onChange={(e) => setValue(e.target.value)} />

                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default CategoryForm