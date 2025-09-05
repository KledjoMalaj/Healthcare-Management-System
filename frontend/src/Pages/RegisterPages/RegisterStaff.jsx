import {useForm } from 'react-hook-form'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function RegisterStaff(){

    const navigate = useNavigate();

    const {register,
           handleSubmit,
           watch,
           formState: { errors },
    } = useForm()

    const password = watch("password")

    const onSubmit = (data) => {
        axios.post(`http://localhost:3030/staff/register`, data)
        .then(res => {
            if(res.data.message === "Successfully registered"){
                navigate('/LogIn/Staff')
            }
        })
    }

    return(
        <>
            <div className="justify-items-center bg-cyan-900 p-2 m-2 rounded">
            <h1 className="text-white">Register Staff</h1><br></br>

            <div className="text-center rounded bg-gray-300  md:w-110 h-140 m-2 p-7">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>First Name : </label><br></br>
                    <input className="input-login"
                        {...register("firstName",{required:true})}
                    placeholder="Enter First Name"/>
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                </div><br></br>
                <div>
                    <label>Last Name : </label><br></br>
                    <input className="input-login"
                        {...register("lastName",{required:true})}
                    placeholder="Enter Last Name"/>
                    {errors.lastName && <span>{errors.lastName.message}</span>}
                </div><br></br>
                <div>
                    <label>Date Of Birth : </label><br></br>
                    <input className="input-date"
                        {...register("dateOfBirth",{required:true})}
                    placeholder="Enter Date of Birth"
                    type="date"/>
                    {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
                </div><br></br>
                <div>
                    <label>Email : </label><br></br>
                    <input className="input-login"
                        {...register("email",{required:true})}
                    placeholder="Enter Email"/>
                    {errors.email && <span>{errors.email.message}</span>}
                </div><br></br>
                <div>
                    <label>Password : </label><br></br>
                    <input className="input-login"
                        {...register("password",{required:true})}
                    placeholder="Enter Password" type="password"/>
                    {errors.password && <span>{errors.password.message}</span>}
                </div><br></br>
                <div>
                    <label>Confirm Password : </label><br></br>
                    <input className="input-login"
                        type="password"
                        {...register("confirmPassword",{required:true,
                        validate:(value) => value === password || "Password does not match"
                        })}
                        placeholder="Confirm Password"/>
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                </div><br></br>

                <button className="submit-register" type="submit">Register</button>
            </form>
            </div>
            </div>
        </>
    )
}
export default RegisterStaff