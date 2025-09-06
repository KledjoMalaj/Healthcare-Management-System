import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LogInStaff(){

    const navigate = useNavigate();

    const {register,
           handleSubmit,
           formState: { errors },
    } = useForm();

    const onSubmit = (data) => {

        axios.post("http://localhost:3030/staff/login", data)
        .then((res) => {
            const token = res.data.token;
            localStorage.setItem("authToken", token);
            if(res.status === 200){
                navigate("/StaffPage");
            }
        })
    }

    return (
        <>
            <div className="justify-items-center bg-blue-900 p-5 m-2 rounded">

                <h1 className="text-white">LogIn Staff</h1><br></br>

                <div className="text-center rounded bg-gray-300 md:w-100 h-83 m-2">
            <form onSubmit={handleSubmit(onSubmit)}>

                <div><br></br>
                    <label>Name : </label><br></br>
                    <input className="input-login" {...register('firstName', { required: true })}
                    placeholder="Enter name" />
                    {errors.firstName && <span></span>}
                </div><br></br>

                <div>
                    <label>Email : </label><br></br>
                    <input className="input-login" {...register('email', { required: true })}
                    placeholder="Enter email" />
                    {errors.email && <span></span>}
                </div><br></br>

                <div>
                    <label>Password: </label><br></br>
                    <input className="input-login" {...register('password', { required: true })}
                    placeholder="Enter password" type="password" />
                    {errors.password && <span></span>}
                </div><br></br><br></br>

                <button className="submit" type="submit">Log In</button>
            </form>
            </div>
            </div>
        </>
    )
}
export default LogInStaff