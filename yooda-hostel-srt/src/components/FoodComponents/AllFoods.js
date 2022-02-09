import React from 'react';
import useFoodContext from './useFoodContext';

const AllFoods = () => {
    const { foods } = useFoodContext()

    return (
        <div>
            <h2 className='text-center mt-4 mb-5'>Showing all food items</h2>
            <table class="container table table-striped" style={{ maxWidth: '800px' }}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Food Name</th>
                        <th scope="col">Price</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        foods.map((food, i) => <tr key={i}>
                            <td>{food.id}</td>
                            <td>{food.foodName}</td>
                            <td>{food.foodPrice}</td>
                            <td className='text-end'>
                                <button className='btn btn-primary py-0 me-2'>Edit</button>
                                <button className='btn btn-primary py-0'>Delete</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllFoods;