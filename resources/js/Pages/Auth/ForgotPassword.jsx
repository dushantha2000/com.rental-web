import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('password.email'), {
            onSuccess: () => setIsSubmitted(true),
        });
    };

    const handleReset = () => {
        setIsSubmitted(false);
        setData('email', '');
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
                            <h2 className="text-3xl font-bold text-white">
                                {!isSubmitted ? 'Forgot Password' : 'Check Your Email'}
                            </h2>
                            <p className="text-white/80 mt-2">
                                {!isSubmitted
                                    ? 'Reset your account password'
                                    : 'Password reset instructions sent'}
                            </p>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 space-y-4">
                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        placeholder="Enter your email address"
                                        className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2" />

                                    <PrimaryButton
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition font-semibold"
                                        disabled={processing}
                                    >
                                        Send Reset Instructions
                                    </PrimaryButton>

                                    <p className="text-center text-gray-600">
                                        Remember your password?{' '}
                                        <a href="/login" className="text-blue-600 hover:underline">
                                            Back to Login
                                        </a>
                                    </p>
                                </form>
                            ) : (
                                <div className="text-center space-y-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-24 w-24 mx-auto text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <h3 className="text-2xl font-semibold text-gray-800">
                                        Password Reset Sent
                                    </h3>

                                    <p className="text-gray-600">
                                        We've sent a password reset link to <strong>{data.email}</strong>. Check
                                        your email and follow the instructions to reset your password.
                                    </p>

                                    <div className="flex justify-center space-x-4">
                                        <button
                                            onClick={handleReset}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                        >
                                            Try Another Email
                                        </button>
                                        <a
                                            href="/login"
                                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                                        >
                                            Back to Login
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Additional Security Note */}
                    <div className="text-center text-white mt-4 px-4">
                        <p className="text-sm">
                            If you didn't request a password reset, please ignore this email or
                            contact support if you have concerns.
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
