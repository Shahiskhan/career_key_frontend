import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HeroSection from "../components/VerifierPortal/HeroSection";
import VerificationMethodCard from "../components/VerifierPortal/VerificationMethodCard";
import ScanByQRCode from "../components/VerifierPortal/ScanByQRCode";
import CheckById from "../components/VerifierPortal/CheckById";
import VerificationResult from "../components/VerifierPortal/VerificationResult";
import DocumentPreview from "../components/VerifierPortal/DocumentPreview";
import Navbar from "../components/Navbar";
import verifierService from "../services/verifierService";
import { Loader2, Scan, FileSearch } from "lucide-react";

const VerifierPortal = () => {
    const [searchParams] = useSearchParams();
    const [showQRModal, setShowQRModal] = useState(false);
    const [showIDModal, setShowIDModal] = useState(false);
    const [result, setResult] = useState(null);
    const [verificationData, setVerificationData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleNavigate = (section) => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    };

    // Handle incoming degreeRequestId from QR scan (Public Scan)
    useEffect(() => {
        const degreeRequestId = searchParams.get("degreeRequestId");
        if (degreeRequestId) {
            handleAutoVerify(degreeRequestId);
        }
    }, [searchParams]);

    const handleAutoVerify = async (requestId) => {
        setLoading(true);
        try {
            const response = await verifierService.verifyDegreeRequestById(requestId);
            if (response.success) {
                setResult({ success: true, message: response.message });
                setVerificationData(response.data);
                // Scroll to result after a short delay to allow rendering
                setTimeout(() => handleNavigate('result'), 500);
            } else {
                setResult({ success: false, message: response.message });
            }
        } catch (error) {
            console.error("Auto-verification failed:", error);
            setResult({ success: false, message: "Could not verify degree automatically. Please try manual check." });
        } finally {
            setLoading(false);
        }
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

                {loading && (
                    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                        <Loader2 className="w-16 h-16 text-emerald-600 animate-spin mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">Decrypting Blockchain Data...</h3>
                        <p className="text-gray-500">Connecting to secure verification nodes</p>
                    </div>
                )}

                <section id="verify" className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-12 mb-16 border border-emerald-100">
                    <div className="text-center mb-12">
                        <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Verification Hub</span>
                        <h3 className="text-4xl font-bold mt-3 mb-4 text-gray-900">Choose Verification Method</h3>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Securely verify academic credentials using blockchain-powered scanning or direct ID lookup.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <VerificationMethodCard
                            icon={<Scan className="w-8 h-8" />}
                            title="Scan QR / Upload"
                            description="Scan the QR code from the printed document or upload a digital copy to verify instantly."
                            buttonText="Open Scanner"
                            onClick={() => setShowQRModal(true)}
                            bgColor="bg-emerald-50/50"
                            iconColor="bg-emerald-100 text-emerald-600"
                        />
                        <VerificationMethodCard
                            icon={<FileSearch className="w-8 h-8" />}
                            title="Verify via Digital Degree ID"
                            description="Enter the unique Digital Degree ID to fetch and verify credentials directly from our database."
                            buttonText="Enter ID"
                            onClick={() => setShowIDModal(true)}
                            bgColor="bg-green-50/50"
                            iconColor="bg-green-100 text-green-600"
                        />
                    </div>
                </section>

                <div id="result">
                    <VerificationResult result={result} data={verificationData} />
                    {verificationData?.ipfsHash && (
                        <DocumentPreview docUrl={`https://ipfs.io/ipfs/${verificationData.ipfsHash}`} />
                    )}
                </div>

                {showQRModal && (
                    <ScanByQRCode
                        setDocUrl={setVerificationData}
                        setResult={setResult}
                        onClose={() => setShowQRModal(false)}
                    />
                )}
                {showIDModal && <CheckById setDocUrl={setVerificationData} setResult={setResult} onClose={() => setShowIDModal(false)} />}

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

