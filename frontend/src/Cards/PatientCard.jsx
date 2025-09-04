import {useNavigate} from "react-router-dom";

function PatientCard() {
    const navigate = useNavigate();

    const LogInPatient = () => {
        navigate('/LogIn/Patient')
    }
    const RegisterPatient = () => {
        navigate('/Register/Patient')
    }

    return (
        <>
            <div>
                <h1 className="p-3 text-center">LogIn/Register Patient</h1><br></br>
                <div className="grid gap-4 justify-center space-x-2 ">
                    <button onClick={LogInPatient} className="LogIn-Btn" type="submit">LogIn Patient</button>
                    <button onClick={RegisterPatient} className="Register-Btn" type="submit">Register Patient</button>
                </div>
            </div>
        </>
    )
}
export default PatientCard