import React, { useRef } from 'react';
import useStudentContext from './useStudentContext';

const AddStudent = () => {
    const { addStudent } = useStudentContext()

    const formRefs = {
        studentName: useRef(),
        studentAge: useRef(),
        studentClass: useRef(),
        studentRoll: useRef(),
        studentHallName: useRef(),
        studentStatus: useRef(),
    }
    const formSubmit = e => {
        e.preventDefault()
        const formValues = {}
        for (const value in formRefs) {
            formValues[value] = formRefs[value].current.value
        }
        addStudent(e.target, formValues)
    }
    return (
        <div>
            <h2 className='text-center mt-4 mb-5'>Add new student</h2>
            <form className="w-100 mx-auto text-end" style={{ maxWidth: '500px' }}
                onSubmit={formSubmit}>
                <input type="text" className='form-control my-4' ref={formRefs.studentName} placeholder='Full Name' required />
                <input type="number" className='form-control my-4' ref={formRefs.studentAge} min={5} placeholder='Age (years)' required />
                <input type="number" className='form-control my-4' ref={formRefs.studentClass} min={1} placeholder='Class' required />
                <input type="number" className='form-control my-4' ref={formRefs.studentRoll} min={1} placeholder='Roll' required />
                <input type="text" className='form-control my-4' ref={formRefs.studentHallName} placeholder='Hall Name' required />
                <select className="form-select mb-3" ref={formRefs.studentStatus} required>
                    <option value="" hidden>Status</option>
                    <option value="active">active</option>
                    <option value="inActive">inActive</option>
                </select>
                <input type="submit" className="btn btn-success px-3 mt-4" value="Add new student" />
            </form>
        </div>
    );
};

export default AddStudent;