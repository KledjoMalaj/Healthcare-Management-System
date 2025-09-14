import {CalendarDaysIcon} from "@heroicons/react/16/solid/index.js";
import {useEffect, useState} from "react";
import axios from "axios";


function PatientAppointments({user}){
    const [page,setPage] = useState("normal")
    const [appointment,setAppointment] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3030/appointment/view/${user._id}`)
            .then((res)=>{
                console.log(res)
            })
    }, []);

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
                        <h1 className="text-gray-600 font-semibold">Appointments</h1>
                    </div>

                </>
                }

                {page === "MakeAppointment" &&
                    <>
                        <div className="flex justify-between bg-gray-400 rounded p-2 mt-2 shadow-2xl">
                        <div className="">
                            <h1 className="text-gray-600 font-semibold mt-2">Appointment form</h1>
                        </div>

                        <div>
                        <button className="p-2 rounded bg-red-700 cursor-pointer"
                                onClick={()=>setPage("normal")}
                        >Close</button>
                        </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default PatientAppointments