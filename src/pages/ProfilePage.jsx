import React, { useState } from "react";
import StudentNavbar from "../components/studentportal/StudentNavbar";

const ProfilePage = ({ onNavigate }) => {
    const [isEditing, setIsEditing] = useState(false);

    // Load initial data from localStorage or use defaults
    const storedName = localStorage.getItem("studentName");
    const storedEmail = localStorage.getItem("studentEmail");
    const storedRollNo = localStorage.getItem("studentRollNo");
    const storedCnic = localStorage.getItem("studentCnic");
    const storedUniversity = localStorage.getItem("studentUniversity");
    const storedDegree = localStorage.getItem("studentDegree");

    const [profile, setProfile] = useState({
        name: storedName || "Muhammad Shahis",
        email: storedEmail || "shahis@example.com",
        rollNo: storedRollNo || "",
        cnic: storedCnic || "",
        university: storedUniversity || "",
        degree: storedDegree || ""
    });

    const [editData, setEditData] = useState({
        ...profile,
        cv: null,
        cvFileName: "",
        skills: [],
        newSkill: "",
        education: [],
        newEducation: {
            degree: "",
            institution: "",
            year: ""
        },
        jobPreferences: {
            remote: false,
            onSite: false,
            hybrid: false,
            fullTime: false,
            partTime: false,
            contract: false
        }
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditData({
            ...editData,
            jobPreferences: {
                ...editData.jobPreferences,
                [name]: checked
            }
        });
    };

    const handleCVUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditData({
                ...editData,
                cv: file,
                cvFileName: file.name
            });
        }
    };

    const handleAddSkill = () => {
        if (editData.newSkill.trim()) {
            setEditData({
                ...editData,
                skills: [...editData.skills, editData.newSkill],
                newSkill: ""
            });
        }
    };

    const handleRemoveSkill = (index) => {
        setEditData({
            ...editData,
            skills: editData.skills.filter((_, i) => i !== index)
        });
    };

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            newEducation: {
                ...editData.newEducation,
                [name]: value
            }
        });
    };

    const handleAddEducation = () => {
        if (editData.newEducation.degree && editData.newEducation.institution) {
            setEditData({
                ...editData,
                education: [...editData.education, editData.newEducation],
                newEducation: { degree: "", institution: "", year: "" }
            });
        }
    };

    const handleRemoveEducation = (index) => {
        setEditData({
            ...editData,
            education: editData.education.filter((_, i) => i !== index)
        });
    };

    const handleSaveProfile = () => {
        setProfile({
            name: editData.name,
            email: editData.email,
            rollNo: editData.rollNo,
            cnic: editData.cnic,
            university: editData.university,
            degree: editData.degree
        });

        // Update localStorage as well to persist changes
        localStorage.setItem("studentName", editData.name);
        localStorage.setItem("studentEmail", editData.email);
        localStorage.setItem("studentRollNo", editData.rollNo);
        localStorage.setItem("studentCnic", editData.cnic);
        localStorage.setItem("studentUniversity", editData.university);
        localStorage.setItem("studentDegree", editData.degree);

        alert("Profile updated successfully!");
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({
            ...profile,
            cv: null,
            cvFileName: "",
            skills: editData.skills,
            newSkill: "",
            education: editData.education,
            newEducation: { degree: "", institution: "", year: "" },
            jobPreferences: editData.jobPreferences
        });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-50">
            <div className="container mx-auto px-4 pt-6">
                <StudentNavbar activeSection="profile" onNavigate={onNavigate} />
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">👤 My Profile</h1>
                    <p className="text-gray-600">View and manage your profile information</p>
                </div>

                {!isEditing ? (
                    // View Mode
                    <section className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-10 mb-10 border border-emerald-100">
                        <h3 className="text-3xl font-bold mb-6 text-gray-900 text-center">Profile Information</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b pb-3 border-emerald-100">
                                <span className="font-medium text-gray-600">Name:</span>
                                <span className="font-semibold text-gray-800">{profile.name}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3 border-emerald-100">
                                <span className="font-medium text-gray-600">Email:</span>
                                <span className="font-semibold text-gray-800">{profile.email}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3 border-emerald-100">
                                <span className="font-medium text-gray-600">Roll Number:</span>
                                <span className="font-semibold text-gray-800">{profile.rollNo}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3 border-emerald-100">
                                <span className="font-medium text-gray-600">CNIC:</span>
                                <span className="font-semibold text-gray-800">{profile.cnic}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3 border-emerald-100">
                                <span className="font-medium text-gray-600">University:</span>
                                <span className="font-semibold text-gray-800">{profile.university}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3 border-emerald-100">
                                <span className="font-medium text-gray-600">Degree:</span>
                                <span className="font-semibold text-gray-800">{profile.degree}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleEditClick}
                            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition hover:from-emerald-700 hover:to-green-700 hover:scale-[1.02]"
                        >
                            ✏️ Edit Profile
                        </button>
                    </section>
                ) : (
                    // Edit Mode
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Basic Information */}
                        <section className="bg-white rounded-3xl shadow-xl p-10 border border-emerald-100">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">📝 Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                                    <input
                                        type="text"
                                        name="rollNo"
                                        value={editData.rollNo}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">CNIC</label>
                                    <input
                                        type="text"
                                        name="cnic"
                                        value={editData.cnic}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                                    <input
                                        type="text"
                                        name="university"
                                        value={editData.university}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={editData.degree}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* CV Upload */}
                        <section className="bg-white rounded-3xl shadow-xl p-10">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">📄 Upload CV</h3>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleCVUpload}
                                    className="hidden"
                                    id="cv-upload"
                                />
                                <label htmlFor="cv-upload" className="cursor-pointer">
                                    <div className="text-4xl mb-2">📤</div>
                                    <p className="text-gray-600">Click to upload or drag and drop</p>
                                    <p className="text-sm text-gray-500">PDF, DOC, DOCX (Max 10MB)</p>
                                </label>
                                {editData.cvFileName && (
                                    <p className="mt-4 text-sm text-green-600 font-semibold">✓ {editData.cvFileName}</p>
                                )}
                            </div>
                        </section>

                        {/* Skills */}
                        <section className="bg-white rounded-3xl shadow-xl p-10">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">🎯 Skills</h3>
                            <div className="flex gap-2 mb-6">
                                <input
                                    type="text"
                                    value={editData.newSkill}
                                    onChange={(e) => setEditData({ ...editData, newSkill: e.target.value })}
                                    placeholder="Add a skill (e.g., React, Node.js)"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                />
                                <button
                                    onClick={handleAddSkill}
                                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {editData.skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold flex items-center gap-2"
                                    >
                                        {skill}
                                        <button
                                            onClick={() => handleRemoveSkill(index)}
                                            className="ml-2 text-red-600 hover:text-red-800 font-bold"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section className="bg-white rounded-3xl shadow-xl p-10">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">🎓 Education</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={editData.newEducation.degree}
                                        onChange={handleEducationChange}
                                        placeholder="e.g., BS Computer Science"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                                    <input
                                        type="text"
                                        name="institution"
                                        value={editData.newEducation.institution}
                                        onChange={handleEducationChange}
                                        placeholder="e.g., University of Mianwali"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                                    <input
                                        type="text"
                                        name="year"
                                        value={editData.newEducation.year}
                                        onChange={handleEducationChange}
                                        placeholder="e.g., 2025"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleAddEducation}
                                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition mb-6"
                            >
                                + Add Education
                            </button>
                            <div className="space-y-4">
                                {editData.education.map((edu, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-800">{edu.degree}</p>
                                            <p className="text-sm text-gray-600">{edu.institution} ({edu.year})</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveEducation(index)}
                                            className="text-red-600 hover:text-red-800 font-bold text-xl"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Job Preferences */}
                        <section className="bg-white rounded-3xl shadow-xl p-10">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">💼 Job Preferences</h3>

                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">Work Location</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-green-50 transition">
                                        <input
                                            type="checkbox"
                                            name="remote"
                                            checked={editData.jobPreferences.remote}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 text-green-600 rounded"
                                        />
                                        <span className="text-gray-700 font-medium">🌐 Remote</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-green-50 transition">
                                        <input
                                            type="checkbox"
                                            name="onSite"
                                            checked={editData.jobPreferences.onSite}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 text-green-600 rounded"
                                        />
                                        <span className="text-gray-700 font-medium">🏢 On-Site</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-green-50 transition">
                                        <input
                                            type="checkbox"
                                            name="hybrid"
                                            checked={editData.jobPreferences.hybrid}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 text-green-600 rounded"
                                        />
                                        <span className="text-gray-700 font-medium">🔄 Hybrid</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">Employment Type</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-green-50 transition">
                                        <input
                                            type="checkbox"
                                            name="fullTime"
                                            checked={editData.jobPreferences.fullTime}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 text-green-600 rounded"
                                        />
                                        <span className="text-gray-700 font-medium">⏰ Full Time</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-green-50 transition">
                                        <input
                                            type="checkbox"
                                            name="partTime"
                                            checked={editData.jobPreferences.partTime}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 text-green-600 rounded"
                                        />
                                        <span className="text-gray-700 font-medium">⏳ Part Time</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-green-50 transition">
                                        <input
                                            type="checkbox"
                                            name="contract"
                                            checked={editData.jobPreferences.contract}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 text-green-600 rounded"
                                        />
                                        <span className="text-gray-700 font-medium">📋 Contract</span>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-10">
                            <button
                                onClick={handleSaveProfile}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition"
                            >
                                ✓ Save Profile
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 px-6 py-3 bg-gray-400 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition"
                            >
                                ✕ Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <footer className="py-6 text-center text-gray-500 text-sm border-t mt-16">
                © 2025 CareerKey – All Rights Reserved.
            </footer>
        </div>
    );
};

export default ProfilePage;
