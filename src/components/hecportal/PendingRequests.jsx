import React, { useState, useEffect } from "react";

const PendingRequests = () => {
    const [headerRequests, setHecRequests] = useState([]);

    useEffect(() => {
        // Load all requests but filter for those pending HEC
        const allRequests = JSON.parse(localStorage.getItem("attestationRequests") || "[]");
        const pending = allRequests.filter(req => req.status === "Pending HEC");
        setHecRequests(pending);
    }, []);

    const updateRequestStatus = (id, newStatus, remarks) => {
        const allRequests = JSON.parse(localStorage.getItem("attestationRequests") || "[]");
        const updatedRequests = allRequests.map(req =>
            req.id === id ? { ...req, status: newStatus, remarks: `HEC: ${remarks}` } : req
        );
        localStorage.setItem("attestationRequests", JSON.stringify(updatedRequests));

        // Update local state to remove the processed request
        setHecRequests(headerRequests.filter(req => req.id !== id));
    };

    const handleApprove = (id) => {
        const remarks = prompt("Enter HEC verification remarks (optional):", "Verified by HEC.");
        if (remarks !== null) {
            updateRequestStatus(id, "Verified", remarks);
            alert("Request successfully verified by HEC!");
        }
    };

    const handleReject = (id) => {
        const remarks = prompt("Enter reason for rejection:", "Document discrepancy.");
        if (remarks) {
            updateRequestStatus(id, "Rejected by HEC", remarks);
            alert("Request rejected by HEC.");
        }
    };

    return (
        <div>
            <h2 className="font-bold text-2xl mb-6 text-gray-900">Pending Attestation Requests</h2>
            <div className="bg-white rounded-2xl shadow p-4">
                {headerRequests.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No pending requests for HEC at the moment.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-indigo-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-indigo-900">Student Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-indigo-900">Roll No</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-indigo-900">CNIC</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-indigo-900">Degree</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-indigo-900">Date</th>
                                    <th className="px-4 py-3 text-center text-xs font-bold text-indigo-900">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {headerRequests.map((req) => (
                                    <tr key={req.id} className="border-b hover:bg-indigo-50 transition">
                                        <td className="px-4 py-3 text-sm">{req.name}</td>
                                        <td className="px-4 py-3 text-sm">{req.rollNo}</td>
                                        <td className="px-4 py-3 text-sm">{req.cnic}</td>
                                        <td className="px-4 py-3 text-sm">{req.degree}</td>
                                        <td className="px-4 py-3 text-sm">{req.date}</td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded shadow hover:bg-green-700"
                                                    onClick={() => handleApprove(req.id)}
                                                >
                                                    Verify
                                                </button>
                                                <button
                                                    className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded shadow hover:bg-red-700"
                                                    onClick={() => handleReject(req.id)}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingRequests;
