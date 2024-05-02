import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { listEmployeesAsync, EmployeeError } from "../state/employees/employeesSlice";
import { RootState } from "../state/store";

function Employees(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const employees = useSelector((state: RootState) => state.employees.employees);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    //fetch employees before component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                await dispatch<any>(listEmployeesAsync()).unwrap();
            } catch (error: any) {
                const employeeErrorMsg = error as EmployeeError;
                setErrorMessage(errorMessage);
            }
        };
        fetchEmployees();
    }, [dispatch]);

    const handleAddEmployee = () => {
        navigate("/employees/add");
    }

    const handleEditEmployee = (id:number|null) => {
        navigate(`/employees/edit/${id}`);
    }

    return (
        <div className="container mt-4">
            <h2>
                <span>Team Members</span>&nbsp;&nbsp;
                <button className="btn btn-primary" onClick={handleAddEmployee}>
                    +
                </button>
            </h2>
            <p>You have {employees.length} team members.</p>
            <ul className="list-group">
                {employees.map((employee, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{employee.firstName + " " + employee.lastName}</h5>
                            <p>{employee.email}</p>
                        </div>
                        <span className="badge bg-primary rounded-pill">{employee.phone}</span>
                        <div>
                            <button className="btn btn-warning" onClick={() => handleEditEmployee(employee.id)}>
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Error message */}
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
        </div>
    );
    
}
export default Employees;