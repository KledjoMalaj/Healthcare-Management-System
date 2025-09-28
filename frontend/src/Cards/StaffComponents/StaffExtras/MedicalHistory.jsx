import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import axios from "axios";
import {PlusIcon} from "@heroicons/react/16/solid/index.js";
import PopUpForm from "./PopUpForm.jsx";

function MedicalHistory(){
    const [pupUp,setPopup] = useState(false)
    const {id} = useParams()
    const location = useLocation()
    const providerId = location.state?.providerId
    const patientName = location.state?.patientName
    const patientLastName = location.state?.patientLastName
    const [medicalRecords, setMedicalRecords] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3030/medicalRecords/${id}`)
            .then((res)=>{
                setMedicalRecords(res.data)
            })
    }, []);



    return (
        <>
            {pupUp && <PopUpForm onClose={()=>setPopup(false)} StaffId={providerId} PatientId={id} />}

            <div className="mt-2">
                <div className="Home-Component2 ">
                    <div className="flex justify-between">
                    <div>
                    {medicalRecords &&
                    <>
                        <h1 className="font-bold text-2xl"> {patientName} {patientLastName} - Medical Records</h1>
                        <h1 className="mt-2">Patient ID : {id}</h1>
                    </>
                    }
                    </div>
                    <button className="rounded-4xl px-5 bg-blue-800 cursor-pointer hover:bg-blue-500 hover:rounded-xl transition-all duration-250 ease-in-out"
                    onClick={()=>{setPopup(true)}} >
                        <PlusIcon className="h-6 w-6"/></button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 rounded m-2 p-2 bg-white">
                    <div>
                        {medicalRecords && medicalRecords.map(i=>
                            <div key={i._id} className="rounded p-4 border m-5 border-blue-600 bg-white hover:bg-gray-100 hover:shadow-2xl transition-all duration-250 ease-in-out">
                        <div className="flex justify-between">
                            <h1 className="font-semibold text-xl">{dayjs(i.visitDate).format("MMMM D , YYYY")}</h1>
                            <h1 className="rounded-4xl px-5 py-1 bg-blue-200 text-blue-600 font-semibold">{i.visitType}</h1>
                        </div>
                        <div className="flex gap-2 justify-center m-1">
                            <h1 className="font-semibold text-l" >{i.providerId.firstName} {i.providerId.lastName} - {i.providerId.role}</h1>
                        </div>
                        <div className="flex gap-2 bg-gray-200 rounded p-1 m-1">
                            <h1 className="font-semibold">Symptoms :</h1>
                            <h1> {i.symptoms}</h1>
                        </div>
                        <div className="flex gap-2 bg-gray-200 rounded p-1 m-1">
                            <h1 className="font-semibold">Diagnosis : </h1>
                            <h1>{i.diagnosis}</h1>
                        </div>
                        <div className="flex gap-2 bg-gray-200 rounded p-1 m-1">
                            <h1 className="font-semibold">Notes :</h1>
                            <h1> {i.notes}</h1>
                        </div>
                    </div>
                )}
                </div>
                    <div className={"border m-5 rounded border-blue-700 h-135"}>

                    </div>
                </div>
            </div>
        </>
    )

}

export default MedicalHistory