import './App.css';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import AddFood from './components/AddFood/AddFood';
import Navbar from './components/Navbar/Navbar';
import AllFoods from './components/AllFoods/AllFoods';
import { createContext } from 'react';
import useFoods from './hooks/useFoods';

export const FoodContext = createContext()

function App() {
  const { foods, setFoods } = useFoods()

  return (
    <BrowserRouter>
      <FoodContext.Provider value={{ foods, setFoods }}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="addfood" element={<AddFood />} />
            <Route path="allfoods" element={<AllFoods />} />
          </Routes>
        </div>
      </FoodContext.Provider>
    </BrowserRouter>
  );
}

export default App;
