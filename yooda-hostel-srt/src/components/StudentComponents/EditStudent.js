import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStudentContext from './useStudentContext';

const EditStudent = () => {
    const { id } = useParams()
    const { editStudent, getStudentInfo } = useStudentContext()

    const [targetStudent, setTargetStudent] = useState({})
    getTargetStudent()
    async function getTargetStudent() {
        const data = await getStudentInfo(id)
        setTargetStudent(data)
    }

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
        const formValues = { id }
        for (const value in formRefs) {
            formValues[value] = formRefs[value].current.value
        }
        editStudent(formValues, e.target)
    }
    return (
        <div>
            <h2 className='text-center mt-4 mb-5'>Edit student</h2>
            <form className="w-100 mx-auto text-end" style={{ maxWidth: '500px' }}
                onSubmit={formSubmit}>
                <input type="text" className='form-control my-4'
                    ref={formRefs.studentName} defaultValue={targetStudent?.studentName}
                    placeholder='Full Name' required />
                <input type="number" className='form-control my-4'
                    ref={formRefs.studentAge} defaultValue={targetStudent?.studentAge}
                    min={5} placeholder='Age (years)' required />
                <input type="number" className='form-control my-4'
                    ref={formRefs.studentClass} defaultValue={targetStudent?.studentClass}
                    min={1} placeholder='Class' required />
                <input type="number" className='form-control my-4'
                    ref={formRefs.studentRoll} defaultValue={targetStudent?.studentRoll}
                    min={1} placeholder='Roll' required />
                <input type="text" className='form-control my-4'
                    ref={formRefs.studentHallName} defaultValue={targetStudent?.studentHallName}
                    placeholder='Hall Name' required />
                <select className="form-select mb-3"
                    ref={formRefs.studentStatus} required>
                    <option value="" hidden>Status</option>
                    <option value="active" selected={targetStudent?.studentStatus === 'active'}>active</option>
                    <option value="inActive" selected={targetStudent?.studentStatus === 'inActive'}>inActive</option>
                </select>
                <input type="submit" className="btn btn-success px-3 mt-4" value="Edit student" />
            </form>
        </div>
    );
};

export default EditStudent;