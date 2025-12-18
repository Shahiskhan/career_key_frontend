import React from "react";

const Header = ({ title, universityName }) => (
    <header className="bg-white shadow-sm border-b px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">{universityName}</p>
        </div>
        <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                🔔
            </button>
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold">
                    A
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-800">Admin</p>
                    <p className="text-xs text-gray-500">Registrar</p>
                </div>
            </div>
        </div>
    </header>
);

export default Header;
