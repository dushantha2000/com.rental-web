import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const RegistrationPage = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        phone_number: "",
        type: "", 
        address: "", 
    });

    const [userType, setUserType] = useState("");

    const handleUserTypeSelect = (type) => {
        setUserType(type);
        setData("type", type); // Set user type in form data
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value); // Update form data on input change
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"), // Reset password fields after submission
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-6">
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-md">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
                    <h2 className="text-3xl font-bold text-white">
                        Create Your Account
                    </h2>
                    <p className="text-white/80 mt-2">
                        Join our rental community today!
                    </p>
                </div>

                {/* User Type Selection */}
                <div className="p-6">
                    {!userType ? (
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <button
                                onClick={() => handleUserTypeSelect("renter")}
                                className="flex flex-col items-center p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition"
                            >
                                <span className="font-semibold text-blue-800">
                                    Renter/Tenant
                                </span>
                            </button>
                            <button
                                onClick={() => handleUserTypeSelect("landlord")}
                                className="flex flex-col items-center p-4 border-2 border-purple-500 rounded-lg hover:bg-purple-50 transition"
                            >
                                <span className="font-semibold text-purple-800">
                                    Landlord/Property Owner
                                </span>
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Registration Form */}
                            <div className="grid grid-cols-1 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={data.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={data.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create Password"
                                    value={data.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <input
                                    type="tel"
                                    name="phone_number"
                                    placeholder="Phone Number"
                                    value={data.phone_number}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {userType === "landlord" && (
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Company Name or Address"
                                        value={data.address}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition font-semibold mt-4"
                            >
                                {processing
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>

                            {/* Login Redirect */}
                            <p className="text-center mt-4 text-gray-600">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="text-blue-600 hover:underline"
                                >
                                    Log In
                                </a>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
