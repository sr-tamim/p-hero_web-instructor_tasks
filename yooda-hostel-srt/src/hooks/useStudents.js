import { useEffect, useState } from "react";

const useStudents = () => {
    const [students, setStudents] = useState([])
    const [pageInfo, setPageInfo] = useState({ pageNo: 1, totalPages: 1 })

    useEffect(() => {
        const getStudents = [
            { id: 1, fullName: 'Rahim', age: 15, class: 10, roll: 22, hall: 'nasiruddin', studentStatus: 'active' },
            { id: 2, fullName: 'Karim', age: 13, class: 9, roll: 15, hall: 'nasiruddin', studentStatus: 'inActive' }
        ]
        setStudents(getStudents)
    }, [])

    return { students, pageInfo }
};

export default useStudents;