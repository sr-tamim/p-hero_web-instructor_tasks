import { useEffect, useState } from "react";

const useFoods = () => {
    const [foods, setFoods] = useState([])

    useEffect(() => {
        const getFoods = [
            { id: 1, foodName: 'Burger', foodPrice: 99 },
            { id: 2, foodName: 'Pizza', foodPrice: 149 }
        ]
        setFoods(getFoods)
    }, [])

    return { foods }
};

export default useFoods;