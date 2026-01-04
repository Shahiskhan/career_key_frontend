import React, { useState, useRef, useEffect } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import ImageCropper from "../common/ImageCropper";
import jsQR from "jsqr";
import verifierService from "../../services/verifierService";
import { Camera, Upload, X, Loader2, ScanLine } from "lucide-react";

const ScanByQRCode = ({ setDocUrl, setResult, onClose }) => {
    const [mode, setMode] = useState(null); // 'camera' or 'gallery'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageToCrop, setImageToCrop] = useState(null);
    const fileInputRef = useRef(null);
    const scannerRef = useRef(null);

    // Initialize Camera Scanner
    useEffect(() => {
        if (mode === 'camera') {
            const html5QrCode = new Html5Qrcode("reader");
            scannerRef.current = html5QrCode;

            const config = { fps: 10, qrbox: { width: 250, height: 250 } };

            html5QrCode.start(
                { facingMode: "environment" },
                config,
                (decodedText) => {
                    handleQRScanned(decodedText);
                    html5QrCode.stop().catch(console.error);
                },
                (errorMessage) => {
                    // console.log(errorMessage);
                }
            ).catch(err => {
                console.error("Camera error:", err);
                setError("Could not access camera. Please check permissions.");
                setMode(null);
            });

            return () => {
                if (scannerRef.current && scannerRef.current.isScanning) {
                    scannerRef.current.stop().catch(console.error);
                }
            };
        }
    }, [mode]);

    const handleQRScanned = async (qrData) => {
        setLoading(true);
        setError(null);
        try {
            // Check if the QR data is a URL or just the ID
            let requestId = qrData;
            if (qrData.includes("degreeRequestId=")) {
                const urlParams = new URLSearchParams(qrData.split('?')[1]);
                requestId = urlParams.get("degreeRequestId");
            } else if (qrData.includes("/")) {
                // If it's a full URL path like /verify/UUID
                const parts = qrData.split('/');
                requestId = parts[parts.length - 1];
            }

            const response = await verifierService.verifyDegreeRequestById(requestId);
            if (response.success) {
                setResult({ success: true, message: response.message });
                setDocUrl(response.data); // Setting the full DTO as data
                onClose();
                // Scroll to result section
                document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
            } else {
                setError(response.message || "Verification failed");
            }
        } catch (err) {
            console.error("Verification error:", err);
            setError("Error contacting verification server. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setImageToCrop(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleCropComplete = async (croppedImage) => {
        setImageToCrop(null);
        setLoading(true);

        // Use jsQR to decode the QR code from the cropped image
        const img = new Image();
        img.src = croppedImage;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                handleQRScanned(code.data);
            } else {
                setError("No QR code found in the selected area. Please try again.");
                setLoading(false);
            }
        };
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden border border-emerald-100 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-emerald-50 flex items-center justify-between bg-emerald-50/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <ScanLine className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Scan & Verify Degree</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition text-gray-400 hover:text-emerald-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto">
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                            <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
                            <p className="text-emerald-700 font-medium">Verifying Credential on Blockchain...</p>
                        </div>
                    )}

                    {!loading && !mode && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <button
                                onClick={() => setMode('camera')}
                                className="group flex flex-col items-center p-8 bg-emerald-50 hover:bg-emerald-100/50 rounded-3xl border-2 border-dashed border-emerald-200 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                    <Camera className="w-8 h-8 text-emerald-600" />
                                </div>
                                <span className="font-bold text-gray-900">Use Camera</span>
                                <span className="text-xs text-gray-500 mt-2 text-center">Scan QR code directly from your printed degree</span>
                            </button>

                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="group flex flex-col items-center p-8 bg-green-50 hover:bg-green-100/50 rounded-3xl border-2 border-dashed border-green-200 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8 text-green-600" />
                                </div>
                                <span className="font-bold text-gray-900">Upload Receipt</span>
                                <span className="text-xs text-gray-500 mt-2 text-center">Upload an image and crop the QR code area</span>
                            </button>
                        </div>
                    )}

                    {mode === 'camera' && !loading && (
                        <div className="space-y-6">
                            <div id="reader" className="w-full rounded-2xl overflow-hidden border-4 border-emerald-100 shadow-inner"></div>
                            <button
                                onClick={() => setMode(null)}
                                className="w-full py-3 text-emerald-600 font-semibold hover:bg-emerald-50 rounded-xl transition"
                            >
                                Switch to Upload
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-medium">
                            <X className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="hidden"
                    />
                </div>

                <div className="p-6 bg-gray-50/50 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400">
                        Supports high-resolution scanning of HEC and University issued QR codes.
                    </p>
                </div>
            </div>

            {imageToCrop && (
                <ImageCropper
                    image={imageToCrop}
                    onCropComplete={handleCropComplete}
                    onCancel={() => setImageToCrop(null)}
                />
            )}
        </div>
    );
};

export default ScanByQRCode;
