import React, { useState } from "react";

const CheckById = ({ setDocUrl, setResult, onClose }) => {
    const [studentId, setStudentId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!studentId.trim()) {
            setResult({ status: "error", message: "❌ Please enter a valid Student ID." });
            return;
        }
        const mockHash = `QmStudentHash${studentId}`;
        setDocUrl(`https://ipfs.io/ipfs/${mockHash}`);
        setResult({ status: "success", message: "✅ Document found for Student ID." });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative border-2 border-emerald-100">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-emerald-600 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Verify via Student ID</h3>
                <p className="text-sm text-gray-600 mb-6">Enter the student's unique ID to fetch and verify their degree details.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="e.g., BCS-F22-E02"
                        className="w-full border-2 border-emerald-200 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    />
                    <button
                        type="submit"
                        className="w-full px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-green-700 transition shadow-md hover:shadow-lg"
                    >
                        🔍 Verify Now
                    </button>
                </form>
                <p className="text-xs text-gray-400 mt-4 text-center">(Demo: Simulates blockchain lookup)</p>
            </div>
        </div>
    );
};

export default CheckById;

