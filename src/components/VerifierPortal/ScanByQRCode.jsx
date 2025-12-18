import React, { useRef } from "react";

const ScanByQRCode = ({ setDocUrl, setResult, onClose }) => {
    const fileInput = useRef(null);

    const handleFileSelect = () => {
        const mockHash = "QmExampleHash12345ABC";
        setDocUrl(`https://ipfs.io/ipfs/${mockHash}`);
        setResult({ status: "success", message: "✅ Document verified successfully!" });
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
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Scan QR / Upload Document</h3>
                <p className="text-sm text-gray-600 mb-6">Upload the file or scan the QR code on the degree to verify its authenticity.</p>
                <button
                    onClick={() => fileInput.current.click()}
                    className="w-full px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-green-700 transition shadow-md hover:shadow-lg"
                >
                    📁 Upload File / Scan QR
                </button>
                <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileSelect}
                    ref={fileInput}
                    className="hidden"
                />
                <p className="text-xs text-gray-400 mt-4 text-center">(Demo: Simulates QR scan & IPFS lookup)</p>
            </div>
        </div>
    );
};

export default ScanByQRCode;

