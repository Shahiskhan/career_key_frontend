import React from "react";

const AuthCard = ({ title, children }) => (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">{title}</h2>
        {children}
    </div>
);

export default AuthCard;
