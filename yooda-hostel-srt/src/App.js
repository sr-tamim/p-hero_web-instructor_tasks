import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddFood from './components/FoodComponents/AddFood';
import Navbar from './components/Navbar/Navbar';
import AllFoods from './components/FoodComponents/AllFoods';
import { createContext, useState } from 'react';
import useFoods from './hooks/useFoods';
import AddStudent from './components/StudentComponents/AddStudent';
import AllStudents from './components/StudentComponents/AllStudents';
import useStudents from './hooks/useStudents';
import DistributeFood from './components/DistributionComponents/DistributeFood';
import EditStudent from './components/StudentComponents/EditStudent';
import EditFoodItem from './components/FoodComponents/EditFoodItem';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import TaskDetails from './components/TaskDetails';

export const FoodContext = createContext()
export const StudentContext = createContext()

function App() {
  const [loadingStatus, setLoadingStatus] = useState(false)

  return (
    <BrowserRouter><StudentContext.Provider value={useStudents(setLoadingStatus)}>
      <FoodContext.Provider value={useFoods(setLoadingStatus)}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<TaskDetails />} />
            <Route path="addfood" element={<AddFood />} />
            <Route path="allfoods" element={<AllFoods />} />
            <Route path="editfood/:id" element={<EditFoodItem />} />
            <Route path="addstudent" element={<AddStudent />} />
            <Route path="editstudent/:id" element={<EditStudent />} />
            <Route path="allstudents" element={<AllStudents />} />
            <Route path="distributefood" element={<DistributeFood />} />
          </Routes>
          {loadingStatus && <LoadingIndicator />}
        </div>
      </FoodContext.Provider>
    </StudentContext.Provider></BrowserRouter>
  );
}

export default App;
