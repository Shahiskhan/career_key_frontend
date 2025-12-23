import React, { useState } from "react";
import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const data = await login(formData);
            const user = data.user;
            const roles = user.roles || [];

            console.log("LoginPage detected roles:", roles);

            if (roles.includes("ROLE_HEC")) {
                navigate('/hec-portal');
            } else if (roles.includes("ROLE_STUDENT")) {
                navigate('/student-portal');
            } else if (roles.includes("ROLE_UNIVERSITY")) {
                navigate('/university-portal');
            } else {
                console.warn("No recognized role found, redirecting to home.");
                navigate('/');
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || err.message || "Invalid email or password");
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-50">
            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
                <Navbar />
                <div className="flex items-center justify-center min-h-[70vh] pt-20">
                    <AuthCard title="Login to CareerKey">
                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4 border border-red-200">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                                placeholder="Enter your password"
                                required
                            />

                            <PrimaryButton
                                text={isLoading ? "Logging in..." : "Login"}
                                type="submit"
                                disabled={isLoading}
                            />
                        </form>

                        <div className="mt-6 border-t border-gray-100 pt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Are you a student?{" "}
                                <Link to="/signup" className="text-emerald-600 font-semibold hover:underline">
                                    Register Now
                                </Link>
                            </p>
                        </div>
                    </AuthCard>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

