"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {

    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            alert("All fields are required");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
                form
            );

            alert("Registration Successful");

            router.push("/login");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md bg-white shadow-2xl rounded p-8">

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Register to post service requests
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Name */}
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-4 focus:ring-gray-200"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-4 focus:ring-gray-200"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-4 focus:ring-gray-200"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:bg-orange-600 hover:to-orange-400 text-white py-3 rounded font-semibold shadow-lg transition duration-300"
                    >
                        {
                            loading
                                ? "Creating Account..."
                                : "Register"
                        }
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-gray-500 mt-6">
                    Already have an account?
                    <Link
                        href="/login"
                        className="text-blue-600 font-semibold ml-1 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}