import React, { useState } from "react";
import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import RoleSelector from "../../components/auth/RoleSelector";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

const LoginPage = () => {
    const [selectedRole, setSelectedRole] = useState("Student");
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error on change
    };

    const handleLogin = (e) => {
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

        console.log(`${selectedRole} logging in...`, formData);

        // Navigate based on selected role
        if (selectedRole === "Student") {
            navigate('/student-portal');
        } else if (selectedRole === "University") {
            navigate('/university-portal');
        } else if (selectedRole === "HEC") {
            navigate('/hec-portal');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-50">
            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
                <Navbar />
                <div className="flex items-center justify-center min-h-[70vh]">
                    <AuthCard title={`${selectedRole} Login`}>
                        <RoleSelector selectedRole={selectedRole} setSelectedRole={setSelectedRole} />

                        {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4 border border-red-200">{error}</div>}

                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

                            <PrimaryButton text="Login" type="submit" />
                        </form>

                        {selectedRole === "Student" && (
                            <p className="text-sm text-center text-gray-600 mt-4">
                                Don't have an account?{" "}

                                <Link to="/signup" className="text-emerald-600 hover:underline">
                                    Sign up
                                </Link>

                            </p>
                        )}
                    </AuthCard>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
