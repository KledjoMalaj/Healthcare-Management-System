import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function PatientPage() {
    const navigate = useNavigate();
    const [patient, setPatient] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        axios.get("http://localhost:3030/patient/me",{
            headers : {authorization:`Bearer ${token}`}
        })
        .then(res => {
            console.log(res.data);
            setPatient(res.data);
        })
    },[])

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/LogIn/Patient",{replace:true});
    }

    return (
        <>
            <h1>Patient {patient.firstName}</h1>
            <button type="submit" onClick={handleLogout}>Log Out</button>
        </>
    )
}
export default PatientPage;