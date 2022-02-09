import { useContext } from "react";
import { StudentContext } from "../../App";

const useStudentContext = () => {
    return useContext(StudentContext)
};

export default useStudentContext;