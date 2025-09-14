import {useEffect, useState} from "react";
import axios from "axios";

function StaffAppointments({user}){
    const [AppointmentData,setAppointmentData] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:3030/appointment/view/${user._id}`)
            .then((res)=>
            setAppointmentData(res.data))
    }, []);

    return(
        <>
            <div className="m-1 text-white bg-blue-900 rounded p-2.5">
                <h1> Appointments Page</h1>

                <div className="mt-5 bg-gray-400 rounded p-2 pb-4 shadow-2xl">
                    <h1 className="text-gray-600 font-semibold">View Appointments</h1>

                    <div className="flex gap-6 m-2">
                    {AppointmentData && AppointmentData.map(i=>
                    <>
                        <div className="flex m-2 bg-blue-900 rounded p-3">
                            <div>
                            <h1>Patient : {i.patient.firstName} {i.patient.lastName}</h1>
                            <h1>Date : {new Date(i.date).toLocaleDateString()}</h1>
                            <h1>Reason : {i.reason}</h1>
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