import React, { useState } from "react";
import StudentNavbar from "../components/studentportal/StudentNavbar";
import JobRecommendations from "../components/studentportal/JobRecommendations";

const VerificationModal = ({ isOpen, onClose, onVerify }) => {
    const [cnic, setCnic] = useState("");
    const [errors, setErrors] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerify = async () => {
        setErrors("");

        if (!cnic.trim()) {
            setErrors("Please enter your CNIC");
            return;
        }

        const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
        if (!cnicRegex.test(cnic)) {
            setErrors("Please enter a valid CNIC format (e.g., 12345-1234567-1)");
            return;
        }

        setIsVerifying(true);

        // Simulate verification
        setTimeout(() => {
            setIsVerifying(false);
            onVerify(cnic);
            setCnic("");
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-emerald-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-t-2xl">
                    <h2 className="text-2xl font-bold">🆔 CNIC Verification Required</h2>
                    <p className="text-emerald-50 text-sm mt-1">Verify your CNIC to view job recommendations</p>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                        <p className="text-sm text-emerald-800">
                            To access job recommendations, please verify your CNIC. This helps us provide personalized opportunities matching your profile.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Your CNIC *</label>
                        <input
                            type="text"
                            value={cnic}
                            onChange={(e) => {
                                setCnic(e.target.value);
                                if (errors) setErrors("");
                            }}
                            placeholder="e.g., 12345-1234567-1"
                            onKeyPress={(e) => e.key === "Enter" && handleVerify()}
                            className={`w-full px-4 py-3 border ${errors ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                        />
                        {errors && <p className="text-red-500 text-sm mt-2">{errors}</p>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleVerify}
                            disabled={isVerifying}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed hover:from-emerald-700 hover:to-green-700"
                        >
                            {isVerifying ? "Verifying..." : "✅ Verify CNIC"}
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                        Test CNIC: 12345-1234567-1
                    </p>
                </div>
            </div>
        </div>
    );
};

const JobRecommendationsPage = ({ onNavigate }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [showVerification, setShowVerification] = useState(true);
    const [verifiedCnic, setVerifiedCnic] = useState("");

    const jobs = [
        { title: "Full Stack Developer", company: "Tech Corp", location: "Lahore", matchScore: 92 },
        { title: "Backend Engineer", company: "Innovate Ltd", location: "Islamabad", matchScore: 88 },
        { title: "AI Engineer", company: "DataWorks", location: "Karachi", matchScore: 85 },
        { title: "Frontend Developer", company: "Web Solutions", location: "Lahore", matchScore: 90 },
        { title: "DevOps Engineer", company: "Cloud Systems", location: "Islamabad", matchScore: 87 },
        { title: "Mobile Developer", company: "App Creators", location: "Karachi", matchScore: 89 },
    ];

    const handleVerifySuccess = (cnic) => {
        setIsVerified(true);
        setVerifiedCnic(cnic);
        setShowVerification(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-50">
            <div className="container mx-auto px-4 pt-6">
                <StudentNavbar activeSection="jobs" onNavigate={onNavigate} />
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">💼 Job Recommendations</h1>
                    <p className="text-gray-600">View AI-powered job recommendations tailored for you</p>
                    {isVerified && (
                        <p className="text-sm text-emerald-600 mt-2">✅ Verified with CNIC: {verifiedCnic}</p>
                    )}
                </div>

                {isVerified ? (
                    <JobRecommendations jobs={jobs} />
                ) : (
                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-12 text-center border border-emerald-50">
                        <div className="text-6xl mb-4">🔒</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Verification Required</h2>
                        <p className="text-gray-600 mb-8">Verify your CNIC to access job recommendations</p>
                        <button
                            onClick={() => setShowVerification(true)}
                            className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-lg hover:shadow-lg transition hover:from-emerald-700 hover:to-green-700"
                        >
                            🆔 Verify My CNIC
                        </button>
                    </div>
                )}
            </div>

            {/* Verification Modal */}
            <VerificationModal
                isOpen={showVerification}
                onClose={() => setShowVerification(false)}
                onVerify={handleVerifySuccess}
            />

            <footer className="py-6 text-center text-gray-500 text-sm border-t mt-16">
                © 2025 CareerKey – All Rights Reserved.
            </footer>
        </div>
    );
};

export default JobRecommendationsPage;
