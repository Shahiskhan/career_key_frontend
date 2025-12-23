import React, { useState } from "react";
import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        cnic: "",
        dateOfBirth: "",
        gender: "MALE",
        contactNumber: "",
        address: "",
        universityName: ""
    });
    const [error, setError] = useState("");
    const { registerStudent, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await registerStudent(formData);
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-50">
            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
                <Navbar />
                <div className="flex items-center justify-center min-h-[90vh] pt-20 pb-10">
                    <AuthCard title="Student Registration">
                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4 border border-red-200">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />
                            <InputField
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Min 8 characters"
                                required
                            />
                            <InputField
                                label="CNIC"
                                name="cnic"
                                value={formData.cnic}
                                onChange={handleChange}
                                placeholder="XXXXX-XXXXXXX-X"
                                required
                            />
                            <InputField
                                label="Date of Birth"
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                >
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                            <InputField
                                label="Contact Number"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="03XX-XXXXXXX"
                                required
                            />
                            <InputField
                                label="University Name"
                                name="universityName"
                                value={formData.universityName}
                                onChange={handleChange}
                                placeholder="Current University"
                                required
                            />
                            <div className="md:col-span-2">
                                <InputField
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your full address"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 mt-2">
                                <PrimaryButton
                                    text={isLoading ? "Creating Account..." : "Create Account"}
                                    type="submit"
                                    disabled={isLoading}
                                />
                            </div>
                        </form>

                        <p className="text-sm text-center text-gray-600 mt-6 pt-4 border-t border-gray-100">
                            Already have an account?{" "}
                            <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
                                Log in
                            </Link>
                        </p>
                    </AuthCard>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

