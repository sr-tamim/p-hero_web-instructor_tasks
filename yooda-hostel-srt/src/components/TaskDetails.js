import React from 'react';

const TaskDetails = () => {
    return (
        <div>
            <h1 className='text-center mt-4'>Welcome to <b>Yooda Hostel</b></h1>
            <h6 className='text-center text-muted mb-5'>Food distribution application</h6>
            <h3 className='text-center mt-5 mb-3'>Task Description</h3>
            <div className='container' style={{ maxWidth: '700px' }}>
                <p>
                    <b>Yooda Hostel</b> is a reputed hostel in Dhaka. They are facing some issues in planning and distributing
                    food to their students. You need to build an application to solve their issue. <br />
                    They have prepared
                    requirements for you -</p>

                <ol>
                    <li>
                        Admin can add food with price.Form will have - food name, cost price,after adding show it in a
                        table (backend pagination mandatory) , He can edit and delete each item.
                        FoodItem(id, name, price)
                    </li>
                    <li>
                        Admin can add new student , Form will contain -
                        full name, roll,age, class, hall name , status (“active”, “inActive”, )
                        Student(id, fullName, roll, age, class, hall, status)
                    </li>
                    <li>
                        Student table will have a checkbox in every row, and the admin can change status ( “inActive”,
                        “active”) by selecting multiple items from the table.(Bulk action by single button click).
                    </li>
                    <li>
                        There will be a student table (backend pagination mandatory), edit and delete items.
                    </li>
                    <li>
                        While serving food, create a distribution form where admin can search students by roll, select
                        “shift” from drop down, “Date”. Add food item they want to take, Then change the status to
                        “served” Distribution(id, studentId, date, shift,status, foodItemList)
                    </li>
                    <li>
                        If a student has been already serve in that shift on date, show a message - “Already served”
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default TaskDetails;