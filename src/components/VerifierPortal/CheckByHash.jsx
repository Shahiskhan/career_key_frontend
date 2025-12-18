import React, { useState } from "react";

const CheckByHash = ({ setDocUrl, setResult, onClose }) => {
    const [hash, setHash] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!hash.trim()) {
            setResult({ status: "error", message: "❌ Please enter a valid Hash." });
            return;
        }
        // Validate hash format (basic check for blockchain hash)
        if (hash.length < 10) {
            setResult({ status: "error", message: "❌ Invalid hash format. Please enter a valid blockchain hash." });
            return;
        }

        // Mock IPFS URL from hash
        setDocUrl(`https://ipfs.io/ipfs/${hash}`);
        setResult({ status: "success", message: "✅ Document verified successfully using blockchain hash!" });
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
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Verify via Hash</h3>
                <p className="text-sm text-gray-600 mb-6">Enter the blockchain hash to verify the degree's authenticity on the blockchain.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Blockchain Hash</label>
                        <input
                            type="text"
                            value={hash}
                            onChange={(e) => setHash(e.target.value)}
                            placeholder="e.g., QmX7Y8Z9ABC123..."
                            className="w-full border-2 border-emerald-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition font-mono text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-1">Enter IPFS hash or blockchain transaction hash</p>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-green-700 transition shadow-md hover:shadow-lg"
                    >
                        🔍 Verify Hash
                    </button>
                </form>
                <p className="text-xs text-gray-400 mt-4 text-center">(Demo: Simulates blockchain hash verification)</p>
            </div>
        </div>
    );
};

export default CheckByHash;
