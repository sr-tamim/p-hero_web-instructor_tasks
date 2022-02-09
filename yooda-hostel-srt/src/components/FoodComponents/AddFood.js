import React from 'react';

const AddFood = () => {
    const formSubmit = e => {
        e.preventDefault()
    }
    return (
        <div>
            <h2 className='text-center mt-4 mb-5'>Add new food item</h2>
            <form className="w-100 mx-auto text-end" style={{ maxWidth: '500px' }}
                onSubmit={formSubmit}>
                <input type="text" className='form-control my-4' placeholder='Food Name' required />
                <input type="text" className='form-control my-4' placeholder='Food Price' required />
                <input type="submit" className="btn btn-success" value="Add food item" />
            </form>
        </div>
    );
};

export default AddFood;