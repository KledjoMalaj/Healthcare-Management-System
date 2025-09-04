import {useNavigate } from 'react-router-dom'
function StaffCard(){
    const navigate = useNavigate();

    const LogInStaff = () => {
        navigate('/LogIn/Staff');
    }
    const RegisterStaff = () => {
        navigate('/Register/Staff');
    }

    return(
        <>
            <div>
            <h1 className="p-3 text-center">LogIn/Register Staff</h1><br></br>
                <div className="grid gap-4 justify-center space-x-2 ">
                    <button onClick={LogInStaff} className="LogIn-Btn" type="submit">LogIn Staff</button>
                    <button onClick={RegisterStaff} className="Register-Btn" type="submit">Register Staff</button>
                </div>
            </div>
        </>
    )
}
export default StaffCard;