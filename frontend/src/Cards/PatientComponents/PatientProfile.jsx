import {useForm} from "react-hook-form";
import axios from "axios";

function PatientProfile({user}){

    const {register,
           handleSubmit,
           formState: {errors},
    } = useForm();


    const onSubmit = (data) => {
        console.log(user)
        axios.patch(`http://localhost:3030/patient/edit/${user._id}`,data)
        .then(res => {
            console.log(res);
        })
    }

    const handleSave = handleSubmit(onSubmit);

    return (
        <>
            <div className="m-1 text-white bg-blue-900 rounded p-2.5">
                <h1>Profile {user.firstName} {user.lastName}</h1>

                <div className="mt-5 bg-gray-400 rounded p-2 pb-4 shadow-2xl">
                    <h1 className="text-gray-600 font-semibold">Edit Profile</h1><br></br>

                    <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center rounded">

                        <div className="mt-2">
                        <label className="text-black ml-2">First Name : </label><br></br>
                        <input className="edit-form" {...register('name', { required: true })}
                               defaultValue={user.firstName} />
                        {errors.name && <span></span>}
                        </div>

                        <div className="mt-2">
                            <label className="text-black ml-2" >Last Name : </label><br></br>
                            <input className="edit-form" {...register('lastName',{required:true})}
                                defaultValue={user.lastName} />
                            {errors.lastName && <span></span>}
                        </div>

                        <div className="mt-2">
                            <label className="text-black ml-2" >Date Of Birth : </label><br></br>
                            <input className="edit-form-date" {...register('dateOfBirth',{required:true})}
                                   defaultValue={user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "" }
                            type="date"/>
                            {errors.dateOfBirth && <span></span>}
                        </div>

                        <div className="mt-2">
                            <label className="text-black ml-2" >Email : </label><br></br>
                            <input className="edit-form" {...register('email', { required: true })}
                            defaultValue={user.email} />
                            {errors.email && <span></span>}
                        </div>

                        <div className="mt-2">
                            <label className="text-black ml-2" >Password :</label><br></br>
                            <input className="edit-form" {...register('password', { required: true })}
                            defaultValue={user.password} />
                            {errors.password && <span></span>}
                        </div>

                    </form><br></br>

                    <div className="flex justify-center">
                    <button className="submit" type="submit" onClick={handleSave}> Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PatientProfile;