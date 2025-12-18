import React from "react";

const StudentHero = ({ studentName }) => (
    <section className="text-center py-16 px-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl mb-8 border border-emerald-100 shadow-sm">
        <div className="inline-block mb-3">
            <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Welcome Back</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-900 leading-tight">
            Hello, <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{studentName || "Student"}</span>! 👋
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Manage your attestation requests, view verified documents, and explore AI-powered job recommendations — all in one place.
        </p>
    </section>
);

export default StudentHero;
