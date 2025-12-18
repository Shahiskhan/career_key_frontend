import React, { useState } from "react";
import VerifierNavbar from "../components/VerifierPortal/VerifierNavbar";
import HeroSection from "../components/VerifierPortal/HeroSection";
import VerificationMethodCard from "../components/VerifierPortal/VerificationMethodCard";
import ScanByQRCode from "../components/VerifierPortal/ScanByQRCode";
import CheckById from "../components/VerifierPortal/CheckById";
import CheckByHash from "../components/VerifierPortal/CheckByHash";
import VerificationResult from "../components/VerifierPortal/VerificationResult";
import DocumentPreview from "../components/VerifierPortal/DocumentPreview";
import Navbar from "../components/Navbar";
const VerifierPortal = () => {
    const [showQRModal, setShowQRModal] = useState(false);
    const [showIDModal, setShowIDModal] = useState(false);
    const [showHashModal, setShowHashModal] = useState(false);
    const [result, setResult] = useState(null);
    const [docUrl, setDocUrl] = useState(null);

    const handleNavigate = (section) => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-50">
            {/* Background shapes with green theme */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 -left-40 w-80 h-80 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-emerald-100 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
                <Navbar onNavigate={handleNavigate} />

                <div id="home">
                    <HeroSection onStartVerification={() => handleNavigate('verify')} />
                </div>

                <section id="verify" className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-12 mb-16 border border-emerald-100">
                    <div className="text-center mb-12">
                        <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Verification Methods</span>
                        <h3 className="text-4xl font-bold mt-3 mb-4 text-gray-900">Choose Your Verification Method</h3>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Select the method that works best for you to verify academic credentials
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <VerificationMethodCard
                            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20H8a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V18a2 2 0 01-2 2z" /></svg>}
                            title="Scan QR / Upload Document"
                            description="Upload the file or scan the QR code on the degree to verify its authenticity instantly."
                            buttonText="Upload / Scan Now"
                            onClick={() => setShowQRModal(true)}
                            bgColor="bg-emerald-50/50"
                            iconColor="bg-emerald-100 text-emerald-600"
                        />
                        <VerificationMethodCard
                            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>}
                            title="Verify via Student ID"
                            description="Enter the student's unique ID to fetch and verify their degree details from the blockchain."
                            buttonText="Enter ID"
                            onClick={() => setShowIDModal(true)}
                            bgColor="bg-green-50/50"
                            iconColor="bg-green-100 text-green-600"
                        />
                        <VerificationMethodCard
                            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>}
                            title="Verify via Blockchain Hash"
                            description="Enter the blockchain hash to directly verify the degree's authenticity from the blockchain."
                            buttonText="Enter Hash"
                            onClick={() => setShowHashModal(true)}
                            bgColor="bg-teal-50/50"
                            iconColor="bg-teal-100 text-teal-600"
                        />
                    </div>
                </section>

                <div id="result">
                    <VerificationResult result={result} />
                    <DocumentPreview docUrl={docUrl} />
                </div>

                {showQRModal && <ScanByQRCode setDocUrl={setDocUrl} setResult={setResult} onClose={() => setShowQRModal(false)} />}
                {showIDModal && <CheckById setDocUrl={setDocUrl} setResult={setResult} onClose={() => setShowIDModal(false)} />}
                {showHashModal && <CheckByHash setDocUrl={setDocUrl} setResult={setResult} onClose={() => setShowHashModal(false)} />}

                <footer className="mt-16 py-8 text-center border-t border-emerald-200">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} <span className="font-semibold text-emerald-600">CareerKey</span> – All Rights Reserved.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Powered by Blockchain Technology</p>
                </footer>
            </div>
        </div>
    );
};

export default VerifierPortal;


