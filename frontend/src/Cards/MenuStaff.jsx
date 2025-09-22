import {Bars3Icon} from "@heroicons/react/20/solid/index.js";
import {HomeIcon} from "@heroicons/react/16/solid/index.js";
import {UserIcon} from "@heroicons/react/20/solid/index.js";
import {ClipboardDocumentListIcon} from "@heroicons/react/16/solid/index.js";
import {BanknotesIcon} from "@heroicons/react/16/solid/index.js";
import {FaceSmileIcon} from "@heroicons/react/16/solid/index.js";

function MenuStaff({ onClose, setPage }) {

    return (
        <div className="menu-staff">
            <button className="hover:bg-gradient-to-b hover:from-blue-700 hover:to-blue-900
            p-3 px-4 rounded cursor-pointer" onClick={onClose}>
                <Bars3Icon className="h-6 w-6"/></button>

            <nav className="mt-1 flex flex-col space-y-2 bg-gray-400 rounded shadow-lg">
                <button className="text-gray-600 font-semibold hover:text-white flex gap-3 cursor-pointer px-4 py-2 m-1 rounded hover:bg-gradient-to-r hover:from-blue-800 hover:to-sky-600"
                onClick={() => { setPage("Home"); onClose()}}>
                    <HomeIcon className="h-6 w-6"/>Home</button>
                <button className="text-gray-600 font-semibold hover:text-white flex gap-3 cursor-pointer px-4 py-2 m-1 rounded hover:bg-gradient-to-r hover:from-blue-800 hover:to-sky-600"
                onClick={()=> { setPage("Profile"); onClose()}}>
                    <UserIcon className="h-6 w-6"/>Profile</button>
                <button className="text-gray-600 font-semibold hover:text-white flex gap-3 cursor-pointer px-4 py-2 m-1 rounded hover:bg-gradient-to-r hover:from-blue-800 hover:to-sky-600"
                        onClick={()=> { setPage("Patients"); onClose()}}>
                    <FaceSmileIcon className="h-5 w-5"/>Patients</button>
                <button className="text-gray-600 font-semibold hover:text-white flex gap-3 cursor-pointer px-4 py-2 m-1 rounded hover:bg-gradient-to-r hover:from-blue-800 hover:to-sky-600"
                onClick={() => { setPage("Appointments"); onClose()}}>
                    <ClipboardDocumentListIcon className="h-6 w-6"/> Appointments</button>
                <button className="text-gray-600 font-semibold hover:text-white flex gap-3 cursor-pointer px-4 py-2 m-1 rounded hover:bg-gradient-to-r hover:from-blue-800 hover:to-sky-600"
                onClick={() => { setPage("Billing"); onClose() }}>
                    <BanknotesIcon className="h-6 w-6"/>Billing</button>
            </nav>
        </div>
    );
}

export default MenuStaff;
