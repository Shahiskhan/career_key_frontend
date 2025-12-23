import React, { useState } from "react";
import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const UniversityRegister = () => {
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
    const navigate = useNavigate();

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
            setError("All required fields must be filled.");
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
            setSuccess("University registered successfully! Redirecting...");

            // Set a small delay before navigating back to dashboard
            setTimeout(() => {
                navigate('/hec-portal');
            }, 2000);

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
            setError(err.response?.data?.message || "Email already exists or server error.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-50">
            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
                <Navbar />

                <div className="max-w-4xl mx-auto mt-12 mb-8">
                    <button
                        onClick={() => navigate('/hec-portal')}
                        className="flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Dashboard
                    </button>

                    <AuthCard title="Register New University">
                        <p className="text-gray-500 text-center -mt-4 mb-8">Register a new educational institution to the CareerKey network.</p>

                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-6 border border-red-200 animate-shake">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-emerald-50 text-emerald-700 text-sm px-4 py-3 rounded-xl mb-6 border border-emerald-200 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" />
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Admin Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="University Admin Name"
                                required
                            />
                            <InputField
                                label="Admin Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="university@example.edu.pk"
                                required
                            />
                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="At least 8 characters"
                                required
                            />
                            <InputField
                                label="University Name"
                                name="universityName"
                                value={formData.universityName}
                                onChange={handleChange}
                                placeholder="e.g. NED University"
                                required
                            />
                            <InputField
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="e.g. Karachi"
                                required
                            />
                            <InputField
                                label="Charter Number"
                                name="charterNumber"
                                value={formData.charterNumber}
                                onChange={handleChange}
                                placeholder="e.g. ACT-1972-NED"
                                required
                            />
                            <InputField
                                label="Issuing Authority"
                                name="issuingAuthority"
                                value={formData.issuingAuthority}
                                onChange={handleChange}
                                placeholder="e.g. Government of Sindh"
                                required
                            />
                            <InputField
                                label="Logo URL (Optional)"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://logo-url.com"
                            />

                            <div className="flex items-center gap-3 mt-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 md:col-span-2">
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="hecRecognized"
                                        name="hecRecognized"
                                        checked={formData.hecRecognized}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </div>
                                <label htmlFor="hecRecognized" className="text-sm font-semibold text-gray-700 cursor-pointer">
                                    HEC Recognized Institution
                                </label>
                            </div>

                            <div className="md:col-span-2 mt-4">
                                <PrimaryButton
                                    text={isLoading ? "Processing..." : "Register University"}
                                    type="submit"
                                    disabled={isLoading}
                                />
                            </div>
                        </form>
                    </AuthCard>
                </div>
            </div>
        </div>
    );
};

export default UniversityRegister;

