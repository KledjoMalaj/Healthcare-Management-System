import {XMarkIcon} from "@heroicons/react/16/solid/index.js";
import {useForm} from "react-hook-form";
import axios from "axios";

function UpdateVitalSigns({onClose, PatientId}) {
    const {register, handleSubmit} = useForm()

    const lastUpdated = Date.now()
    const onSubmit = (data) => {
        const formData = {...data, lastUpdated}
        axios.patch(`http://localhost:3030/vitalSigns/edit/${PatientId}`, formData)
            .then((res) => {
                onClose()
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-5 lg:w-110 sm:w-100 shadow-lg rounded">
                <div className="flex justify-between">
                    <h1 className="text-xl">Update Vital Signs</h1>
                    <button onClick={() => onClose(null)}
                            className="cursor-pointer">
                        <XMarkIcon className="h-9 w-9 text-blue-600 hover:text-blue-900"/>
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-5 border rounded p-3">
                    <div className="flex justify-between">
                        <label>Blood Pressure : </label>
                        <input className="input-login" type="text" placeholder="Enter Blood Pressure"
                               {...register('bloodPressure', {required: true})}/>
                    </div><br/>
                    <div className="flex justify-between">
                        <label>Heart Rate : </label>
                        <input className="input-login" type="text" placeholder="Enter Heart Rate"
                               {...register('heartRate', {required: true})}/>
                    </div><br/>
                    <div className="flex justify-between">
                        <label>Temperature : </label>
                        <input className="input-login" type="text" placeholder="Enter Temperature"
                               {...register('temperature', {required: true})}/>
                    </div><br/>
                    <div className="flex justify-between">
                        <label>Weight : </label>
                        <input className="input-login" type="text" placeholder="Enter Weight"
                               {...register('weight', {required: true})}/>
                    </div><br/>
                    <div className="flex justify-center mt-2 ">
                        <button
                            className="bg-blue-300 rounded text-blue-700 font-semibold w-50 cursor-pointer h-8"
                            type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateVitalSigns
