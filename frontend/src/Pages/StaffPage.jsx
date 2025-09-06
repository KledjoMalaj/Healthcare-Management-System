import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function StaffPage() {

    const navigate = useNavigate();
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        axios.get("http://localhost:3030/staff/me",{
            headers : {authorization:`Bearer ${token}`}
        })
        .then(res => {
            console.log(res.data);
            setStaff(res.data);
        })
    },[])

    const handleLogOut = () => {
        localStorage.removeItem("authToken");
        navigate("/LogIn/Staff",{replace:true});
    }

    return (
        <>
            <h1>Staff {staff.firstName}</h1>
            <button type="submit" onClick={handleLogOut}>Log Out</button>
        </>
    )
}
export default StaffPage;