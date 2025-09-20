import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {UserCircleIcon} from "@heroicons/react/16/solid/index.js";
import {ArrowLeftOnRectangleIcon} from "@heroicons/react/20/solid/index.js";
import {Bars3Icon} from "@heroicons/react/20/solid/index.js";
import MenuStaff from "../Cards/MenuStaff.jsx";
import StaffProfile from "../Cards/StaffComponents/StaffProfile.jsx";
import StaffAppointments from "../Cards/StaffComponents/StaffAppointments.jsx";
import StaffPatients from "../Cards/StaffComponents/StaffPatients.jsx";
import StaffHome from "../Cards/StaffComponents/StaffHome.jsx";

function StaffPage() {

    const navigate = useNavigate();
    const [staff, setStaff] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [page, setPage] = useState("Home");

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        axios.get("http://localhost:3030/staff/me",{
            headers : {authorization:`Bearer ${token}`}
        })
        .then(res => {
            setStaff(res.data);
        })
    },[])

    const handleLogOut = () => {
        localStorage.removeItem("authToken");
        navigate("/LogIn/Staff",{replace:true});
    }
    if(!staff){
        navigate("/",{replace:true})
    }

    return (
        <>
            {menuOpen && <MenuStaff setPage={setPage} onClose={() => setMenuOpen(false)} />}

            <div className="nav-bar">

            <button className="menu-line" type="button" onClick={()=>setMenuOpen(true)}>
                <Bars3Icon className="mx-4 h-6 w-6"/>
            </button>

            <h1 className="my-3.5 mx-2 flex"><UserCircleIcon className="h-6 w-6 mx-2 "/>
                {staff.firstName} {staff.lastName}</h1>
            <button className="logOut-btn" type="submit" onClick={handleLogOut}>
                <ArrowLeftOnRectangleIcon className="h-6 w-6 mx-2 my-0.5"/>Log Out</button>
            </div>

            {page === "Profile" && <StaffProfile user={staff}/>}
            {page === "Appointments" && <StaffAppointments user={staff}/>}
            {page === "Patients" && <StaffPatients user={staff} />}
            {page === "Home" && <StaffHome user={staff}/>}

        </>
    )
}
export default StaffPage;