import {XMarkIcon} from "@heroicons/react/16/solid/index.js";
import {useForm} from "react-hook-form";
import axios from "axios";

function PopUpForm({ onClose, StaffId , PatientId}) {
    const {register,
        handleSubmit,
        formState:{errors}
    } = useForm()

    const onSubmit = (data) => {
        const providerId = StaffId
        const patientId = PatientId
        const formData = {...data,providerId,patientId}

        axios.post(`http://localhost:3030/medicalRecords/add`, formData)
            .then((res)=>{
                onClose()
            })

    }

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-5 lg:w-110 sm:w-100 shadow-lg rounded">
                    <div className="flex justify-between">
                    <h1 className="text-xl">Add Medical Record</h1>
                    <button onClick={onClose}
                        className="cursor-pointer"><XMarkIcon className="h-9 w-9 text-blue-600 hover:text-blue-900"/>
                    </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className={"mt-5 border rounded p-3"}>
                        <div className={"flex justify-between"}>
                            <label>Visit Date : </label>
                            <input className="input-date" type="date"
                                   {...register("visitDate",{required:true})}
                            ></input>
                        </div><br></br>
                        <div className={"flex justify-between"}>
                            <label>Visit Type : </label>
                            <input className="input-login" type="text" placeholder="Enter Visit Type"
                                   {...register("visitType",{required:true})}
                            ></input>
                        </div><br></br>
                        <div className={"flex justify-between"}>
                            <label>Symptoms : </label>
                            <input className="input-login" type="text" placeholder="Enter Symptoms"
                                   {...register("symptoms",{required:true})}
                            ></input>
                        </div><br></br>
                        <div className={"flex justify-between"}>
                            <label>Diagnosis : </label>
                            <input className="input-login" type="text" placeholder="Enter Diagnosis"
                                   {...register("diagnosis",{required:true})}
                            ></input>
                        </div><br></br>
                        <div className={"flex justify-between"}>
                            <label>Notes : </label>
                            <input className="input-login" type="text" placeholder="Take Notes"
                                   {...register("notes")}
                            ></input>
                        </div><br></br>
                        <div className={"flex justify-center mt-2 "}>
                            <button className={"bg-blue-300 rounded text-blue-700 font-semibold w-50 cursor-pointer h-8"} type={"submit"}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PopUpForm;
