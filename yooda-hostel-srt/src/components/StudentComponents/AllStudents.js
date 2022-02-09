import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useStudentContext from './useStudentContext';

const AllStudents = () => {
    const { students, pageInfo, setPageInfo, editStudent, deleteStudent } = useStudentContext()

    const [bulkSelection, setBulkSelection] = useState([])

    function bulkAction(students, select = true) {
        const newSelections = students.filter(student => !bulkSelection.find(d => d.id === student.id))
        select && setBulkSelection([...bulkSelection, ...newSelections])
        select || setBulkSelection(bulkSelection.filter(student => !students.find(d => d.id === student.id)))
    }

    return (
        <div>
            <h2 className='text-center mb-5 mt-4'>Showing all students</h2>
            <div className='text-center d-flex justify-content-center'>{
                bulkSelection.length > 0 && <div>
                    {bulkSelection.length} items selected
                    <select className="form-select my-2" onChange={e => {
                        bulkSelection.forEach(student => editStudent({ ...student, studentStatus: e.target.value }))
                    }}>
                        <option value="" hidden>Change status</option>
                        <option value="active">active</option>
                        <option value="inActive">inActive</option>
                    </select>
                </div>
            }</div>
            <div className='container d-flex flex-column flex-sm-row  justify-content-sm-between align-items-center align-items-sm-end mt-3'
                style={{ maxWidth: '750px' }}>
                <div className='py-3 py-sm-0'>
                    <button className='btn btn-primary py-1'
                        onClick={() => bulkAction(students)}>
                        Select all</button>
                    <button className='btn btn-primary py-1 ms-1'
                        onClick={() => bulkAction(students, false)}>Deselect all</button>
                </div>
                <div className='d-flex align-items-center'>
                    items per page:
                    <input type="number" className='form-control py-1 ms-2' min={3}
                        max={pageInfo.totalPages * pageInfo.itemsPerPage}
                        defaultValue={pageInfo.itemsPerPage}
                        style={{ maxWidth: 'min-content', minWidth: '80px' }}
                        onChange={e => {
                            if (e.target.value < 3) {
                                e.target.value = pageInfo.itemsPerPage
                            }
                            else if (e.target.value > pageInfo.totalPages * pageInfo.itemsPerPage) {
                                e.target.value = pageInfo.totalPages * pageInfo.itemsPerPage
                            } else {
                                setPageInfo({ ...pageInfo, itemsPerPage: e.target.value })
                            }
                        }} />
                </div>
            </div>
            <div className='table-responsive'>
                <table className="container table table-striped w-100 mt-1 align-middle" style={{ maxWidth: '800px', minWidth: '700px' }}>
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
                    <tbody className='text-capitalize'>
                        {
                            students.map((student, i) => <tr key={i}>
                                <td>
                                    <input className="form-check-input"
                                        onChange={e => bulkAction([student], e.target.checked)}
                                        type="checkbox"
                                        checked={!!bulkSelection.find(d => d.id === student.id)} />
                                </td>
                                <td>{student.id}</td>
                                <td>{student.studentName}</td>
                                <td>{student.studentAge}</td>
                                <td>{student.studentClass}</td>
                                <td>{student.studentRoll}</td>
                                <td>{student.studentHallName}</td>
                                <td>
                                    <select className="form-select form-select-sm" onChange={e => {
                                        editStudent({
                                            ...student, studentStatus: e.target.value
                                        })
                                    }}>
                                        <option value="active" selected={student.studentStatus === 'active'}>active</option>
                                        <option value="inActive" selected={student.studentStatus === 'inActive'}>inActive</option>
                                    </select>
                                </td>
                                <td className='text-end'>
                                    <Link to={`/editstudent/${student.id}`}>
                                        <button className='btn btn-primary py-0 me-2'>Edit
                                        </button></Link>
                                    <button className='btn btn-primary py-0'
                                        onClick={() => deleteStudent(student.id)}>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div>{pageInfo?.pageNo !== 0 &&
                <ul className="pagination justify-content-center my-5">
                    <li className={`page-item ${pageInfo.pageNo < 2 ? 'disabled' : ''}`}>
                        <span className="page-link" style={{ cursor: 'pointer' }}
                            onClick={() => setPageInfo({
                                ...pageInfo, pageNo: pageInfo.pageNo - 1
                            })}>Previous</span>
                    </li>
                    {
                        [...Array(pageInfo.totalPages)].map((v, i) => <li className="page-item" key={i}>
                            <span className={`page-link ${pageInfo.pageNo === i + 1 ?
                                'bg-primary text-white' : ''}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setPageInfo({
                                    ...pageInfo, pageNo: i + 1
                                })}>{i + 1}</span>
                        </li>)
                    }
                    <li className={`page-item ${pageInfo.totalPages === pageInfo.pageNo ? 'disabled' : ''}`}>
                        <span className="page-link" style={{ cursor: 'pointer' }}
                            onClick={() => setPageInfo({
                                ...pageInfo, pageNo: pageInfo.pageNo + 1
                            })}>Next</span>
                    </li>
                </ul>
            }</div>
        </div>
    );
};

export default AllStudents;