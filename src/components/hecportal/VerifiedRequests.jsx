import React, { useState, useEffect } from "react";

const VerifiedRequests = () => {
    const [verifiedRequests, setVerifiedRequests] = useState([]);

    useEffect(() => {
        const allRequests = JSON.parse(localStorage.getItem("attestationRequests") || "[]");
        const verified = allRequests.filter(req => req.status === "Verified");
        setVerifiedRequests(verified);
    }, []);

    return (
        <div>
            <h2 className="font-bold text-2xl mb-6 text-gray-900">Verified Requests</h2>
            <div className="bg-white rounded-2xl shadow p-4">
                {verifiedRequests.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No verified requests found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-green-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-green-700">Student Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-green-700">Roll No</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-green-700">Degree</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-green-700">Date Verified</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-green-700">Blockchain Hash</th>
                                    <th className="px-4 py-3 text-center text-xs font-bold text-green-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {verifiedRequests.map((req) => (
                                    <tr key={req.id} className="border-b hover:bg-green-50 transition">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{req.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{req.rollNo}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{req.degree}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{req.date}</td>
                                        <td className="px-4 py-3 text-xs font-mono text-emerald-600 cursor-pointer hover:underline">
                                            {req.txHash || `0x${req.id}123abc...`}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                                                Verified
                                            </span>
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

export default VerifiedRequests;
