import React, { useEffect, useRef, useState } from 'react';

const DistributeFood = () => {
    const [allFoods, setAllFoods] = useState([])
    const [allStudents, setAllStudents] = useState([])

    useEffect(() => {
        fetch('https://yooda-hostel-srt.herokuapp.com/allfoods').then(res => res.json())
            .then(data => data && setAllFoods(data))
        fetch('https://yooda-hostel-srt.herokuapp.com/allstudents').then(res => res.json())
            .then(data => data && setAllStudents(data))
    }, [])

    const formRefs = {
        studentRoll: useRef(),
        date: useRef(),
        shift: useRef(),
        served: useRef(),
        foodItem: useRef()
    }
    const formSubmit = e => {
        e.preventDefault()
        const allRolls = allStudents.map(student => student.studentRoll)
        const allFoodNames = allFoods.map(food => food.foodName)
        const formValues = {}
        for (const value in formRefs) {
            formValues[value] = formRefs[value].current.value
        }
        !allRolls.includes(formValues.studentRoll) ? alert('Student not found') :
            !allFoodNames.includes(formValues.foodItem) ? alert('Food not found') :
                fetch('https://yooda-hostel-srt.herokuapp.com/distribute/food', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(formValues)
                }).then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            e.target.reset()
                            alert('Added successfully')
                        } else if (data.error) {
                            e.target.reset()
                            alert(data.error)
                        }
                    })
    }

    return (
        <div>
            <h2 className='text-center mt-4 mb-5'>Distribute food to students</h2>
            <form className="w-100 mx-auto text-end" style={{ maxWidth: '500px' }}
                onSubmit={formSubmit}>
                <input type="number" ref={formRefs.studentRoll} list="rollOptions"
                    min={1} className='form-control my-4' placeholder='Student Roll' required />
                <datalist id="rollOptions">
                    {
                        allStudents.map((student, i) => <option value={student.studentRoll} key={i} />)
                    }
                </datalist>

                <input type="text" ref={formRefs.foodItem} list="foodOptions" className='form-control my-4' placeholder='Food Name' required />
                <datalist id="foodOptions">
                    {
                        allFoods.map((food, i) => <option value={food.foodName} key={i} />)
                    }
                </datalist>

                <input type="text" ref={formRefs.date} className='form-control my-4' placeholder='Date'
                    onFocus={e => e.target.type = "date"} onBlur={e => e.target.value === '' && (e.target.type = "text")} required />
                <select className="form-select mb-3" ref={formRefs.shift} required>
                    <option selected hidden>Shift</option>
                    <option value="breakfast">breakfast</option>
                    <option value="lunch">lunch</option>
                    <option value="dinner">dinner</option>
                </select>
                <div className="form-check d-flex justify-content-center">
                    <input className="form-check-input" type="checkbox" ref={formRefs.served} value="served" id="flexCheckDefault" required />
                    <label className="form-check-label ps-2" htmlFor="flexCheckDefault">
                        Served
                    </label>
                </div>
                <input type="submit" className="btn btn-success" value="Submit" />

            </form>
        </div>
    );
};

export default DistributeFood;