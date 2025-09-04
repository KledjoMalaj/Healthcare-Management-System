import StaffCard from "../Cards/StaffCard.jsx";
import PatientCard from "../Cards/PatientCard.jsx";

function HomePage() {
    return (
        <>
            <nav className="bg-blue-900 text-white shadow-md rounded m-0.5">
                <div className="max-w-7xl mx-auto px-4">
                    <ul className="flex justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8
                    py-1 text-lg ">
                        <li className="nav-item">Home</li>
                        <li className="nav-item">About</li>
                        <li className="nav-item">Contacts</li>
                    </ul>
                </div>
            </nav>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-items-center mt-2 p-2">
                <div className="bg-white w-100 h-100 rounded">
                <StaffCard/>
                </div>
                <div className="bg-white w-100 h-100 rounded">
                <PatientCard/>
                </div>
            </div>
        </>
    )
}
export default HomePage