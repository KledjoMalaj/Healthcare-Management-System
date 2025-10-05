import {CalendarDaysIcon} from "@heroicons/react/16/solid/index.js";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import axios from "axios";

function PatientHome({user}) {
    const [vitalSigns,setVitalSigns] = useState([])
    const [medication, setMedication] = useState([])
    const [appointments, setAppointments] = useState([])

    const todayD = dayjs().format("dddd");
    const todayDay = dayjs().format("DD")
    const todayM = dayjs().format("MM")
    const todayY = dayjs().format("YYYY")

    const userid = user._id

    useEffect(() => {
        if (!userid) return;

        axios.get(`http://localhost:3030/vitalSigns/${userid}`)
            .then(res => setVitalSigns(res.data))
            .catch(err => console.error(err));

        axios.get(`http://localhost:3030/medication/${userid}`)
            .then(res => setMedication(res.data))
            .catch(err => console.log(err));

        axios.get(`http://localhost:3030/appointment/view/${userid}`)
            .then(res => setAppointments(res.data))
            .catch(err => console.log(err))

    }, [userid]);



    return (
        <>
            <div className="grid lg:grid-cols-[30%_40%_30%] md:grid-cols-1 sm:grid-cols-1">
                <div className="bg-gray-200 m-1 lg:h-165 sm:h-100 rounded p-2.5 grid lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1">
                    <div>
                        <div className="Staff-Home">
                            <div className="flex justify-between text-white ">
                                <h1 className="mt-1 font-semibold text-2xl">Today</h1>
                                <CalendarDaysIcon className="h-8 w-8"/>
                            </div>
                            <div className="text-center">
                                <h1 className="text-5xl font-bold">{todayDay}</h1>
                                <h1 className="font-bold text-5xl mt-2">{todayD}</h1>
                            </div>
                            <div className="flex justify-center gap-2 mt-2 font-semibold text-2xl">
                                {todayM} {todayY}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-200 rounded m-1 h-165 p-3">
                    <div className={"Staff-Home text-center"}><h1 className={"font-semibold text-xl"}>Upcoming Appointments</h1></div>
                    <div className="mt-5 rounded p-0.5">
                        {appointments.map(i => (
                            <div key={i._id} className="Home-Component4 flex justify-between">
                                <h1>{i.provider.firstName}</h1>
                                <h1>{i.provider.lastName}</h1>
                                <h1>{dayjs(i.date).format("D / MM / YYYY")}</h1>
                                <h1>{i.time}</h1>
                                <h1>{i.status}</h1>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-200 rounded m-1 h-165">
                    <div className="Home-Component">
                        <h1 className="text-center">Health Overview</h1>
                    </div>
                    <div className="Home-Component4 flex justify-between">
                        <div>
                            <h1 className="font-semibold">Heart Rate</h1>
                            <h1>{vitalSigns[0]?.heartRate}</h1>
                        </div>
                        <div>
                            <h1 className={"font-semibold"}>Blood Pressure</h1>
                            <h1>{vitalSigns[0]?.bloodPressure}</h1>
                        </div>
                        <div>
                            <h1 className="font-semibold">Weight</h1>
                            <h1>{vitalSigns[0]?.weight}</h1>
                        </div>
                    </div>
                    <div className={"Home-Component4"}>
                        <h1 className={"font-semibold"}>Last Updated</h1>
                        <h1> {dayjs(vitalSigns[0]?.lastUpdated).format('MMMM D YYYY')}</h1>
                    </div>
                    <div className={"Home-Component"}>
                        <h1 className={"text-center"}>Prescriptions</h1>
                    </div>

                    {medication && medication.map(i =>
                    <div className={"Home-Component4 flex justify-between"}>
                        <h1>{i.medicationName}</h1>
                        <h1>{i.status}</h1>
                    </div>
                    )}
                </div>
            </div>
        </>
    )

}

export default PatientHome