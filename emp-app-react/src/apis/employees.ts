import { baseURL } from "./constants";

export interface Employee{
    id?: number | null;
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    role: 'admin' | 'regular'
}

export const listEmployees = (): Promise<Employee[]> => {
    return fetch(baseURL + "employees/")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data as Employee[]);
}

export const getEmployeeById = (id: number): Promise<Employee> => {
    return fetch(baseURL + "employees/" + id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data as Employee);
};


export const addEmployee = (newEmployee: Employee): Promise<Employee> => {
    return fetch(baseURL + "employees/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => data as Employee);
};

export const saveEmployee = (employee: Employee): Promise<Employee> => {
    return fetch(baseURL + "employees/" + employee.id + "/", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => data as Employee);
};

export const deleteEmployee = (id: number|undefined): Promise<void> => {
    return fetch(baseURL + "employees/" + id + "/", {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete employee');
        }
    });
};