import React from "react";
import StudentNavbar from "../components/studentportal/StudentNavbar";
import AttestationRequestForm from "../components/studentportal/AttestationRequestForm";

const AttestationPage = ({ onNavigate }) => {
    const handleAttestationSubmit = (data) => {
        // Create a new request object
        const newRequest = {
            id: Date.now(), // Simple unique ID
            ...data,
            studentEmail: localStorage.getItem("studentEmail"), // Associate request with current user
            status: "Pending University",
            date: new Date().toISOString().split('T')[0],
            remarks: ""
        };

        // Get existing requests from localStorage
        const existingRequests = JSON.parse(localStorage.getItem("attestationRequests") || "[]");

        // Add new request
        const updatedRequests = [...existingRequests, newRequest];

        // Save back to localStorage
        localStorage.setItem("attestationRequests", JSON.stringify(updatedRequests));

        alert("Attestation request submitted successfully! It has been sent to the University Portal.");
        console.log("New Request Saved:", newRequest);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-50">
            <div className="container mx-auto px-4 pt-6">
                <StudentNavbar activeSection="attestation" onNavigate={onNavigate} />
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">📋 Attestation Request</h1>
                    <p className="text-gray-600">Submit your attestation request form here</p>
                </div>

                <AttestationRequestForm onSubmit={handleAttestationSubmit} />
            </div>

            <footer className="py-6 text-center text-gray-500 text-sm border-t mt-16">
                © 2025 CareerKey – All Rights Reserved.
            </footer>
        </div>
    );
};

export default AttestationPage;
