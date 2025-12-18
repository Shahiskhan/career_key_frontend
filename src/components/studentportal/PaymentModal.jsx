import React, { useState } from "react";

const PaymentModal = ({ isOpen, onClose, onPaymentSubmit, amount = 500 }) => {
    const [paymentMethod, setPaymentMethod] = useState("jazzcash");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [trxId, setTrxId] = useState("");
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const merchantDetails = {
        jazzcash: {
            address: "Jazz Cash Merchant - CareerKey",
            account: "03001234567",
            name: "CareerKey Attestation Services",
            code: "CK-ATT-500",
            logo: ""
        },
        easypaisa: {
            address: "Easy Paisa Merchant - CareerKey",
            account: "03009876543",
            name: "CareerKey Attestation Services",
            code: "EP-ATT-500",
            logo: ""
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^(\+92|92|0)?3\d{9}$/.test(phoneNumber.replace(/[-\s]/g, ""))) {
            newErrors.phoneNumber = "Enter a valid Pakistani phone number";
        }
        if (!trxId.trim()) {
            newErrors.trxId = "Transaction ID is required";
        }
        return newErrors;
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);

            // Call the callback after 2 seconds
            setTimeout(() => {
                onPaymentSubmit({
                    method: paymentMethod,
                    phoneNumber,
                    trxId,
                    amount,
                    timestamp: new Date().toLocaleString()
                });
                resetForm();
            }, 2000);
        }, 1500);
    };

    const resetForm = () => {
        setPhoneNumber("");
        setTrxId("");
        setErrors({});
        setPaymentSuccess(false);
        onClose();
    };

    if (!isOpen) return null;

    const merchant = merchantDetails[paymentMethod];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 flex justify-between items-center sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-bold">💳 Payment</h2>
                        <p className="text-green-100">Attestation Request Fee: PKR {amount}</p>
                    </div>
                    <button
                        onClick={resetForm}
                        className="text-2xl hover:text-green-200 transition"
                    >
                        ✕
                    </button>
                </div>

                {paymentSuccess ? (
                    // Success Message
                    <div className="p-8 text-center">
                        <div className="mb-4">
                            <div className="text-6xl mb-4">✅</div>
                            <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                            <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-left space-y-3">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Transaction ID:</span>
                                <span className="text-gray-900 font-semibold">{merchant.code}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Amount:</span>
                                <span className="text-gray-900 font-semibold">PKR {amount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Method:</span>
                                <span className="text-gray-900 font-semibold capitalize">{paymentMethod === "jazzcash" ? "Jazz Cash" : "Easy Paisa"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Phone:</span>
                                <span className="text-gray-900 font-semibold">{phoneNumber}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Payment Form
                    <div className="p-8 space-y-6">
                        {/* Payment Method Selection */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Select Payment Method</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`p-6 border-2 rounded-xl cursor-pointer transition transform hover:scale-105 ${paymentMethod === "jazzcash" ? "border-orange-500 bg-orange-50 shadow-lg" : "border-gray-300 hover:border-orange-300"}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="jazzcash"
                                        checked={paymentMethod === "jazzcash"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="hidden"
                                    />
                                    <div className="text-center">
                                        <div className="text-5xl mb-2">🎵</div>
                                        <span className="font-bold text-gray-900 block text-lg">Jazz Cash</span>
                                        <span className="text-xs text-gray-600">Fast & Secure</span>
                                    </div>
                                </label>
                                <label className={`p-6 border-2 rounded-xl cursor-pointer transition transform hover:scale-105 ${paymentMethod === "easypaisa" ? "border-purple-500 bg-purple-50 shadow-lg" : "border-gray-300 hover:border-purple-300"}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="easypaisa"
                                        checked={paymentMethod === "easypaisa"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="hidden"
                                    />
                                    <div className="text-center">
                                        <div className="text-5xl mb-2">📱</div>
                                        <span className="font-bold text-gray-900 block text-lg">Easy Paisa</span>
                                        <span className="text-xs text-gray-600">Simple & Easy</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Merchant Details */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">📍 Send Money To:</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-600">Merchant Name:</p>
                                    <p className="font-bold text-gray-900">{merchant.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Account/Phone Number:</p>
                                    <p className="font-bold text-gray-900 text-lg">{merchant.account}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Reference Code:</p>
                                    <p className="font-bold text-green-600 text-lg">{merchant.code}</p>
                                </div>
                                <div className="pt-3 border-t border-blue-200">
                                    <p className="text-sm text-gray-600">Address:</p>
                                    <p className="font-semibold text-gray-900">{merchant.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <form onSubmit={handlePaymentSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Phone Number *</label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                        if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: "" });
                                    }}
                                    placeholder="03XX-XXXXXXX"
                                    className={`w-full px-4 py-3 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Transaction ID (Trx ID) *</label>
                                <input
                                    type="text"
                                    value={trxId}
                                    onChange={(e) => {
                                        setTrxId(e.target.value);
                                        if (errors.trxId) setErrors({ ...errors, trxId: "" });
                                    }}
                                    placeholder="Enter Transaction ID received from SMS"
                                    className={`w-full px-4 py-3 border ${errors.trxId ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                                />
                                {errors.trxId && <p className="text-red-500 text-sm mt-1">{errors.trxId}</p>}
                            </div>

                            {/* Amount Display */}
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-700">Total Amount:</span>
                                    <span className="text-2xl font-bold text-green-600">PKR {amount}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? "Processing..." : "💳 Send Payment"}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 px-6 py-3 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>

                        {/* Instructions */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm text-yellow-800">
                                <span className="font-semibold">⚠️ Instructions:</span> Send the amount to the account above using your {paymentMethod === "jazzcash" ? "Jazz Cash" : "Easy Paisa"} account and use the reference code in your transaction.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;
