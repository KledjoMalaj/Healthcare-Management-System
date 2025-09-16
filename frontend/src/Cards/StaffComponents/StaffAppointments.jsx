import {useEffect, useState} from "react";
import axios from "axios";
import {CalendarDaysIcon, ClockIcon} from "@heroicons/react/16/solid/index.js";
import {UserIcon} from "@heroicons/react/20/solid/index.js";

function StaffAppointments({user}){
    const [AppointmentData,setAppointmentData] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:3030/appointment/view/${user._id}`)
            .then((res)=>
            setAppointmentData(res.data))
    }, []);

    function handleDelete(id)  {
        axios.delete('http://localhost:3030/appointment/delete',{data:{id:id}})
            .then((res)=>{
                console.log(res)
            })
    }

    function handleConfirm(id){
        const status = "Confirmed"
        axios.patch(`http://localhost:3030/appointment/confirm/${id}`,{status})
            .then((res)=>{
                console.log(res)
            })
    }

    return(
        <>
            <div className="m-1 text-white bg-blue-900 rounded p-2.5">
                <h1> Appointments Page</h1>

                <div className="mt-5 bg-gray-400 rounded p-2 pb-4 shadow-2xl">
                    <h1 className="text-gray-600 font-semibold">View Appointments</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 m-1 mt-2">
                            {AppointmentData && AppointmentData.map((i) =>
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
                                            <h1 className="font-bold text-2xl">{i.patient.firstName} {i.patient.lastName}</h1>
                                            </div>

                                            </div>
                                            <div className="bg-gray-200 rounded p-1 mt-2">
                                                <h1 className="ml-2">{i.reason}</h1>
                                            </div>
                                            <div className="flex justify-between">
                                                <button className="border-1 rounded-4xl px-4 py-1 hover:bg-emerald-200 hover:border-emerald-600 cursor-pointer mt-4">Reschedule</button>
                                                <button onClick={()=>handleDelete(i._id)} className="border-1 rounded-4xl px-4 py-1 hover:bg-red-200 hover:border-red-600 cursor-pointer mt-4">Remove</button>
                                                <button onClick={()=>handleConfirm(i._id)} className="border-1 rounded-4xl px-4 py-1 hover:bg-purple-200 hover:border-purple-600 cursor-pointer mt-4" >Confirm</button>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </>
                            )}
                        </div>

                </div>

            </div>
        </>
    )
}
export default StaffAppointments;