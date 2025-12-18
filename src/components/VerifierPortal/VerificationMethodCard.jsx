import React from "react";

const VerificationMethodCard = ({ icon, title, description, buttonText, onClick, bgColor, iconColor }) => (
    <div className={`p-8 border-2 ${bgColor === 'bg-emerald-50/50' ? 'border-emerald-200' : 'border-green-200'} rounded-2xl hover:shadow-xl transition transform hover:-translate-y-1 text-center flex flex-col items-center ${bgColor} hover:border-emerald-300`}>
        <div className={`w-16 h-16 ${iconColor} rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
            {icon}
        </div>
        <h4 className="font-bold text-xl mb-2 text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{description}</p>
        <button
            onClick={onClick}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm font-semibold rounded-lg shadow hover:shadow-md transition hover:from-emerald-700 hover:to-green-700"
        >
            {buttonText}
        </button>
    </div>
);

export default VerificationMethodCard;

