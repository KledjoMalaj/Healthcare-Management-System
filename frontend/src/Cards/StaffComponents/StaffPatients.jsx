import { useState } from "react";
import axios from "axios";
import {CalendarDaysIcon, XMarkIcon} from "@heroicons/react/16/solid/index.js";
import {IdentificationIcon} from "@heroicons/react/16/solid/index.js";
import {UserCircleIcon} from "@heroicons/react/16/solid/index.js";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {PlusCircleIcon} from "@heroicons/react/16/solid/index.js";

function StaffPatients({user}) {
    const navigate = useNavigate()

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [Card,setCard] = useState("normal")
    const [Patient,setPatient] = useState([])
    const [PatientId,setPatientId] = useState("")

    const {handleSubmit,
           register,
           formState:{errors}
    } = useForm()

    const handleSearch = async (e) => {
        const value = e.target.value;
        setCard("normal")
        setQuery(value);

        if (value.length > 3) {
            try {
                const res = await axios.get(`http://localhost:3030/patient/search?q=${value}`);
                setResults(res.data);
            } catch (err) {
                console.error("Error fetching patients:", err);
            }
        } else {
            setResults([]);
        }
    };

    const onSubmit = (formData) => {
        const data = {...formData,provider:user._id,patient:PatientId}
        axios.post('http://localhost:3030/appointment/add',data)
            .then((res)=>{
                console.log(res)
                setCard("normal")
            })
    }

    const onSubmit1 = (formData) => {
        const data = {...formData,providerId:user._id,patientId:PatientId}

        axios.post('http://localhost:3030/medication/add',data)
            .then((res)=>{
                console.log(res)
                setCard("normal")
            })
    }

    return (
        <>
            <div className="m-1 text-white rounded p-2.5 bg-gradient-to-b from-blue-700 to-blue-800">
                <h1>Patients</h1>


            <div className="p-4 text-center">
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search patients by name, email, insurance..."
                    className="w-full max-w-md px-3 py-2 border rounded shadow "
                />

                <div className=" mt-5">
                {results.length > 0 && (
                    <div className="border bg-blue-900 rounded mt-2 p-2 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                        {results.map((p) => (
                            <div
                                key={p._id}
                                className=" m-2 rounded bg-white hover:mt-1.5 hover:ml-1 hover:mr-1 transition-all duration-200 ease-in-out transform -translate-x-1/200">
                                <div className="bg-gradient-to-r from-blue-700 to-sky-500  p-4 ">
                                    <div className="flex gap-2 ">
                                    <UserCircleIcon className="h-8 w-8"/>
                                    <div className="text-xl font-bold">
                                    {p.firstName} {p.lastName}
                                    </div>
                                    </div>
                                </div>
                                <div className="text-gray-600 mt-2 flex justify-between px-4">
                                    <h1>Date Of birth : </h1>
                                    <h1 className="font-semibold">{new Date(p.dateOfBirth).toLocaleDateString()}</h1>
                                </div>
                                <div className="text-gray-600 mt-2 flex justify-between px-4">
                                    <h1>Email :</h1>
                                   <h1 className="font-semibold"> {p.email} </h1>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-2 p-4">
                                    <button className="flex-1 flex gap-2 justify-center items-center text-gray-600 cursor-pointer p-2 text-center hover:text-gray-100 hover:bg-emerald-600 rounded"
                                    onClick={()=>{setCard("Appointment"), setPatient([p.firstName,p.lastName]), setPatientId(p._id)}}>
                                        <CalendarDaysIcon className="h-6 w-6" />
                                        Appointment
                                    </button>

                                    <button className="flex-1 flex gap-2 justify-center items-center text-gray-600 cursor-pointer p-2 text-center hover:text-gray-100 hover:bg-orange-400 rounded"
                                    onClick={()=>{setCard("Prescribe"), setPatient([p.firstName,p.lastName]), setPatientId(p._id)}}>
                                        <PlusCircleIcon className={"h-6 w-6"}/>
                                        Prescribe</button>
                                </div>
                                <div className={"flex justify-center mx-5 mb-2"}>
                                    <button className="flex-1 flex gap-2 justify-center items-center text-gray-600 cursor-pointer p-2  text-center hover:text-gray-100 hover:bg-sky-600 rounded"
                                            onClick={()=> {navigate(`/Staff/MedicalHistory/${p._id}`,{state : {providerId:user._id,patientName:p.firstName,patientLastName:p.lastName}})}}>
                                        <IdentificationIcon className="h-6 w-6" />
                                        Medical History
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
                    <br></br>

                {Card === "Appointment" &&
                    <>
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-gray-800">

                        <div className="bg-white p-5 lg:w-120 md:w-120 sm:w-100 shadow-lg rounde">

                            <div className={"flex justify-between"}>
                            <h1 className="m-3 text-xl">Add Appointment for {Patient[0]} {Patient[1]}</h1>
                            <button onClick={()=>setCard("normal")}
                                    className="cursor-pointer"><XMarkIcon className="h-9 w-9 text-blue-600 hover:text-blue-900"/>
                            </button>
                            </div>

                            <form className="mt-5 border rounded p-3" onSubmit={handleSubmit(onSubmit)}>

                                <div className={"flex justify-between"}>
                                <label className="text-gray-600" >Set Date :</label>
                                <input className="ml-2 text-gray-600"
                                       {...register("date",{required:true})}
                                       type="date"/>
                                {errors.date && <span>{errors.date.message}</span>}
                                </div><br></br>

                                <div className={"flex justify-between"}>
                                    <label className="text-gray-600" >Set Time:</label>
                                    <input className="ml-2 text-gray-600 bg-white rounded border"
                                           {...register("time",{required:true})}
                                           type="text"/>
                                    {errors.time && <span>{errors.time.message}</span>}
                                </div><br></br>

                                <div className={"flex justify-between"}>
                                    <label className="text-gray-600">Reason :</label><br></br>
                                    <input className="m-3 rounded h-30 w-60 bg-white border text-gray-600"
                                        {...register("reason",{required:true})}
                                    ></input>
                                    {errors.reason && <span>{errors.reason.message}</span>}
                                </div>

                                <button className="submit" type="submit">Add</button>
                            </form>
                        </div>
                        </div>
                    </>
                }

                    {Card === "Prescribe" &&
                    <>
                          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-gray-800">
                <div className="bg-white p-5 lg:w-150 md:w-120 sm:w-100 shadow-lg rounded">
                    <div className="flex justify-between">
                    <h1 className="text-xl">Add Prescription for {Patient[0]} {Patient[1]}</h1>
                    <button onClick={()=>setCard("normal")}
                        className="cursor-pointer"><XMarkIcon className="h-9 w-9 text-blue-600 hover:text-blue-900"/>
                    </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit1)} className={"mt-5 border rounded p-3"}>
                        <div className={"flex justify-between"}>
                            <label>Medication Name: </label>
                            <input className="input-login" type="text" placeholder="Enter Medication Name"
                                   {...register('medicationName',{required:true})}
                            ></input>
                        </div><br></br>
                        <div className={"flex justify-between"}>
                            <label>Dosage : </label>
                            <input className="input-login" type="text" placeholder="Enter Dosage"
                                   {...register('dosage',{required:true})}
                            ></input>
                        </div><br></br>
                        <div className={"flex justify-between"}>
                            <label>Frequency : </label>
                            <input className="input-login" type="text" placeholder="Enter Frequency"
                                   {...register('frequency',{required:true})}
                            ></input>
                        </div><br></br>

                        <div className={"flex justify-center mt-2 "}>
                            <button className={"bg-blue-300 rounded text-blue-700 font-semibold w-50 cursor-pointer h-8"} type={"submit"}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
                    </>
                    }
                </div>
            </div>
            </div>
        </>
    );
}

export default StaffPatients;
