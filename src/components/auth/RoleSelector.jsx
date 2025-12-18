import React from "react";

const RoleSelector = ({ selectedRole, setSelectedRole }) => {
    const roles = ["Student", "University", "HEC"];

    return (
        <div className="flex justify-center gap-3 mb-6">
            {roles.map((role) => (
                <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedRole === role
                        ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md border-transparent"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-emerald-50 hover:border-emerald-200"
                        }`}
                >
                    {role}
                </button>
            ))}
        </div>
    );
};

export default RoleSelector;
