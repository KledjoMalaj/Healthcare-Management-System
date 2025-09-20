import {CalendarDaysIcon} from "@heroicons/react/16/solid/index.js";
import {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {ClockIcon} from "@heroicons/react/16/solid/index.js";
import {UserIcon} from "@heroicons/react/20/solid/index.js";


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

    function handleDelete(id)  {
        axios.delete('http://localhost:3030/appointment/delete',{data:{id:id}})
            .then((res)=>{
                console.log(res)
            })
    }

    return (
        <>

            <div className="m-1 text-white bg-blue-900 rounded p-2.5">
                <div className="flex justify-between">
                    <h1 className="mt-2" >Appointments Page</h1>
                    <button className="flex gap-2 rounded p-2 hover:bg-emerald-600 cursor-pointer hover:text-gray-200"
                    onClick={()=>setPage("MakeAppointment")}>
                    <CalendarDaysIcon className="h-6 w-6"/>Book New Appointment</button>
                </div>

                {page === "normal" &&
                <>
                    <div className="mt-2 bg-gray-300 rounded p-2 pb-4 shadow-2xl">
                        <h1 className="text-gray-600 font-semibold">View Appointments</h1>

                        <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 m-1 mt-2">
                            {appointment && appointment.map((i) =>
                                <>
                                    <div key={i} className="AppointmentCard">
                                    <div key={i}>
                                        <div className="flex justify-between">
                                            <h1 className="flex gap-2 font-bold text-xl"><CalendarDaysIcon className="h-6 w-6 mt-1 text-blue-800"/>{new Date(i.date).toLocaleDateString()}</h1>
                                            <h1 className={i.status}>{i.status}</h1>
                                        </div>
                                        <p className="flex gap-2" ><ClockIcon className="h-6 w-6 text-blue-800"/>{i.time}</p>
                                        <div className="mt-4 ">
                                            <div className="flex">
                                            <UserIcon className="h-12 w-12"/>
                                            <div className="ml-2">
                                            <h1 className="font-bold text-2xl">{i.provider.firstName} {i.provider.lastName}</h1>
                                            <h1>{i.provider.role}</h1>
                                            </div>

                                            </div>
                                            <div className="bg-gray-200 rounded p-1 mt-2">
                                                <h1 className="ml-2">{i.reason}</h1>
                                            </div>
                                            <div className="flex justify-between">
                                                <button className="border-1 rounded-4xl px-4 py-1 hover:bg-emerald-200 hover:border-emerald-600 cursor-pointer mt-4">Reschedule</button>
                                                <button onClick={()=>handleDelete(i._id)} className="border-1 rounded-4xl px-4 py-1 hover:bg-red-200 hover:border-red-600 cursor-pointer mt-4">Remove</button>
                                            </div>
                                        </div>
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
                        <div className="bg-gray-300 rounded p-2 mt-2 shadow-2xl">
                            <div className="flex justify-between">
                                <div>
                                    <h1 className="text-gray-600 font-semibold mt-2">Appointment form</h1>
                                </div>
                                <div>
                                    <button className="py-1 px-5 rounded bg-red-700 cursor-pointer shadow"
                                            onClick={()=>setPage("normal")}
                                    >Close</button>
                                </div>
                            </div>

                            <div className="mt-2 flex justify-center">
                                <form className="bg-white p-4 rounded text-gray-600 shadow-lg w-90" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex justify-between ">
                                    <label>Select Provider :</label>
                                    <select className="text-white cursor-pointer text-center bg-gray-400 rounded p-1 w-40" {...register('provider',{required:true})}>
                                        <option> Choose Provider </option>
                                        {providers && providers.map((i)=>
                                            <option key={i._id} value={i._id}>{i.firstName} {i.lastName} {i.role}</option>
                                        )}
                                    </select>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <label>Select Date :</label>
                                        <input className="bg-gray-400 text-white rounded p-1 w-40" {...register('date',{required:true})} type="date">
                                        </input>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <label>Set Time :</label>
                                        <input className="bg-gray-400 rounded p-1 w-40" {...register('time',{required:true})}>
                                        </input>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <label>Reason :</label>
                                        <input className="bg-gray-400 text-gray-700 text-center h-20 w-40 rounded" {...register('reason')} type="text"></input>
                                    </div>

                                    <div className="flex justify-center">
                                    <button className="mt-4 bg-emerald-600 shadow-lg px-15 py-1 rounded cursor-pointer text-white" type="submit">Book</button>
                                    </div>
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