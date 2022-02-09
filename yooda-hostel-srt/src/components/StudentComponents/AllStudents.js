import React, { useState } from 'react';
import useStudentContext from './useStudentContext';

const AllStudents = () => {
    const { students, pageInfo, setPageInfo } = useStudentContext()

    const [bulkSelection, setBulkSelection] = useState([])

    function bulkAction(IDs) {
        const newSelections = IDs.filter(id => !bulkSelection.includes(id))
        newSelections.length && setBulkSelection([...bulkSelection, ...newSelections])
        newSelections.length || setBulkSelection(bulkSelection.filter(id => !IDs.includes(id)))
    }
    console.log(bulkSelection)

    return (
        <div>
            <h2 className='text-center mb-5'>Showing all students</h2>
            <div className='text-center d-flex justify-content-center'>{
                bulkSelection.length > 0 && <div>
                    {bulkSelection.length} items selected
                    <select className="form-select my-2">
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
                        onClick={() => bulkAction(students.map(d => d.id), true)}>
                        Select all</button>
                    <button className='btn btn-primary py-1 ms-1'
                        onClick={() => bulkAction(students.map(d => d.id), false)}>Deselect all</button>
                </div>
                <div className='d-flex align-items-center'>
                    items per page:
                    <input type="number" className='form-control py-1 ms-2' min={3}
                        defaultValue={pageInfo.itemsPerPage}
                        style={{ maxWidth: 'min-content', minWidth: '80px' }}
                        onChange={e => {
                            e.target.value > 2 && setPageInfo({
                                ...pageInfo, itemsPerPage: e.target.value
                            })
                            if (e.target.value < 3) { e.target.value = pageInfo.itemsPerPage }
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
                                        onChange={e => bulkAction([student.id])}
                                        type="checkbox"
                                        checked={bulkSelection.includes(student.id)} />
                                </td>
                                <td>{student.id}</td>
                                <td>{student.studentName}</td>
                                <td>{student.studentAge}</td>
                                <td>{student.studentClass}</td>
                                <td>{student.studentRoll}</td>
                                <td>{student.studentHallName}</td>
                                <td>
                                    <select className="form-select form-select-sm">
                                        <option value="active" selected={student.studentStatus === 'active'}>active</option>
                                        <option value="inActive" selected={student.studentStatus === 'inActive'}>inActive</option>
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