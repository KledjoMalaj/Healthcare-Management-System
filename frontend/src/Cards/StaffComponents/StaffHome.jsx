import {CalendarDaysIcon} from "@heroicons/react/16/solid/index.js";
import {useEffect, useState} from "react";
import axios from "axios";

function StaffHome({user}){
    const [appointments,setAppointmentData] = useState([])

    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yy = today.getFullYear();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[today.getDay()];

    useEffect(() => {
        axios.get(`http://localhost:3030/appointment/view/${user._id}`)
            .then((res)=>
                setAppointmentData(res.data))
    }, [user]);


    return (
        <>
            <div className="grid lg:grid-cols-[75%_25%] md:grid-cols-1 sm:grid-cols-1">
            <div className="bg-gray-200 m-1 lg:h-65 sm:h-100 rounded p-2.5 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                <div className="Staff-Home">
                    <div className="flex justify-between text-white ">
                        <h1 className="mt-1 font-semibold text-2xl">Today</h1>
                        <CalendarDaysIcon className="h-8 w-8"/>
                    </div>
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">{dd}</h1>
                        <h1 className="font-bold text-5xl mt-2">{dayName}</h1>
                    </div>
                    <div className="flex justify-center gap-2 mt-2 font-semibold text-2xl">
                        <h1>{mm}</h1>
                        <h1>{yy}</h1>
                    </div>
                </div>
                <div className="Staff-Home">
                    <h1 className="mt-1 font-semibold text-2xl">Today's Appointments</h1>
                    <div className="mt-5 bg-blue-500 rounded p-0.5">

                        {appointments && appointments.map(i => {
                            const now = new Date();
                            const today = now.toISOString().split("T")[0];
                            const appointmentDate = new Date(i.date).toISOString().split("T")[0];

                            const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();


                            const timeStr = i.time.trim();
                            const isPM = timeStr.includes('PM');
                            const timeOnly = timeStr.replace(/\s*(AM|PM)/i, '');
                            const [hour, minute] = timeOnly.split(':').map(Number);
                            
                            let appointmentHour = hour;
                            if (isPM && hour !== 12) {
                                appointmentHour = hour + 12;
                            } else if (!isPM && hour === 12) {
                                appointmentHour = 0;
                            }
                            
                            const appointmentTimeInMinutes = appointmentHour * 60 + minute;

                            if (appointmentDate !== today || appointmentTimeInMinutes <= currentTimeInMinutes) return null;

                            return (
                                <div key={i._id} className="flex gap-4 hover:bg-blue-800 p-1 rounded">
                                    <h1>{i.patient.firstName}</h1>
                                    <h1>{i.patient.lastName}</h1>
                                    <h1>{i.time}</h1>
                                    <h1>{i.status}</h1>
                                </div>
                            );
                        })}

                    </div>
                </div>

            </div>
                <div className="bg-gray-200 rounded m-1 h-165">
                    <div className="Home-Component">
                        <h1 className="text-center">Today's Overview</h1>
                    </div>
                    <div className="Home-Component2">
                        <h1>Scheduled Patients</h1>
                    </div>
                    <div className="Home-Component2">
                        <h1>Asking For Confirmation</h1>
                    </div>
                    <div className="Home-Component2">
                        <h1>Patients Seen</h1>
                    </div><br></br>

                    <div className="Home-Component">
                        <h1 className="text-center">Performance</h1>
                    </div>
                    <div className="Home-Component2">
                        <h1>Daily Progress</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
export default StaffHome