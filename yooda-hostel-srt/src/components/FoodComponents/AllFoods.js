import React from 'react';
import { Link } from 'react-router-dom';
import useFoodContext from './useFoodContext';

const AllFoods = () => {
    const { foods, deleteFoodItem, pageInfo, setPageInfo } = useFoodContext()

    return (
        <div>
            <h2 className='text-center mt-4 mb-5'>Showing all food items</h2>

            <div className='container d-flex flex-column flex-sm-row justify-content-center align-items-center my-3'>
                <div className='d-flex align-items-center'>
                    items per page:
                    <input type="number" className='form-control py-1 ms-2' min={3}
                        max={pageInfo.totalPages * pageInfo.itemsPerPage}
                        defaultValue={pageInfo.itemsPerPage}
                        style={{ maxWidth: 'min-content', minWidth: '80px' }}
                        onKeyUp={e => e.key === 'Enter' && e.target.blur()}
                        onBlur={e => {
                            e.target.value = e.target.value < 3 ? 3 :
                                e.target.value > pageInfo.totalItems ? pageInfo.totalItems :
                                    e.target.value

                            setPageInfo({ ...pageInfo, itemsPerPage: e.target.value })
                        }} />
                </div>
            </div>
            <div className='table-responsive'>
                <table className="container table table-striped w-100"
                    style={{ maxWidth: '800px', minWidth: '400px' }}>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Food Name</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className='text-capitalize'>
                        {
                            foods.map((food, i) => <tr key={i}>
                                <td>{food.id}</td>
                                <td>{food.foodName}</td>
                                <td>{food.foodPrice} taka</td>
                                <td className='text-end'>
                                    <Link to={`/editfood/${food.id}`}>
                                        <button className='btn btn-primary py-0 me-2'>Edit
                                        </button></Link>
                                    <button className='btn btn-primary py-0'
                                        onClick={() => deleteFoodItem(food.id)}>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className='mx-auto' style={{ maxWidth: '800px' }}>
                Showing {foods.length} items of {pageInfo?.totalItems}
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

export default AllFoods;