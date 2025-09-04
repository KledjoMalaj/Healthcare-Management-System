import {useForm} from "react-hook-form";

function LogInPatient(){
    const {register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit1 = (data) => {
        console.log(data);
    }

    return (
        <>
            <div className="justify-items-center bg-blue-900 p-5 m-2 rounded">

                <h1 className="text-white">LogIn Patient</h1><br></br>

                <div className="text-center rounded bg-gray-300 w-100 h-83 m-2">
                    <form onSubmit={handleSubmit(onSubmit1)}>

                        <div><br></br>
                            <label>Name : </label><br></br>
                            <input className="input-login" {...register('name', { required: true })}
                                   placeholder="Enter name" />
                            {errors.name && <span> Name is required</span>}
                        </div><br></br>

                        <div>
                            <label>Email : </label><br></br>
                            <input className="input-login" {...register('email', { required: true })}
                                   placeholder="Enter email" />
                            {errors.email && <span> Email is required</span>}
                        </div><br></br>

                        <div>
                            <label>Password: </label><br></br>
                            <input className="input-login" {...register('password', { required: true })}
                                   placeholder="Enter password" type="password" />
                            {errors.password && <span> Passwords is required</span>}
                        </div><br></br><br></br>

                        <button className="submit" type="submit">Log In</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default LogInPatient