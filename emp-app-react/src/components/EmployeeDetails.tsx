import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addEmployeesAsync, getEmployeeByIdAsync, saveEmployeesAsync } from "../state/employees/employeesSlice";
import { Employee, deleteEmployee } from "../apis/employees";
import { AppDispatch } from "../state/store";

interface EmployeeParams {
  id?: string;
}

function EmployeeDetails() {
  const urlParams: EmployeeParams = useParams();
  const { id } = urlParams;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [employeeDetails, setEmployeeDetails] = useState<Employee>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    role: "regular", // Default role is regular
  });

  
  // fetch an employee with id
  useEffect(() => {
    if (id) {
        const empId = parseInt(id);
        dispatch(getEmployeeByIdAsync(empId))
        .unwrap()
        .then((emp) => setEmployeeDetails(emp))
        .catch((error) => console.error("Error editing employee:", error));
    }
  }, [id, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const { name, value } = e.target;
    setEmployeeDetails(
      (prevDetails: Employee | undefined) =>
        ({
          ...(prevDetails || {}),
          [name]: value,
        } as Employee)
    ); 
  };

  const handleDeleteEmployee = () => {
    deleteEmployee(id)
        .then(() => navigate("/employees"))
        .catch(() => {
            setErrorMessage("Failed to delete employee. If you switched the role from Admin to Regular then first save the employee and then you can delete.");
        })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (employeeDetails) {
      if (id) {
        dispatch(saveEmployeesAsync(employeeDetails))
          .unwrap()
          .then(() => navigate("/employees")) // Redirect after addition
          .catch((error) => setErrorMessage("Error updating employee:" + error.message));
      } else {
        dispatch(addEmployeesAsync(employeeDetails))
          .unwrap()
          .then(() => navigate("/employees")) // Redirect after addition
          .catch((error) => setErrorMessage("Error adding employee:" + error.message));
      }
    } else {
        setErrorMessage("Incomplete employee details.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Employee" : "Add New Employee"}</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">
            First Name<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={employeeDetails?.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">
            Last Name<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={employeeDetails?.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">
            Phone<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={employeeDetails?.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email<span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={employeeDetails?.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="regularCheckbox"
              name="role"
              value="regular"
              checked={employeeDetails?.role === 'regular'}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="regularCheckbox">
              Regular - Can't delete members
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="adminCheckbox"
              name="role"
              value="admin"
              checked={employeeDetails?.role === 'admin'}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="adminCheckbox">
              Admin - Can delete members
            </label>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
            <div className="alert alert-danger" role="alert">
            {errorMessage}
            </div>
        )}

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            {id ? "Save Employee" : "Add Employee"}
          </button>&nbsp;&nbsp;
          {id &&  
             <button type="button" disabled={employeeDetails.role === 'admin'} className="btn btn-danger" onClick={handleDeleteEmployee}>
                Delete
            </button>}
        </div>
      </form>
    </div>
  );
}

export default EmployeeDetails;
