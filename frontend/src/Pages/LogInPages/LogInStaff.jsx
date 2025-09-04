import {useForm} from "react-hook-form";

function LogInStaff(){

    const {register,
           handleSubmit,
           formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <div className="justify-items-center bg-blue-900 p-5 m-2 rounded">

                <h1 className="text-white">LogIn Staff</h1><br></br>

                <div className="text-center rounded bg-gray-300 w-100 h-83 m-2">
            <form onSubmit={handleSubmit(onSubmit)}>

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

                <button className="submit" type="submit">Submit</button>
            </form>
            </div>
            </div>
        </>
    )
}
export default LogInStaff