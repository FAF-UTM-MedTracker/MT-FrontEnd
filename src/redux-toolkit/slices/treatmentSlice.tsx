import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { useAppSelector } from '../hooks/hooks';



const backendURL = 'https://medtrackerapi.azurewebsites.net'
// const { userToken } = useAppSelector(
//             (state) => state.auth
//         )
export const getTreatments = createAsyncThunk(
  'Doctor/GetTreatments',
  async (_, { rejectWithValue }) => {
    try {
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer token ' + localStorage.getItem('userToken')
            },
        }
        const { data } = await axios.get(
          `${backendURL}/Doctor/GetTreatments`,
          config
        )
        return data
        

    } catch (error: any) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export interface IMedication
{
    id: number,
    idTreatment: number,
    name: string,
    description: string,
    start: string,
    end: string,
    timeUse: string,
    quantity: number
}

export interface ITreatment
{
    id: number,
    name: string,
    start: string,
    end: string,
    note: string,
    meds: IMedication[]
}

interface TreatmentState
{
    loading: boolean;
    error: any;
    success: boolean;
    treatments:ITreatment[];
}


const initialState: TreatmentState = {
    loading: false,
    error: null,
    success: false,
    treatments:[]
}


const treatmentSlice = createSlice({
  name: 'treatments',
  initialState,
  reducers: {

  },
  extraReducers: (builder) =>  {
      builder
        .addCase(getTreatments.fulfilled, (state,action: PayloadAction<any>) =>{
          const newData = action.payload.map((element: any)=> {
            return{
                id: element.idTreatment,
                name: element.tName,
                start: element.start_Time,
                end: element.end_Time,
                note: element.note,
                meds: element.medications.map((med: any)=>{
                    return{
                        id: med.idMedication,
                        idTreatment: med.idTreatment,
                        name: med.pName,
                        description: med.mDescription,
                        start: med.start_Time,
                        end: med.end_Time,
                        timeUse: med.timeUse,
                        quantity: med.quantity,
                    }

                })
            }
        })
        console.log('extra reducer',newData)
        state.treatments = newData
    })
    .addCase(getTreatments.pending, (state,action: PayloadAction<any>) => {
        state.loading = true
        state.success = false
        state.error = null
        // console.log('bruh pending');
        
    })
    .addCase(getTreatments.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
        // console.log(state.error);
        
    })
  },
})
//   export const {logout} = treatmentSlice.actions
  export const treatmentReducer = treatmentSlice.reducer

