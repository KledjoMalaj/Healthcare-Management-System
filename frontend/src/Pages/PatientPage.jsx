import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {UserCircleIcon} from "@heroicons/react/16/solid/index.js";
import {ArrowLeftOnRectangleIcon, Bars3Icon} from "@heroicons/react/20/solid/index.js";
import MenuPatient from "../Cards/MenuPatient.jsx";

function PatientPage() {
    const navigate = useNavigate();
    const [patient, setPatient] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        axios.get("http://localhost:3030/patient/me",{
            headers : {authorization:`Bearer ${token}`}
        })
        .then(res => {
            setPatient(res.data);
        })
    },[])

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/LogIn/Patient",{replace:true});
    }

    if(!patient) {
        navigate("/",{replace:true});
    }

    return (
        <>
            {menuOpen && <MenuPatient onClose={() => setMenuOpen(false)} />}

            <div className="nav-bar">
                <button className="menu-line" type="button"  onClick={()=>setMenuOpen(true)}>
                    <Bars3Icon className="mx-4 h-6 w-6"/>
                </button>
                <h1 className="my-3.5 mx-2 flex"><UserCircleIcon className="h-6 w-6 mx-2 "/>
                    {patient.firstName} {patient.lastName}</h1>
                <button className="logOut-btn" type="submit" onClick={handleLogout}>
                    <ArrowLeftOnRectangleIcon className="h-6 w-6 mx-2 my-0.5 "/>Log Out</button>
            </div>
        </>
    )
}
export default PatientPage;