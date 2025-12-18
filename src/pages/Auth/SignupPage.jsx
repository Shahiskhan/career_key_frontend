import React, { useState } from "react";
import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error on change
    };

    const handleSignup = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.email.endsWith("@gmail.com")) {
            setError("Email must be a valid @gmail.com address.");
            return;
        }
        if (formData.password.length < 4) {
            setError("Password must be at least 4 characters.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        console.log("Signing up student...", formData);

        // Clear previous student data to ensure a fresh profile for the new user
        localStorage.removeItem("studentRollNo");
        localStorage.removeItem("studentCnic");
        localStorage.removeItem("studentUniversity");
        localStorage.removeItem("studentDegree");
        localStorage.removeItem("attestationRequests"); // Clear previous requests as well

        // Store user name and email in localStorage for the Student Portal
        localStorage.setItem("studentName", formData.fullName);
        localStorage.setItem("studentEmail", formData.email);

        // Simulating successful signup and redirecting to student portal (or login, but for demo portal is better)
        navigate('/student-portal');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-50">
            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
                <Navbar />
                <div className="flex items-center justify-center min-h-[70vh]">
                    <AuthCard title="Student Signup">
                        {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4 border border-red-200">{error}</div>}

                        <form onSubmit={handleSignup} className="flex flex-col gap-4">
                            <InputField
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your name"
                            />
                            <InputField
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                            <InputField
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                            />
                            <PrimaryButton text="Create Account" type="submit" />
                        </form>

                        <p className="text-sm text-center text-gray-600 mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="text-emerald-600 hover:underline">
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
