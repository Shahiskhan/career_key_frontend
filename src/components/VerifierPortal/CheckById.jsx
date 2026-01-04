import React, { useState } from "react";
import { Search, X, Loader2, UserCircle } from "lucide-react";
import verifierService from "../../services/verifierService";

const CheckById = ({ setDocUrl, setResult, onClose }) => {
    const [studentId, setStudentId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!studentId.trim()) {
            setError("Please enter a valid Digital Degree ID.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await verifierService.verifyDegreeRequestById(studentId.trim());
            if (response.success) {
                setResult({ success: true, message: response.message });
                setDocUrl(response.data);
                onClose();
                document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
            } else {
                setError(response.message || "Credential not found.");
            }
        } catch (err) {
            console.error("Verification error:", err);
            setError("Verify service error. Please check if ID is correct.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 relative border border-emerald-100 overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-emerald-600 transition z-10">
                    <X className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="p-2 bg-emerald-100 rounded-xl">
                        <UserCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Verify via Digital ID</h3>
                </div>

                <p className="text-sm text-gray-600 mb-8 relative z-10">
                    Enter the unique Digital Degree ID or Student Tracking ID to fetch authenticated blockchain records.
                </p>

                <form onSubmit={handleSubmit} className="relative z-10">
                    <div className="relative mb-6">
                        <input
                            type="text"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="Enter Digital Degree ID"
                            disabled={loading}
                            className="w-full border-2 border-emerald-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition disabled:opacity-50 shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Searching Blockchain...
                            </>
                        ) : (
                            <>
                                <Search className="w-5 h-5" />
                                Verify Achievement
                            </>
                        )}
                    </button>
                </form>

                {error && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-start gap-3 relative z-10">
                        <X className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-100 text-center relative z-10">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                        Secured by CareerKey Security Protocol
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckById;
