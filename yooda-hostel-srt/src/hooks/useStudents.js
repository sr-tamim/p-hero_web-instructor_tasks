import { useEffect, useState } from "react";

const useStudents = () => {
    const [students, setStudents] = useState([])

    const [pageInfo, setPageInfo] = useState({ pageNo: 1, totalPages: 1, itemsPerPage: 5 })

    useEffect(loadStudents, [pageInfo])
    function loadStudents() {
        const { pageNo, itemsPerPage } = pageInfo
        fetch(`https://yooda-hostel-srt.herokuapp.com/allstudents?pageNo=${pageNo}&items=${itemsPerPage}`)
            .then(res => res.json())
            .then(([data, pages]) => {
                setStudents(data)
                pageInfo.totalPages !== pages && setPageInfo({ ...pageInfo, totalPages: pages })
            })
    }

    function addStudent(form, studentInfo) {
        fetch('https://yooda-hostel-srt.herokuapp.com/addstudent', {
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
    function editStudent(studentInfo, history) {
        console.log(studentInfo)
        fetch('https://yooda-hostel-srt.herokuapp.com/editstudent', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentInfo)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    history('/allstudents')
                    loadStudents()
                }
            })
    }
    function deleteStudent(id) {
        fetch(`https://yooda-hostel-srt.herokuapp.com/students/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => data.deletedCount === 1 && loadStudents())
    }

    async function getStudentInfo(id) {
        const fetchData = await fetch(`https://yooda-hostel-srt.herokuapp.com/student/${id}`)
        const data = await fetchData.json()
        return data
    }

    return { students, pageInfo, setPageInfo, addStudent, editStudent, deleteStudent, getStudentInfo }
};

export default useStudents;