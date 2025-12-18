import React from "react";

const FeatureCard = ({ title, description, icon }) => (
    <div className="group bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100 hover:border-emerald-300">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl bg-gradient-to-br from-emerald-100 to-green-100 group-hover:from-emerald-200 group-hover:to-green-200 transition-all duration-300">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

export default FeatureCard;

