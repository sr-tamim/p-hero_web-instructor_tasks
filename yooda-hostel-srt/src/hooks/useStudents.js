import { useEffect, useState } from "react";

const useStudents = () => {
    const [students, setStudents] = useState([
        { id: 1, fullName: 'Rahim', age: 15, class: 10, roll: 22, hall: 'nasiruddin', studentStatus: 'active' },
        { id: 2, fullName: 'Karim', age: 13, class: 9, roll: 15, hall: 'nasiruddin', studentStatus: 'inActive' }
    ])

    const [pageInfo, setPageInfo] = useState({ pageNo: 1, totalPages: 1, itemsPerPage: 5 })

    useEffect(loadStudents, [pageInfo])
    function loadStudents() {
        const { pageNo, itemsPerPage } = pageInfo
        fetch(`http://localhost:5000/allstudents?pageNo=${pageNo}&items=${itemsPerPage}`)
            .then(res => res.json())
            .then(([data, pages]) => {
                setStudents(data)
                pageInfo.totalPages !== pages && setPageInfo({ ...pageInfo, totalPages: pages })
            })
    }
    console.log(pageInfo)

    function addStudent(form, studentInfo) {
        fetch('http://localhost:5000/addstudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentInfo)
        }).then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    form.reset()
                    loadStudents()
                }
            })
    }

    return { students, pageInfo, setPageInfo, addStudent }
};

export default useStudents;