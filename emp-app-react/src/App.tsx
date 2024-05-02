import { Route, Routes } from 'react-router-dom'
import './App.css'
import Employees from './components/Employees'
import Navbar from './components/Navbar'
import EmployeeDetails from "./components/EmployeeDetails";

function App() {
  return (
   <>
    <Navbar/>
    <Routes>        
      <Route path="/"  element={<Employees/>} />
      <Route path="/employees"  element={<Employees />}/>
      <Route path="/employees/add"  element={<EmployeeDetails  />}/>
      <Route path="/employees/edit/:id"  element={<EmployeeDetails  />}/>
    </Routes>
  </>
   
  );
}

export default App;
