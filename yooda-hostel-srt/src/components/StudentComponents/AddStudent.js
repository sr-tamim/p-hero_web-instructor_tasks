import React from 'react';

const AddStudent = () => {
    const formSubmit = e => {
        e.preventDefault()
    }
    return (
        <div>
            <h2 className='text-center mt-4 mb-5'>Add new student</h2>
            <form className="w-100 mx-auto text-end" style={{ maxWidth: '500px' }}
                onSubmit={formSubmit}>
                <input type="text" className='form-control my-4' placeholder='Full Name' required />
                <input type="number" className='form-control my-4' min={5} placeholder='Age (years)' required />
                <input type="number" className='form-control my-4' min={1} placeholder='Class' required />
                <input type="number" className='form-control my-4' min={1} placeholder='Roll' required />
                <input type="text" className='form-control my-4' placeholder='Hall Name' required />
                <select className="form-select mb-3" required>
                    <option selected disabled>Status</option>
                    <option value="active">active</option>
                    <option value="inActive">inActive</option>
                </select>
                <input type="submit" className="btn btn-success px-3 mt-4" value="Add new student" />
            </form>
        </div>
    );
};

export default AddStudent;