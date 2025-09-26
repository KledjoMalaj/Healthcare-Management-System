import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import axios from "axios";

function MedicalHistory(){
    const {id} = useParams()
    const [medicalRecords, setMedicalRecords] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3030/medicalRecords/${id}`)
            .then((res)=>{
                setMedicalRecords(res.data)
            })
    }, []);

    console.log(medicalRecords)

    return (
        <>
            <div>

                <div className="flex justify-center bg-gradient-to-b from-blue-700 to-blue-900 rounded m-2 p-2">
                    <h1 className="text-white">Medical History</h1>
                </div>

                <div className="bg-gradient-to-b from-blue-700 to-blue-900 rounded m-2 p-2">
                {medicalRecords && medicalRecords.map(i=>
                    <div key={i._id} className="bg-white rounded p-4">
                        <div className="flex justify-between">
                            <h1 className="font-semibold text-xl">{dayjs(i.visitDate).format("MMMM D , YYYY")}</h1>
                            <h1 className="rounded-4xl px-5 py-1 bg-blue-200 text-blue-600 font-semibold">{i.visitType}</h1>
                        </div>
                        <h1>Provider : {i.providerId.firstName} {i.providerId.lastName} {i.providerId.role}</h1>
                        <h1>Symptoms : {i.symptoms}</h1>
                        <h1>Diagnosis : {i.diagnosis}</h1>
                        <h1>Notes : {i.notes}</h1>
                    </div>
                )}
                </div>
            </div>
        </>
    )

}

export default MedicalHistory