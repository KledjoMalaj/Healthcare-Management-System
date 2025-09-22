import {UserIcon} from "@heroicons/react/20/solid/index.js";

function StaffSchedule({appointments}){
    return(
        <>
            <div className="bg-gradient-to-br from-blue-300 via-blue-200 to-blue-300  rounded p-2">
                <h1 className="text-center text-4xl font-bold text bg-gradient-to-l from-blue-900  to-blue-500  bg-clip-text text-transparent p-1" >
                    Today's Schedule</h1>

                <div className="mt-6">
                    {appointments && appointments.filter((i)=>i.status === "Confirmed").map(i=>
                            <>
                                <div className="Home-Component3">
                                    <div className="flex justify-between">
                                        <div className="flex gap-2">
                                            <UserIcon className="h-8 w-8 mt-0.5"/>
                                            <h1 className="text-2xl font-semibold">{i.patient.firstName}</h1>
                                            <h1 className="text-2xl font-semibold">{i.patient.lastName}</h1>
                                        </div>
                                        <div>
                                            <h1>{i.status}</h1>
                                        </div>
                                    </div>
                                    <div>
                                        <h1>{i.time}</h1>
                                    </div>
                                    <div className="flex justify-center">
                                        <h1>{i.reason}</h1>
                                    </div>
                                </div>
                            </>
                    )}
                </div>
            </div>
        </>
    )
}
export default StaffSchedule;