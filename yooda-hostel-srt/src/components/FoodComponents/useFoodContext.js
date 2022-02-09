import { useContext } from "react";
import { FoodContext } from "../../App";

const useFoodContext = () => {
    return useContext(FoodContext)
};

export default useFoodContext;