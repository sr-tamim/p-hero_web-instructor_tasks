import { useState } from "react";

const useFoods = () => {
    const [foods, setFoods] = useState([
        { id: 1, foodName: 'Burger', foodPrice: 99 },
        { id: 2, foodName: 'Pizza', foodPrice: 149 }
    ])

    return { foods }
};

export default useFoods;