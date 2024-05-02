import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {Employee, listEmployees, addEmployee, getEmployeeById, saveEmployee} from '../../apis/employees';

export interface  EmployeeError{
    msg: string
}

const initialEmployeeState: {
    employees: Employee[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
    response: {}
} = {
    employees: [],
    status: 'idle',
    error: null,
    response: {}
};

export const listEmployeesAsync = createAsyncThunk(
    'employees/list',
    async (_, thunkAPI) => {
        try {
            const response = await listEmployees();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ msg: 'Failed to fetch employees.' });
        }
    }
);

export const addEmployeesAsync = createAsyncThunk(
    'employees/add',
    async (newEmployee: Employee, thunkAPI) => {
        try {
            const response = await addEmployee(newEmployee);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue((error as EmployeeError).msg);
        }
    }
);

export const saveEmployeesAsync = createAsyncThunk(
    'employees/save',
    (employee: Employee, thunkAPI) => {
      return saveEmployee(employee)
        .catch((error) => {
          return thunkAPI.rejectWithValue({ msg: 'Failed to save employee.' } as EmployeeError);
        });
    }
  );

export const getEmployeeByIdAsync = createAsyncThunk(
    'employees/edit',
    async (id: number, thunkAPI) => {
        try {
            const response = await getEmployeeById(id);
            return response || {};
        } catch (error) {
            return thunkAPI.rejectWithValue((error as EmployeeError).msg);
        }
    }
);

const employeeSlice = createSlice({
    name: "employee",
    initialState: initialEmployeeState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //list employee cases
            builder
            .addCase(listEmployeesAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(listEmployeesAsync.fulfilled, (state, action) => {
                state.employees = action.payload;
                state.status = 'idle';
                state.error = null;
            })
            .addCase(listEmployeesAsync.rejected, (state, action) => {
                const payload = action.payload as EmployeeError
                state.status = 'failed';
                state.error = payload.msg;
            })//add employee cases
            .addCase(addEmployeesAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addEmployeesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = null;
                // Create a new array with the new employee added
                state.employees = [...state.employees, action.payload]; 
            })            
            .addCase(addEmployeesAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })// save employee cases
            .addCase(saveEmployeesAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(saveEmployeesAsync.fulfilled, (state) => {
                state.status = 'idle';
                state.error = null;
              })
              .addCase(saveEmployeesAsync.rejected, (state, action) => {
                const payload = action.payload as EmployeeError
                state.status = 'failed';
                state.error = payload.msg;
              });
    }
});

export default employeeSlice.reducer;

