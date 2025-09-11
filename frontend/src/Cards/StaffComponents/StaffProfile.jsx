import {useForm} from "react-hook-form";
import axios from "axios";
import {useState} from "react";

function StaffProfile({user}){

    const [specialty, setSpecialty] = useState("");

    const {register,
           handleSubmit,
           formState: {errors},
    } = useForm();


    const onSubmit = (data) => {
        console.log(user)
        axios.patch(`http://localhost:3030/staff/edit/${user._id}`,data)
        .then(res => {
            console.log(res);
        })
    }

    const handleSave = handleSubmit(onSubmit);

    const addSpecialty = () => {
        axios.patch(`http://localhost:3030/staff/add-specialty/${user._id}`,
            {specialty}
        )
            .then(res => {
                console.log(res);
            })
    }

    const handleDelete = (specialty) => {
        axios.patch(`http://localhost:3030/staff/delete-specialty/${user._id}`,
            {specialty:specialty})
        .then(res => {
            console.log(res);
        })
    }

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

                        <div className="mt-2">
                            <label className="text-black ml-2">Role : </label><br />
                            <select
                                className="edit-form-select"
                                {...register('role', { required: true })}
                                defaultValue={user.role}>
                                <option value="">Select a role</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Nurse">Nurse</option>
                                <option value="Administrator">Administrator</option>
                                <option value="Other">Other</option>

                            </select>
                            {errors.role && <span></span>}
                        </div>


                    </form><br></br>

                    <div className="flex justify-center">
                    <button className="submit" type="submit" onClick={handleSave}> Save</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 justify-items-center">
                <div className="grid grid-cols-1 justify-items-center  mt-5 bg-gray-400 rounded p-2 pb-4 shadow-2xl lg:w-100 ">
                    <h1 className="text-gray-600  font-semibold">Manage Specialties</h1><br></br>

                    <div className=" bg-blue-900 rounded p-4 pb-4 shadow-2xl w-85 ">
                    {user.specialty && user.specialty.map(i => {
                        return (
                            <>
                                <div className="grid grid-cols-2">
                                    <h1 className=" mt-1 " key={i}>{i}</h1>
                                    <button className=" mt-1 ml-10 cursor-pointer hover:bg-red-700 rounded" type="button"
                                    onClick={()=>handleDelete(i)}>
                                        Delete</button>
                                </div>
                            </>
                        )
                    })}
                    </div>    <br></br>

                    <div className="">
                        <form className="flex justify-center">
                        <input className="edit-form" type="text" placeholder="Add new Specialty" onChange={(e)=> setSpecialty(e.target.value)}>

                        </input>
                        <button className="bg-blue-900 px-3 rounded cursor-pointer hover:bg-blue-800" onClick={addSpecialty} type="button">Add</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
export default StaffProfile