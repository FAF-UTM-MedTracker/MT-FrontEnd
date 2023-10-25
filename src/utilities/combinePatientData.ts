import { useAppSelector } from '../redux-toolkit/hooks/hooks';

export const combinePatientData = () =>{

    const {patients, patientTreatments} = useAppSelector(
        (state) => state.patients
    )

    const {treatments} = useAppSelector(
        (state) => state.treatments
    )

    let temp = patients

    for(let i=0; i<patientTreatments.length; i++)
    {
        temp[patientTreatments[i].idPatient].treatments.push(patientTreatments[i].idTreatment)
    }

    for(let key in patients)
    {
        for(let j=0;j< patientTreatments.length;j++)
        {
            for(let i=0;i< treatments.length;i++)
            {
                if(patientTreatments[j].idTreatment == treatments[i].id && (patientTreatments[j].idPatient=Number(key)))
                {
                    temp[patientTreatments[j].idPatient].treatments.push(treatments[i])
                }
            }
        }
    }

    console.log(temp);

    return temp;
}