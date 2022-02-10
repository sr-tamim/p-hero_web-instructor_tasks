import { useEffect, useState } from "react";

const useFoods = (setLoadingStatus) => {
    const [foods, setFoods] = useState([])
    const [pageInfo, setPageInfo] = useState({ pageNo: 1, totalPages: 1, itemsPerPage: 5 })

    useEffect(loadFoods, [pageInfo, setLoadingStatus])
    function loadFoods() {
        setLoadingStatus(true)
        const { pageNo, itemsPerPage } = pageInfo
        fetch(`https://yooda-hostel-srt.herokuapp.com/allfoods?pageNo=${pageNo}&items=${itemsPerPage}`)
            .then(res => res.json())
            .then(([data, totalItems]) => {
                setFoods(data)
                const totalPages = Math.ceil(totalItems / itemsPerPage)
                if (pageInfo.totalItems !== totalItems || pageInfo.totalPages !== totalPages) {
                    setPageInfo({ ...pageInfo, totalPages, totalItems })
                }
                setLoadingStatus(false)
            })
    }

    function addFoodItem(form, itemInfo) {
        setLoadingStatus(true)
        fetch('https://yooda-hostel-srt.herokuapp.com/addfood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemInfo)
        }).then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    form.reset()
                    loadFoods()
                } else {
                    setLoadingStatus(false)
                }
            })
    }
    function editFood(studentInfo, history) {
        setLoadingStatus(true)
        fetch('https://yooda-hostel-srt.herokuapp.com/editfood', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentInfo)
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    history('/allfoods')
                    loadFoods()
                } else {
                    setLoadingStatus(false)
                }
            })
    }

    function deleteFoodItem(id) {
        setLoadingStatus(true)
        fetch(`https://yooda-hostel-srt.herokuapp.com/foods/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => data.deletedCount === 1 ? loadFoods() : setLoadingStatus(false))
    }

    async function getFoodInfo(id) {
        setLoadingStatus(true)
        const fetchData = await fetch(`https://yooda-hostel-srt.herokuapp.com/food/${id}`)
        const data = await fetchData.json()
        setLoadingStatus(false)
        return data
    }

    return { foods, addFoodItem, deleteFoodItem, pageInfo, setPageInfo, editFood, getFoodInfo }
};

export default useFoods;