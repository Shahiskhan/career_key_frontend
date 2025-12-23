import React from "react";

const PrimaryButton = ({ text, onClick, type = "button", disabled = false }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold py-2 rounded-lg shadow transition-all
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:from-emerald-700 hover:to-green-700 hover:scale-[1.02]'}`}
    >
        {text}
    </button>
);

export default PrimaryButton;

