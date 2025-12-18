import React, { useState } from "react";

const DocumentCard = ({ name, status, date, hash, onView }) => (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-emerald-50 hover:shadow-lg transition hover:border-emerald-200">
        <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-lg text-gray-800">{name}</h4>
            <span className={`px - 3 py - 1 text - xs font - semibold rounded - full ${status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'} `}>
                {status}
            </span>
        </div>
        <p className="text-sm text-gray-500 mb-2">📅 Submitted: {date}</p>
        {hash && <p className="text-xs text-gray-400 mb-4">🔗 IPFS: {hash.slice(0, 20)}...</p>}
        <button
            onClick={onView}
            className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-700 hover:to-green-700 transition shadow-md"
        >
            View Document
        </button>
    </div>
);

const MyDocuments = ({ documents }) => {
    const [selectedDoc, setSelectedDoc] = useState(null);

    return (
        <section id="documents" className="mb-10">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 text-center">📂 My Documents</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc, index) => (
                    <DocumentCard key={index} {...doc} onView={() => setSelectedDoc(doc)} />
                ))}
            </div>

            {/* Document Viewer Modal */}
            {selectedDoc && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-0 overflow-hidden animate-fade-in">
                        <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white p-6 flex justify-between items-center">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                📄 {selectedDoc.name}
                            </h3>
                            <button
                                onClick={() => setSelectedDoc(null)}
                                className="text-white/80 hover:text-white text-2xl font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Document Preview Placeholder */}
                                <div className="w-full md:w-1/2 bg-gray-100 border-2 border-gray-200 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-gray-400 min-h-[300px]">
                                    <span className="text-6xl mb-4">🎓</span>
                                    <p className="text-sm font-medium text-center">Document Preview</p>
                                    <p className="text-xs text-center mt-2">(This is a generated preview)</p>
                                    <div className="mt-6 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-2/3"></div>
                                    </div>
                                    <div className="mt-2 w-3/4 h-2 bg-gray-200 rounded-full"></div>
                                </div>

                                {/* Details */}
                                <div className="w-full md:w-1/2 space-y-5">
                                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                        <p className="text-sm text-emerald-800 font-bold mb-1">Status</p>
                                        <div className="flex items-center gap-2">
                                            <span className={`w - 3 h - 3 rounded - full ${selectedDoc.status === 'Verified' ? 'bg-green-500' : 'bg-amber-500'} `}></span>
                                            <span className="font-semibold text-gray-900">{selectedDoc.status}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Submission Date</p>
                                        <p className="text-gray-900 font-semibold">{selectedDoc.date}</p>
                                    </div>

                                    {selectedDoc.details && (
                                        <>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Student Info</p>
                                                <p className="text-gray-900">{selectedDoc.details.name}</p>
                                                <p className="text-xs text-gray-500">{selectedDoc.details.rollNo}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">University</p>
                                                <p className="text-gray-900">{selectedDoc.details.university}</p>
                                            </div>
                                        </>
                                    )}

                                    {selectedDoc.hash && (
                                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 break-all">
                                            <p className="text-xs text-gray-500 font-mono mb-1">Blockchain Hash</p>
                                            <p className="text-xs font-mono text-emerald-600">{selectedDoc.hash}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 flex justify-end gap-3 border-t">
                            <button
                                onClick={() => setSelectedDoc(null)}
                                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
                            >
                                Close View
                            </button>
                            {selectedDoc.status === 'Verified' && (
                                <button className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition shadow-lg flex items-center gap-2">
                                    ⬇️ Download
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MyDocuments;
