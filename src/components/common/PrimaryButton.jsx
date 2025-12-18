import React from "react";

const PrimaryButton = ({ text, onClick, type = "button" }) => (
    <button
        type={type}
        onClick={onClick}
        className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold py-2 rounded-lg shadow hover:shadow-lg transition-all hover:from-emerald-700 hover:to-green-700 hover:scale-[1.02]"
    >
        {text}
    </button>
);

export default PrimaryButton;
