import React from "react";

const TestimonialCard = ({ text, name, role }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
        <div className="flex items-start mb-6">
            <div className="text-yellow-400 text-2xl">
                {"★★★★★"}
            </div>
        </div>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">"{text}"</p>
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-lg">
                {name.charAt(0)}
            </div>
            <div>
                <div className="font-bold text-slate-800">{name}</div>
                <div className="text-sm text-emerald-600">{role}</div>
            </div>
        </div>
    </div>
);

export default TestimonialCard;

