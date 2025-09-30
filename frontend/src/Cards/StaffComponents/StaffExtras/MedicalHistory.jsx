import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import axios from "axios";
import {PlusIcon} from "@heroicons/react/16/solid/index.js";
import PopUpForm from "./PopUpForm.jsx";
import AddVitalSigns from "./AddVitalSigns.jsx";
import UpdateVitalSigns from "./UpdateVitalSigns.jsx";

function MedicalHistory(){
    const [pupUp,setPopup] = useState(false)
    const {id} = useParams()
    const location = useLocation()
    const providerId = location.state?.providerId
    const patientName = location.state?.patientName
    const patientLastName = location.state?.patientLastName
    const [medicalRecords, setMedicalRecords] = useState([])
    const [medication,setMedication] = useState([])
    const [vitalSigns,setVitalSigns] = useState([])

    const [addVitalSigns,setAddVitalSigns] = useState(false)
    const [updateVitalSigns,setUpdateVitalSigns] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:3030/medicalRecords/${id}`)
            .then((res)=>{
                setMedicalRecords(res.data)
            })

        axios.get(`http://localhost:3030/medication/${id}`)
            .then((res)=>{
                setMedication(res.data)
            })

        axios.get(`http://localhost:3030/vitalSigns/${id}`)
            .then((res)=>{
                setVitalSigns(res.data)
            })
    }, []);

    return (
        <>
            {pupUp && <PopUpForm onClose={()=> setPopup(false)} StaffId={providerId} PatientId={id} />}
            {addVitalSigns && <AddVitalSigns onClose={() => setAddVitalSigns(false)} StaffId={providerId} PatientId={id}/>}
            {updateVitalSigns && <UpdateVitalSigns onClose={()=>setUpdateVitalSigns(false)} StaffId={providerId} PatientId={id} id={vitalSigns._id}/>}

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
                            <div key={i._id} className="rounded p-4 border m-5 border-blue-600 bg-white  hover:shadow-xl transition-all duration-250 ease-in-out">
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
                    <div className={"border m-5 p-5 rounded border-blue-700"}>
                        <div className={"bg-blue-300 rounded p-2 m-2"}>
                            <div className={"flex justify-between"}>
                            <h1 className={"text-blue-800 font-semibold text-lg pb-4"}>Latest Vital Signs</h1>

                                {vitalSigns.length === 0 ? (
                                <button className={"m-2 rounded-4xl font-semibold text-lg border-blue-600 bg-blue-400 border px-4 cursor-pointer text-blue-800 hover:bg-blue-200"}
                                onClick={()=>setAddVitalSigns(true)}>
                                    Add</button>
                                    ) : (
                                <button className={"m-2 rounded-4xl font-semibold text-lg border-blue-600 bg-blue-400 border px-4 cursor-pointer text-blue-800 hover:bg-blue-200"}
                                onClick={()=>setUpdateVitalSigns(true)}>
                                Update</button>
                                    )}

                            </div>
                            <div className={"bg-white p-2 rounded"}>
                                {vitalSigns && vitalSigns.map(i=>
                                    <div>
                                        <h1 className={"flex justify-between m-3"}><h1 className={"text-gray-500"}>Blood Pressure </h1>  <h1 className={"font-bold text-green-600"}>{i.bloodPressure}</h1></h1>
                                        <hr></hr>
                                        <h1 className={"flex justify-between m-3"}><h1 className={"text-gray-500"}>Heart Rate </h1> <h1 className={"font-bold text-green-600"}>{i.heartRate}</h1></h1>
                                        <hr></hr>
                                        <h1 className={"flex justify-between m-3"}><h1 className={"text-gray-500"}>Temperature </h1> <h1 className={"font-bold text-green-600"}>{i.temperature}</h1></h1>
                                        <hr></hr>
                                        <h1 className={"flex justify-between m-3"}><h1 className={"text-gray-500"}>Weight </h1> <h1 className={"font-bold text-green-600"}>{i.weight}</h1></h1>
                                        <hr></hr>
                                        <h1 className={"m-3 text-center text-xl"}>Last Updated : {dayjs(i.lastUpdated).format('MMMM D YYYY')}</h1>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={"bg-orange-300 rounded p-2 m-2"}>
                            <h1 className={"text-orange-800 font-semibold text-lg pb-4"}>Current Medication</h1>
                            {medication && medication.map(i=>
                            <div key={i._id} className={"bg-white p-4 rounded"}>
                                <div className={"flex justify-between mb-2"}>
                                    <h1 className={"text-xl font-semibold"}>{i.medicationName}</h1>
                                    <h1 className={"font-semibold border border-orange-500 rounded-4xl px-4 bg-orange-200 text-orange-700"}>{i.status}</h1>
                                </div>
                                <h1>Dr. {i.providerId.firstName} {i.providerId.lastName} {i.providerId.role}</h1>
                                <h1>Dosage : {i.dosage}</h1>
                                <h1>Frequency : {i.frequency}</h1>
                            </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}

export default MedicalHistory