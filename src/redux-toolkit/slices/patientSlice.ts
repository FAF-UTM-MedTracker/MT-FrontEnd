import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { ITreatment } from './treatmentSlice';


const backendURL = 'https://medtrackerapi.azurewebsites.net'

export const getPatients = createAsyncThunk(
    'Doctor/GetPatients',
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
            `${backendURL}/Doctor/GetPatients`,
            config
          )
          return data
          
  
      } catch (error: any) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

  export const getPatientTreatments = createAsyncThunk(
    'Doctor/GetPatientTreatments',
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
            `${backendURL}/Doctor/GetPatientTreatments`,
            config
          )
          return data
          
  
      } catch (error: any) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

interface IPatient
{
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    treatments: ITreatment[]
}

interface IPatientTreatment
{
    idPatient: number,
    idTreatment: number
}

interface PatientState
{
    patients: any,
    patientTreatments: IPatientTreatment[]
}


const initialState: PatientState ={
    patients: {},
    patientTreatments: []
}

const patientSlice = createSlice({
    name: 'patients',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getPatientTreatments.fulfilled, (state, action: PayloadAction<any>)=>{
                const newData = action.payload.map((element: any)=> {
                    return{
                        idPatient: element.idUser,
                        idTreatment: element.idTreatment
                    }
                })

                state.patientTreatments = newData
            })

            .addCase(getPatients.fulfilled, (state, action: PayloadAction<any>)=>{
                const newData = action.payload.map((element: any)=> {
                    return{
                        id: element.idUser,
                        info: {
                            firstName: element.firstName,
                            lastName: element.lastName,
                            phoneNumber: element.phoneNumber,
                            email: element.email,
                            treatments: []
                        }
                    }
                })
                let dictData = Object.assign({}, ...newData.map((x: any)=>({[x.id]:x.info})))
                
                state.patients = dictData
            })
    }
})

export const patientReducer = patientSlice.reducer