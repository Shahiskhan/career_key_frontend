import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ admin }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-emerald-900 text-white shadow-lg sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white font-extrabold text-2xl">
                    HEC
                </div>
                <h1 className="font-bold text-2xl tracking-tight">HEC Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
                <span className="font-semibold text-lg">{admin?.name || "Admin"}</span>
                <button
                    onClick={handleLogout}
                    className="bg-white hover:bg-gray-100 px-4 py-1 text-emerald-900 font-bold rounded-xl shadow-md transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
