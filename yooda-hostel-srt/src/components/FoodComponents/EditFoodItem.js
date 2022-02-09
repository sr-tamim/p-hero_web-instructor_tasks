import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFoodContext from './useFoodContext';

const EditFoodItem = () => {
    const { editFood, getFoodInfo } = useFoodContext()
    const { id } = useParams()
    const history = useNavigate()

    const [targetFood, setTargetFood] = useState({})
    getTargetFood()
    async function getTargetFood() {
        const data = await getFoodInfo(id)
        setTargetFood(data)
    }

    const formRefs = {
        foodName: useRef(),
        foodPrice: useRef()
    }
    const formSubmit = e => {
        e.preventDefault()
        const formValues = { id: parseInt(id) }
        for (const value in formRefs) {
            formValues[value] = formRefs[value].current.value
        }
        editFood(formValues, history)
    }
    return (
        <div>
            <h2 className='text-center mt-4 mb-5'>Edit food item</h2>
            <form className="w-100 mx-auto text-end" style={{ maxWidth: '500px' }}
                onSubmit={formSubmit}>
                <input type="text" defaultValue={targetFood?.foodName}
                    ref={formRefs.foodName} className='form-control my-4' placeholder='Food Name' required />
                <input type="number" min={1} defaultValue={targetFood?.foodPrice}
                    ref={formRefs.foodPrice} className='form-control my-4' placeholder='Food Price (BDT)' required />
                <input type="submit" className="btn btn-success" value="Edit food item" />
            </form>
        </div>
    );
};

export default EditFoodItem;