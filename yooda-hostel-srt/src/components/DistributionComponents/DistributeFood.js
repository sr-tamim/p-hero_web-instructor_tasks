import React, { useRef } from 'react';

const DistributeFood = () => {
    const formRefs = {
        studentRoll: useRef(),
        date: useRef(),
        shift: useRef(),
        served: useRef(),
        foodItem: useRef()
    }
    const formSubmit = e => {
        e.preventDefault()
        const formValues = {}
        for (const value in formRefs) {
            formValues[value] = value === 'served' ? true : formRefs[value].current.value
        }
        console.log(formValues)
    }

    return (
        <div>
            <h2 className='text-center mt-4 mb-5'>Distribute food to students</h2>

            <form className="w-100 mx-auto text-end" style={{ maxWidth: '500px' }}
                onSubmit={formSubmit}>
                <input type="number" ref={formRefs.studentRoll} min={1} className='form-control my-4' placeholder='Student Roll' required />
                <input type="text" ref={formRefs.foodItem} className='form-control my-4' placeholder='Food Name' required />
                <input type="text" ref={formRefs.date} className='form-control my-4' placeholder='Date'
                    onFocus={e => e.target.type = "date"} onBlur={e => e.target.value === '' && (e.target.type = "text")} required />
                <select className="form-select mb-3" ref={formRefs.shift} required>
                    <option selected hidden>Shift</option>
                    <option value="breakfast">breakfast</option>
                    <option value="lunch">lunch</option>
                    <option value="dinner">dinner</option>
                </select>
                <div class="form-check d-flex justify-content-center">
                    <input class="form-check-input" type="checkbox" ref={formRefs.served} value="" id="flexCheckDefault" required />
                    <label class="form-check-label ps-2" htmlFor="flexCheckDefault">
                        Served
                    </label>
                </div>
                <input type="submit" className="btn btn-success" value="Submit" />

            </form>
        </div>
    );
};

export default DistributeFood;