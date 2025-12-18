import React, { useState, useEffect } from "react";

const Attestations = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const storedRequests = JSON.parse(localStorage.getItem("attestationRequests") || "[]");
        if (storedRequests.length === 0) {
            // Initial mock data
            const mockRequests = [
                { id: 1, rollNo: "BCS-F22-E02", name: "Muhammad Shahis", status: "Pending University", feePaid: true, date: "2025-10-25", remarks: "" },
                { id: 2, rollNo: "BCS-F22-E08", name: "Nayyab Gull", status: "Pending HEC", feePaid: true, date: "2025-10-26", remarks: "Verified by Uni" },
            ];
            setRequests(mockRequests);
            localStorage.setItem("attestationRequests", JSON.stringify(mockRequests));
        } else {
            // Sort requests by ID descending (newest first)
            const sortedRequests = [...storedRequests].sort((a, b) => b.id - a.id);
            setRequests(sortedRequests);
        }
    }, []);

    const updateRequestStatus = (id, newStatus, remarks) => {
        const updatedRequests = requests.map(req =>
            req.id === id ? { ...req, status: newStatus, remarks: remarks } : req
        );
        setRequests(updatedRequests);
        localStorage.setItem("attestationRequests", JSON.stringify(updatedRequests));
    };

    const handleVerify = (id) => {
        const remarks = prompt("Enter remarks for approval (optional):", "Documents verified successfully.");
        if (remarks !== null) {
            updateRequestStatus(id, "Pending HEC", remarks);

            // Add student to University Student List if not already there
            const request = requests.find(r => r.id === id);
            if (request) {
                const existingStudents = JSON.parse(localStorage.getItem("universityStudents") || "[]");
                const studentExists = existingStudents.some(s => s.rollNo === request.rollNo);

                if (!studentExists) {
                    const newStudent = {
                        rollNo: request.rollNo,
                        name: request.name,
                        department: "CS", // Defaulting for now as it's not in the request
                        batch: "2022",    // Defaulting
                        status: "Active"
                    };
                    localStorage.setItem("universityStudents", JSON.stringify([...existingStudents, newStudent]));
                    console.log("Student added to University List:", newStudent);
                }
            }
            alert("Request verified and forwarded to HEC. Student added to University record.");
        }
    };

    const handleReject = (id) => {
        const remarks = prompt("Enter reason for rejection:", "Documents are incomplete/invalid.");
        if (remarks) {
            updateRequestStatus(id, "Rejected", remarks);
            alert("Request rejected.");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Attestation Requests</h3>
            {requests.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No pending requests.</p>
            ) : (
                <div className="space-y-4">
                    {requests.map((req) => (
                        <div key={req.id} className="p-5 bg-gray-50 rounded-xl border hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="font-semibold text-gray-800">{req.name}</p>
                                    <p className="text-sm text-gray-500">Roll No: {req.rollNo}</p>
                                    <p className="text-xs text-gray-400">ID: {req.id}</p>
                                </div>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${req.status === "Pending University" ? "bg-yellow-100 text-yellow-700" :
                                    req.status === "Pending HEC" ? "bg-blue-100 text-blue-700" :
                                        req.status === "Rejected" ? "bg-red-100 text-red-700" :
                                            "bg-green-100 text-green-700"
                                    }`}>
                                    {req.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                <div>
                                    <span className="text-gray-600 block">Fee Status:</span>
                                    <span className={req.paymentData || req.feePaid ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                                        {req.paymentData || req.feePaid ? "Paid ✅" : "Unpaid ❌"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600 block">Date:</span>
                                    <span className="text-gray-800">{req.date}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-gray-600 block">Degree:</span>
                                    <span className="text-gray-800">{req.degree}</span>
                                </div>
                                {req.remarks && (
                                    <div className="col-span-2 bg-gray-100 p-2 rounded text-xs text-gray-600 mt-2">
                                        <strong>Remarks:</strong> {req.remarks}
                                    </div>
                                )}
                            </div>

                            {req.status === "Pending University" && (
                                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => handleVerify(req.id)}
                                        className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition transform hover:-translate-y-0.5"
                                    >
                                        ✓ Verify & Forward to HEC
                                    </button>
                                    <button
                                        onClick={() => handleReject(req.id)}
                                        className="px-4 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-200 transition"
                                    >
                                        ✕ Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Attestations;
