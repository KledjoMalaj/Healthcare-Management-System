import {useEffect, useState} from "react";
import axios from "axios";

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

    return(
        <>
            <div className="m-1 text-white bg-blue-900 rounded p-2.5">
                <h1> Appointments Page</h1>

                <div className="mt-5 bg-gray-400 rounded p-2 pb-4 shadow-2xl">
                    <h1 className="text-gray-600 font-semibold">View Appointments</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 m-1 mt-2">
                    {AppointmentData && AppointmentData.map(i=>
                    <>
                        <div className="flex justify-between m-1 bg-blue-900 rounded p-3">
                            <div>
                            <h1>Patient : {i.patient.firstName} {i.patient.lastName}</h1>
                            <h1>Date : {new Date(i.date).toLocaleDateString()}</h1>
                            <h1>Reason : {i.reason}</h1>
                            </div>

                            <div className="">
                                <button onClick={()=>handleDelete(i._id)}
                                    className="bg-red-800 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600">
                                    Delete</button>
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