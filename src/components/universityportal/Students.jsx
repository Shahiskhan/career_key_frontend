import React, { useState, useEffect } from "react";

const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem("universityStudents") || "[]");
        if (storedStudents.length === 0) {
            const initialStudents = [
                { rollNo: "BCS-F22-E02", name: "Muhammad Shahis", department: "CS", batch: "2022", status: "Active" },
                { rollNo: "BCS-F22-E08", name: "Nayyab Gull", department: "CS", batch: "2022", status: "Active" },
                { rollNo: "BCS-F22-E26", name: "Muhammad Saqib", department: "CS", batch: "2022", status: "Active" },
            ];
            setStudents(initialStudents);
            localStorage.setItem("universityStudents", JSON.stringify(initialStudents));
        } else {
            setStudents(storedStudents);
        }
    }, []);

    const [viewStudent, setViewStudent] = useState(null);
    const [editStudent, setEditStudent] = useState(null);

    const handleView = (student) => {
        setViewStudent(student);
    };

    const handleEdit = (student) => {
        setEditStudent(student);
    };

    const handleSaveEdit = () => {
        const updatedStudents = students.map(s =>
            s.rollNo === editStudent.rollNo ? editStudent : s
        );
        setStudents(updatedStudents);
        localStorage.setItem("universityStudents", JSON.stringify(updatedStudents));
        setEditStudent(null);
        alert("Student details updated successfully!");
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">All Students</h3>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
                    + Add Student
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Roll No</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Batch</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 transition">
                                <td className="px-4 py-3 text-sm text-gray-800">{student.rollNo}</td>
                                <td className="px-4 py-3 text-sm text-gray-800">{student.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{student.department}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{student.batch}</td>
                                <td className="px-4 py-3">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                        {student.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm flex gap-3">
                                    <button
                                        onClick={() => handleView(student)}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleEdit(student)}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            {viewStudent && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">🎓 Student Details</h3>
                            <button onClick={() => setViewStudent(null)} className="text-gray-400 hover:text-red-500 text-2xl">×</button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-3xl">👨‍🎓</div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">{viewStudent.name}</h4>
                                    <p className="text-sm text-indigo-600 font-medium">{viewStudent.rollNo}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <p className="text-xs text-blue-600 uppercase font-bold text-gray-500">Department</p>
                                    <p className="font-semibold text-gray-800">{viewStudent.department}</p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <p className="text-xs text-green-600 uppercase font-bold text-gray-500">Batch</p>
                                    <p className="font-semibold text-gray-800">{viewStudent.batch}</p>
                                </div>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                                <p className="text-sm font-semibold text-gray-700">Current Status: <span className="text-green-600">{viewStudent.status}</span></p>
                            </div>
                        </div>
                        <button onClick={() => setViewStudent(null)} className="w-full mt-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition">Close</button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editStudent && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">✏️ Edit Student</h3>
                            <button onClick={() => setEditStudent(null)} className="text-gray-400 hover:text-red-500 text-2xl">×</button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={editStudent.name}
                                    onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Department</label>
                                <input
                                    type="text"
                                    value={editStudent.department}
                                    onChange={(e) => setEditStudent({ ...editStudent, department: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Batch</label>
                                    <input
                                        type="text"
                                        value={editStudent.batch}
                                        onChange={(e) => setEditStudent({ ...editStudent, batch: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                                    <select
                                        value={editStudent.status}
                                        onChange={(e) => setEditStudent({ ...editStudent, status: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Graduated">Graduated</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <button onClick={handleSaveEdit} className="flex-1 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition">Save Changes</button>
                            <button onClick={() => setEditStudent(null)} className="flex-1 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Students;
