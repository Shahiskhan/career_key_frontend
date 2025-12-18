import React from "react";

const DocumentPreview = ({ docUrl }) => {
    if (!docUrl) return null;

    return (
        <section className="max-w-4xl mx-auto mb-16 px-6 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">📄 Verified Document Preview</h3>
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-emerald-100">
                <iframe
                    src={docUrl}
                    title="Document Preview"
                    className="w-full h-[500px] rounded-lg border border-emerald-100"
                />
                <p className="text-xs text-gray-500 mt-3">
                    🔗 IPFS Link: <a href={docUrl} target="_blank" rel="noreferrer" className="text-emerald-600 underline hover:text-emerald-700">{docUrl}</a>
                </p>
            </div>
        </section>
    );
};

export default DocumentPreview;

