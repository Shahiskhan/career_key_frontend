import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import { CheckCircle2, School, ShieldCheck, Info } from "lucide-react";

const UniversityRegistration = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        image: "",
        universityName: "",
        city: "",
        charterNumber: "",
        issuingAuthority: "",
        hecRecognized: true
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { registerUniversity, isLoading } = useAuth();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        setError("");
        setSuccess("");
    };

    const validateForm = () => {
        if (!formData.email || !formData.password || !formData.name || !formData.universityName || !formData.city || !formData.charterNumber || !formData.issuingAuthority) {
            setError("All required fields (*) must be filled.");
            return false;
        }
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!validateForm()) return;

        try {
            await registerUniversity(formData);
            setSuccess("✓ University registered successfully on CareerKey!");

            // Success reset
            setFormData({
                email: "",
                password: "",
                name: "",
                image: "",
                universityName: "",
                city: "",
                charterNumber: "",
                issuingAuthority: "",
                hecRecognized: true
            });
        } catch (err) {
            console.error("Registration error:", err);
            setError(err.response?.data?.message || "Registration failed. Check if email exists.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto animate-fadeIn">
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-emerald-100 p-3 rounded-2xl shadow-sm">
                    <School className="w-8 h-8 text-emerald-700" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">University Onboarding</h1>
                    <p className="text-gray-500 font-medium">Add a new educational institution to the CareerKey ecosystem</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl shadow-xl shadow-emerald-600/5 p-8 border border-emerald-50">
                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-6 border border-red-200 animate-shake">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-emerald-50 text-emerald-700 text-sm px-4 py-3 rounded-xl mb-6 border border-emerald-200 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                <span className="font-semibold">{success}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Admin Full Name *"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter admin's name"
                                    required
                                />
                                <InputField
                                    label="Admin Email Address *"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="university@example.edu.pk"
                                    required
                                />
                                <InputField
                                    label="Login Password *"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Minimum 8 characters"
                                    required
                                />
                                <InputField
                                    label="University Full Name *"
                                    name="universityName"
                                    value={formData.universityName}
                                    onChange={handleChange}
                                    placeholder="e.g. NED University"
                                    required
                                />
                                <InputField
                                    label="City *"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="e.g. Karachi"
                                    required
                                />
                                <InputField
                                    label="Charter Number *"
                                    name="charterNumber"
                                    value={formData.charterNumber}
                                    onChange={handleChange}
                                    placeholder="e.g. ACT-1972-NED"
                                    required
                                />
                                <InputField
                                    label="Issuing Authority *"
                                    name="issuingAuthority"
                                    value={formData.issuingAuthority}
                                    onChange={handleChange}
                                    placeholder="e.g. Government of Sindh"
                                    required
                                />
                                <InputField
                                    label="Institution Logo URL"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://image-link.com"
                                />
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="hecRecognizedDashboard"
                                        name="hecRecognized"
                                        checked={formData.hecRecognized}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </div>
                                <div>
                                    <label htmlFor="hecRecognizedDashboard" className="text-sm font-bold text-gray-700 cursor-pointer flex items-center gap-1.5">
                                        HEC Recognized
                                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    </label>
                                    <p className="text-[11px] text-gray-500">Enable this if the institution is officially recognized by HEC Pakistan.</p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <PrimaryButton
                                    text={isLoading ? "Registering Institution..." : "🚀 Complete Registration"}
                                    type="submit"
                                    disabled={isLoading}
                                />
                            </div>
                        </form>
                    </div>
                </div>

                {/* Guidelines Section */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-3xl p-6 text-white shadow-lg shadow-emerald-200">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 text-emerald-200" />
                            HEC Guidelines
                        </h3>
                        <ul className="space-y-4 text-emerald-50 text-sm">
                            <li className="flex gap-3">
                                <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">1</span>
                                <div>Ensure the <span className="font-bold text-white">Charter Number</span> matches official notification.</div>
                            </li>
                            <li className="flex gap-3">
                                <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">2</span>
                                <div>Verification is <span className="font-bold text-white">Blockchain-backed</span>; details cannot be altered easily.</div>
                            </li>
                            <li className="flex gap-3">
                                <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">3</span>
                                <div>Admin will receive an automated <span className="font-bold text-white">Activation Email</span>.</div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-800 mb-4">Onboarding Progress</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                    <span className="text-gray-500">Identity Checks</span>
                                    <span className="text-emerald-600 font-bold">100%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-1 rounded-full">
                                    <div className="bg-emerald-500 h-1 rounded-full w-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                    <span className="text-gray-500">Legal Verification</span>
                                    <span className="text-emerald-600 font-bold">100%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-1 rounded-full">
                                    <div className="bg-emerald-500 h-1 rounded-full w-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                    <span className="text-gray-500">Wait for System Approval</span>
                                    <span className="text-yellow-600 font-bold text-[10px] animate-pulse">PENDING...</span>
                                </div>
                                <div className="w-full bg-gray-100 h-1 rounded-full">
                                    <div className="bg-yellow-400 h-1 rounded-full w-[40%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityRegistration;

