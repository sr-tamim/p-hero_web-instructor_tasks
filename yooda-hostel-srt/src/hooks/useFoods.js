import { useEffect, useState } from "react";

const useFoods = () => {
    const [foods, setFoods] = useState([])
    const [pageInfo, setPageInfo] = useState({ pageNo: 1, totalPages: 1, itemsPerPage: 5 })

    useEffect(loadFoods, [pageInfo])
    function loadFoods() {
        const { pageNo, itemsPerPage } = pageInfo
        fetch(`https://yooda-hostel-srt.herokuapp.com/allfoods?pageNo=${pageNo}&items=${itemsPerPage}`)
            .then(res => res.json())
            .then(([data, pages]) => {
                setFoods(data)
                pageInfo.totalPages !== pages && setPageInfo({ ...pageInfo, totalPages: pages })
            })
    }

    function addFoodItem(form, itemInfo) {
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
                }
            })
    }
    function editFood(studentInfo, history) {
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
                }
            })
    }

    function deleteFoodItem(id) {
        fetch(`https://yooda-hostel-srt.herokuapp.com/foods/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => data.deletedCount === 1 && loadFoods())
    }

    async function getFoodInfo(id) {
        const fetchData = await fetch(`https://yooda-hostel-srt.herokuapp.com/food/${id}`)
        const data = await fetchData.json()
        return data
    }

    return { foods, addFoodItem, deleteFoodItem, pageInfo, setPageInfo, editFood, getFoodInfo }
};

export default useFoods;