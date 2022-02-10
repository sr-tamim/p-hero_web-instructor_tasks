import { useEffect, useState } from "react";

const useStudents = (setLoadingStatus) => {
    const [students, setStudents] = useState([])

    const [pageInfo, setPageInfo] = useState({ pageNo: 1, totalPages: 1, itemsPerPage: 5 })

    useEffect(loadStudents, [pageInfo])
    function loadStudents() {
        setLoadingStatus(true)
        const { pageNo, itemsPerPage } = pageInfo
        fetch(`https://yooda-hostel-srt.herokuapp.com/allstudents?pageNo=${pageNo}&items=${itemsPerPage}`)
            .then(res => res.json())
            .then(([data, pages]) => {
                setStudents(data)
                pageInfo.totalPages !== pages && setPageInfo({ ...pageInfo, totalPages: pages })
                setLoadingStatus(false)
            })
    }

    function addStudent(form, studentInfo) {
        setLoadingStatus(true)
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
                } else {
                    setLoadingStatus(false)
                }
            })
    }
    function editStudent(studentInfo, history) {
        setLoadingStatus(true)
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
                    history && history('/allstudents')
                    loadStudents()
                } else {
                    setLoadingStatus(false)
                }
            })
    }
    function deleteStudent(id) {
        setLoadingStatus(true)
        fetch(`https://yooda-hostel-srt.herokuapp.com/students/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => data.deletedCount === 1 ? loadStudents() : setLoadingStatus(false))
    }

    async function getStudentInfo(id) {
        setLoadingStatus(true)
        const fetchData = await fetch(`https://yooda-hostel-srt.herokuapp.com/student/${id}`)
        const data = await fetchData.json()
        setLoadingStatus(false)
        return data
    }

    return { students, pageInfo, setPageInfo, addStudent, editStudent, deleteStudent, getStudentInfo }
};

export default useStudents;