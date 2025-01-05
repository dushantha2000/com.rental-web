import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
                            <h2 className="text-3xl font-bold text-white">
                                Welcome Back
                            </h2>
                            <p className="text-white/80 mt-2">
                                Log in to manage your rentals
                            </p>
                        </div>

                        <form onSubmit={submit} className="p-6 space-y-4">
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Forgot Password?
                                    </Link>
                                )}
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                >
                                    Log in
                                </PrimaryButton>
                            </div>

                            <div className="text-center mt-4 text-gray-600">
                                Don't have an account?{" "}
                                <Link
                                    href={route("register")}
                                    className="text-blue-600 hover:underline"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
