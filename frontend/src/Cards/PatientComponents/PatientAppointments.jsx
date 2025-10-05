import {CalendarDaysIcon, XMarkIcon} from "@heroicons/react/16/solid/index.js";
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
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-gray-800">

                        <div className="bg-white p-5 lg:w-120 md:w-120 sm:w-100 shadow-lg rounde">

                            <div className={"flex justify-between"}>
                            <button onClick={()=>setPage("normal")}
                                    className="cursor-pointer"><XMarkIcon className="h-9 w-9 text-blue-600 hover:text-blue-900"/>
                            </button>
                            </div>

                            <form className="mt-5 border rounded p-3" onSubmit={handleSubmit(onSubmit)}>

                                <div className="flex justify-between ">
                                    <label>Select Provider :</label>
                                    <select className="ml-2 text-gray-600 bg-white rounded border px-2 py-0.5"
                                            {...register('provider',{required:true})}>
                                        <option> Choose Provider </option>
                                        {providers && providers.map((i)=>
                                            <option key={i._id} value={i._id}>{i.firstName} {i.lastName} {i.role}</option>
                                        )}
                                    </select>
                                </div><br></br>

                                <div className={"flex justify-between"}>
                                <label className="text-gray-600" >Set Date :</label>
                                <input className="ml-2 text-gray-600"
                                       {...register("date",{required:true})}
                                       type="date"/>
                                {errors.date && <span>{errors.date.message}</span>}
                                </div><br></br>

                                <div className={"flex justify-between "}>
                                    <label className="text-gray-600" >Set Time:</label>
                                    <input className="ml-2  bg-white rounded border text-center"
                                           {...register("time",{required:true})}
                                           type="text" placeholder={"Set Time"}/>
                                    {errors.time && <span>{errors.time.message}</span>}
                                </div><br></br>

                                <div className={"flex justify-between"}>
                                    <label className={"text-gray-600"}>Appointment Type:</label>
                                    <select
                                        className="ml-2 text-gray-600 bg-white rounded border px-9 py-0.5"
                                        {...register('appointmentType', {required: true})}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Check-up">Check-up</option>
                                        <option value="Follow-up">Follow-up</option>
                                        <option value="Consultation">Consultation</option>
                                        <option value="Emergency">Emergency</option>
                                        <option value="Procedure">Procedure</option>
                                    </select>
                                </div><br></br>

                                <div className={"flex justify-between"}>
                                    <label className="text-gray-600">Reason :</label><br></br>
                                    <input className="ml-2 rounded h-30 w-60 bg-white border text-gray-600"
                                        {...register("reason",{required:true})}
                                    ></input>
                                    {errors.reason && <span>{errors.reason.message}</span>}
                                </div>

                                <button className="submit mt-4" type="submit">Add</button>
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