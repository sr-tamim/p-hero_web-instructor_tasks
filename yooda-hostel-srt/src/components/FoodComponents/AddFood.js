import React, { useRef } from 'react';
import useFoodContext from './useFoodContext';

const AddFood = () => {
    const { addFoodItem } = useFoodContext()
    const formRefs = {
        foodName: useRef(),
        foodPrice: useRef()
    }
    const formSubmit = e => {
        e.preventDefault()
        const formValues = {}
        for (const value in formRefs) {
            formValues[value] = formRefs[value].current.value
        }
        addFoodItem(e.target, formValues)
    }
    return (
        <div>
            <h2 className='text-center mt-4 mb-5'>Add new food item</h2>
            <form className="w-100 mx-auto text-end" style={{ maxWidth: '500px' }}
                onSubmit={formSubmit}>
                <input type="text" ref={formRefs.foodName} className='form-control my-4' placeholder='Food Name' required />
                <input type="number" min={1} ref={formRefs.foodPrice} className='form-control my-4' placeholder='Food Price (BDT)' required />
                <input type="submit" className="btn btn-success" value="Add food item" />
            </form>
        </div>
    );
};

export default AddFood;