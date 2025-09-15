import {CalendarDaysIcon} from "@heroicons/react/16/solid/index.js";
import {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";


function PatientAppointments({user}){
    const [page,setPage] = useState("normal")
    const [appointment,setAppointment] = useState([])
    const [providers,setProviders] = useState([])

    const {register,
           handleSubmit,
           formState:{errors}
    } = useForm()

    useEffect(() => {
        axios.get(`http://localhost:3030/appointment/view/${user._id}`)
            .then((res)=>{
                setAppointment(res.data)
            })
        axios.get('http://localhost:3030/staff/providers')
            .then((res)=>{
                setProviders(res.data)
            })
    }, []);

    const onSubmit = (rawData) => {
        const data = {...rawData,patient:user._id}
        axios.post('http://localhost:3030/appointment/add', data)
            .then((res)=>{
                if(res.data.message === "Appointment Added") {
                    setPage("normal")
                }
            })
    }

    return (
        <>

            <div className="m-1 text-white bg-blue-900 rounded p-2.5">
                <div className="flex justify-between">
                    <h1 className="mt-2" >Appointments Page</h1>
                    <button className="flex gap-2 rounded p-2 hover:bg-emerald-600 cursor-pointer hover:text-gray-200"
                    onClick={()=>setPage("MakeAppointment")}>
                    <CalendarDaysIcon className="h-6 w-6"/>Make Appointment</button>
                </div>

                {page === "normal" &&
                <>
                    <div className="mt-2 bg-gray-400 rounded p-2 pb-4 shadow-2xl">
                        <h1 className="text-gray-600 font-semibold">View Appointments</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 m-1 mt-2">
                            {appointment && appointment.map((i) =>
                                <>
                                    <div className="flex justify-between m-1 bg-blue-900 rounded p-3">
                                    <div>
                                        <h1>{i.provider.firstName} {i.provider.lastName} {i.provider.role}</h1>
                                        <h1>Date : {new Date(i.date).toLocaleDateString()}</h1>
                                        <h1>Reason : {i.reason}</h1>
                                    </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
                }

                {page === "MakeAppointment" &&
                    <>
                        <div className="bg-gray-400 rounded p-2 mt-2 shadow-2xl">
                            <div className="flex justify-between">
                                <div>
                                    <h1 className="text-gray-600 font-semibold mt-2">Appointment form</h1>
                                </div>
                                <div>
                                    <button className="p-2 rounded bg-red-700 cursor-pointer"
                                            onClick={()=>setPage("normal")}
                                    >Close</button>
                                </div>
                            </div>

                            <div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                    <label>Select Provider :</label>
                                    <select className="text-gray-600 cursor-pointer" {...register('provider',{required:true})}>
                                        <option> Choose Provider </option>
                                        {providers && providers.map((i)=>
                                            <option value={i._id}>{i.firstName} {i.lastName} {i.role}</option>
                                        )}
                                    </select>
                                    </div>
                                    <div>
                                        <label>Select Date :</label>
                                        <input {...register('date',{required:true})} type="date">
                                        </input>
                                    </div>
                                    <div>
                                        <label>Reason :</label>
                                        <input {...register('reason')} type="text"></input>
                                    </div>

                                    <button type="submit">Add</button>
                                </form>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default PatientAppointments