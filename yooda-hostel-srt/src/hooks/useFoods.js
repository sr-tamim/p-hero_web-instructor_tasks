import { useEffect, useState } from "react";

const useFoods = () => {
    const [foods, setFoods] = useState([])

    useEffect(loadFoods, [])
    function loadFoods() {
        fetch('http://localhost:5000/allfoods')
            .then(res => res.json())
            .then(data => setFoods(data))
    }

    function addFoodItem(form, itemInfo) {
        fetch('http://localhost:5000/addfood', {
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

    function deleteFoodItem(id) {
        fetch(`http://localhost:5000/foods/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => data.deletedCount === 1 && loadFoods())
    }

    return { foods, addFoodItem, deleteFoodItem }
};

export default useFoods;