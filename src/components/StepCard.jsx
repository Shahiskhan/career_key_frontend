import React from "react";

const StepCard = ({ step, title, description }) => (
    <div className="flex flex-col items-center text-center group">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            {step}
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg">
            <h3 className="font-bold text-xl mb-3 text-emerald-700">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    </div>
);

export default StepCard;

