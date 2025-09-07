import React from "react";
import {Bars3Icon} from "@heroicons/react/20/solid/index.js";
import {HomeIcon} from "@heroicons/react/16/solid/index.js";
import {UserIcon} from "@heroicons/react/20/solid/index.js";
import {ClipboardDocumentListIcon} from "@heroicons/react/16/solid/index.js";
import {BanknotesIcon} from "@heroicons/react/16/solid/index.js";

function MenuStaff({ onClose }) {
    return (
        <div className="menu-staff">
            <button className="hover:bg-blue-900 p-3 px-4 rounded cursor-pointer" onClick={onClose}>
                <Bars3Icon className="h-6 w-6"/></button>

            {/* MenuStaff items */}
            <nav className="mt-1 flex flex-col space-y-2 bg-gray-400 rounded shadow-lg">
                <button className="flex gap-3 cursor-pointer px-4 py-2 m-1 rounded hover:bg-blue-900">
                    <HomeIcon className="h-6 w-6"/>Home</button>
                <button className="flex gap-3 cursor-pointer px-4 py-2 m-1 rounded hover:bg-blue-900">
                    <UserIcon className="h-6 w-6"/>Profile</button>
                <button className="flex gap-3 cursor-pointer px-4 py-2 m-1 rounded hover:bg-blue-900">
                    <ClipboardDocumentListIcon className="h-6 w-6"/> Appointments</button>
                <button className="flex gap-3 cursor-pointer px-4 py-2 m-1 rounded hover:bg-blue-900">
                    <BanknotesIcon className="h-6 w-6"/>Billing</button>
            </nav>
        </div>
    );
}

export default MenuStaff;
