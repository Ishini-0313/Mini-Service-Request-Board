"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewJobPage() {

    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
        contactName: "",
        contactEmail: ""
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

        if (!form.title || !form.description) {
            alert("Title and Description are required");
            return;
        }

        try {

            setLoading(true);

            await axios.post(
                "http://localhost:5000/api/jobs",
                form
            );

            router.push("/");

        } catch (error) {

            console.log(error);
            alert("Failed to create job");

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-3xl bg-white shadow-xl rounded p-8">

                <div className="mb-8 text-center">

                    <h1 className="text-4xl font-bold text-gray-800">
                        Create Service Request
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Fill in the details below to post a new job request
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Job Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Need a plumber for kitchen sink"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Describe the issue in detail..."
                            rows={5}
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                        />
                    </div>

                    {/* Category + Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                <option value="">
                                    Select Category
                                </option>

                                <option value="Plumbing">
                                    Plumbing
                                </option>

                                <option value="Electrical">
                                    Electrical
                                </option>

                                <option value="Painting">
                                    Painting
                                </option>

                                <option value="Joinery">
                                    Joinery
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                placeholder="Glasgow"
                                value={form.location}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                    </div>

                    {/* Contact Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Contact Name
                            </label>

                            <input
                                type="text"
                                name="contactName"
                                placeholder="John Doe"
                                value={form.contactName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Contact Email
                            </label>

                            <input
                                type="email"
                                name="contactEmail"
                                placeholder="john@example.com"
                                value={form.contactEmail}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-400 hover:bg-orange-500 transition-all duration-200 text-white font-semibold py-3 rounded shadow-md disabled:bg-gray-400"
                        >
                            {loading ? "Creating..." : "Create Job Request"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}