import React, { useState } from 'react';
import useStudentContext from './useStudentContext';

const AllStudents = () => {
    const { students, pageInfo } = useStudentContext()

    const [bulkSelection, setBulkSelection] = useState([])

    function bulkAction(e, student) {
        e.target.checked && (bulkSelection.includes(student.id) || setBulkSelection([...bulkSelection, student.id]))
        e.target.checked || setBulkSelection(bulkSelection.filter(id => id !== student.id))
    }

    return (
        <div>
            <h2 className='text-center mb-5'>Showing all students</h2>
            <div className='d-flex justify-content-center'>
                <div>{
                    bulkSelection.length > 0 && <select class="form-select form-select-sm">
                        <option selected disabled>Change status</option>
                        <option value="active">active</option>
                        <option value="inActive">inActive</option>
                    </select>
                }</div>
            </div>
            <table class="container table table-striped mt-3 align-middle" style={{ maxWidth: '800px' }}>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">ID</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Class</th>
                        <th scope="col">Roll</th>
                        <th scope="col">Hall Name</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student, i) => <tr key={i}>
                            <td>
                                <input class="form-check-input" onChange={e => bulkAction(e, student)} type="checkbox" />
                            </td>
                            <td>{student.id}</td>
                            <td>{student.fullName}</td>
                            <td>{student.age}</td>
                            <td>{student.class}</td>
                            <td>{student.roll}</td>
                            <td>{student.hall}</td>
                            <td>
                                <select defaultValue={student.studentStatus} class="form-select form-select-sm">
                                    <option value="active">active</option>
                                    <option value="inActive">inActive</option>
                                </select>
                            </td>
                            <td className='text-end'>
                                <button className='btn btn-primary py-0 me-2'>Edit</button>
                                <button className='btn btn-primary py-0'>Delete</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <div>{pageInfo?.pageNo !== 0 &&
                <ul class="pagination justify-content-center my-5">
                    <li class={`page-item ${pageInfo.pageNo < 2 ? 'disabled' : ''}`}>
                        <span class="page-link" style={{ cursor: 'pointer' }}>Previous</span>
                    </li>
                    {
                        [...Array(pageInfo.totalPages)].map((v, i) => <li class="page-item" key={i}>
                            <span class={`page-link ${pageInfo.pageNo === i + 1 ?
                                'bg-primary text-white' : ''}`}
                                style={{ cursor: 'pointer' }}>{i + 1}</span>
                        </li>)
                    }
                    <li class={`page-item ${pageInfo.totalPages === pageInfo.pageNo ? 'disabled' : ''}`}>
                        <span class="page-link" style={{ cursor: 'pointer' }}>Next</span>
                    </li>
                </ul>
            }</div>
        </div>
    );
};

export default AllStudents;