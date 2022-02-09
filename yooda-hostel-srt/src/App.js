import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddFood from './components/FoodComponents/AddFood';
import Navbar from './components/Navbar/Navbar';
import AllFoods from './components/FoodComponents/AllFoods';
import { createContext } from 'react';
import useFoods from './hooks/useFoods';
import AddStudent from './components/StudentComponents/AddStudent';
import AllStudents from './components/StudentComponents/AllStudents';
import useStudents from './hooks/useStudents';

export const FoodContext = createContext()
export const StudentContext = createContext()

function App() {
  return (
    <BrowserRouter><StudentContext.Provider value={useStudents()}>
      <FoodContext.Provider value={useFoods()}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="addfood" element={<AddFood />} />
            <Route path="allfoods" element={<AllFoods />} />
            <Route path="addstudent" element={<AddStudent />} />
            <Route path="allstudents" element={<AllStudents />} />
          </Routes>
        </div>
      </FoodContext.Provider>
    </StudentContext.Provider></BrowserRouter>
  );
}

export default App;
