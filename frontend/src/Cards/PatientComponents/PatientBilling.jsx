import {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";

function PatientBilling({user}){
    const [billing,setBilling] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3030/billing/view/${user._id}`)
            .then(res => setBilling(res.data))
    }, []);

    return (
        <>
            <div className={'bg-gradient-to-r from-blue-700 to-blue-900 rounded p-5 m-2 text-white'}>
                <h1 className={'text-4xl font-bold'}>Billing Page</h1>
            </div>
            <div className={"grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1"}>
                {billing && billing.map(i=>
                <div key={i._id} className={"bg-white rounded m-2 p-4"}>
                    <div className={"flex justify-between "}>
                        <h1 className={"text-xl font-semibold"}>{i.description}</h1>
                        <h1 className={"border-1 bg-blue-100 border-blue-500 text-blue-800 rounded-4xl lg:px-3 md:px-3 sm:px-5 text-xl"}>Amount  {i.amount}$</h1>
                    </div>

                    <h1>{dayjs(i.createdAt).format(' MMMM DD YYYY')}</h1>

                    <div className={"mt-2 bg-blue-100 rounded p-2"}>
                        <div className={"flex justify-between"}>
                            <h1>Provider  </h1>
                            <h1>{i.appointment.provider.firstName} {i.appointment.provider.lastName} {i.appointment.provider.role}</h1>
                        </div>
                        <div className={"flex justify-between"}>
                            <h1 className={"mt-2"}>Status  </h1>
                            <h1 className={i.paymentStatus}>{i.paymentStatus}</h1>
                        </div>
                    </div>

                    <div className={"bg-blue-200 mt-4 p-2 rounded "}>
                        <div className={"flex gap-2"}>
                            <button className={"bg-green-600 rounded p-2 text-white cursor-pointer"}>Pay Now</button>
                            <button className={"bg-white rounded p-2 cursor-pointer"}>View Details</button>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </>
    )
}
export default PatientBilling