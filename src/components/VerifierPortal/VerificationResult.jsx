import React from "react";
import { CheckCircle, XCircle, FileText, User, School, Link, Hash, Activity } from "lucide-react";

const VerificationResult = ({ result, data }) => {
    if (!result) return null;

    if (result.success === false) {
        return (
            <div className="max-w-4xl mx-auto my-8 p-8 bg-red-50/50 backdrop-blur-md rounded-3xl shadow-xl border border-red-100 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                    <XCircle className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h3>
                <p className="text-red-700 font-medium text-lg">{result.message}</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="max-w-5xl mx-auto my-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Success Banner */}
            <div className="bg-emerald-600 rounded-t-3xl p-6 text-white flex items-center justify-center gap-3 shadow-lg">
                <CheckCircle className="w-8 h-8" />
                <h2 className="text-2xl font-bold">Credential Verified Authentically</h2>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border-x border-b border-emerald-100 rounded-b-3xl shadow-2xl overflow-hidden p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Column: Student & Degree Info */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <User className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Student Information</h3>
                            </div>
                            <div className="space-y-4 bg-emerald-50/30 p-6 rounded-2xl border border-emerald-50">
                                <InfoItem label="Full Name" value={data.studentName} />
                                <InfoItem label="CNIC" value={data.studentCnic} />
                                <InfoItem label="University" value={data.universityName} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <FileText className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Academic Details</h3>
                            </div>
                            <div className="space-y-4 bg-emerald-50/30 p-6 rounded-2xl border border-emerald-50">
                                <InfoItem label="Program" value={data.program} />
                                <InfoItem label="Roll Number" value={data.rollNumber} />
                                <InfoItem label="Passing Year" value={data.passingYear} />
                                <InfoItem label="CGPA" value={data.cgpa} />
                                <InfoItem label="Issue Date" value={data.requestDate ? new Date(data.requestDate).toLocaleDateString() : 'N/A'} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Blockchain Proof */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <Hash className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Blockchain Integrity</h3>
                            </div>
                            <div className="space-y-4 bg-emerald-50/30 p-6 rounded-2xl border border-emerald-50">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 font-medium">Verification Status</span>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold ring-1 ring-green-200 uppercase">
                                        SECURED
                                    </span>
                                </div>
                                <InfoItem label="Transaction Hash" value={data.transactionHash} isMono isBreakAll />
                                <InfoItem label="Block ID" value={data.blockNumber} />
                                <div className="pt-4">
                                    <a
                                        href={`https://ipfs.io/ipfs/${data.ipfsHash}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600/10 text-emerald-700 text-sm font-bold rounded-xl hover:bg-emerald-600 hover:text-white transition group"
                                    >
                                        <Link className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        View Original Asset on IPFS
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-emerald-100 text-center">
                    <p className="text-gray-500 text-sm italic">
                        The integrity of this document is secured by the CareerKey Blockchain Network.
                        Digital Fingerprint Verification was completed on {new Date().toLocaleString()}.
                    </p>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value, isMono = false, isBreakAll = false }) => (
    <div className="space-y-1">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">{label}</p>
        <p className={`text-gray-900 font-medium ${isMono ? 'font-mono text-sm' : ''} ${isBreakAll ? 'break-all bg-white p-2 rounded border border-emerald-50' : ''}`}>
            {value || 'Not available'}
        </p>
    </div>
);

export default VerificationResult;
