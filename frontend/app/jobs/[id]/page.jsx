"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function JobDetailPage() {
    const params = useParams();
    const router = useRouter();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchJob = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/jobs/${params.id}`
            );

            setJob(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJob();
    }, []);

    const updateStatus = async (status) => {
        try {
            await axios.put(
                `http://localhost:5000/api/jobs/${params.id}`,
                { status }
            );

            fetchJob();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteJob = async () => {
        try {
            await axios.delete(
                `http://localhost:5000/api/jobs/${params.id}`
            );

            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-lg font-semibold text-gray-600">
                    Loading job details...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded shadow-xl overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        {job.title}
                    </h1>

                    <p className="mt-2 text-sm md:text-base opacity-90">
                        Job Details & Management
                    </p>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-6">

                    {/* Description */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Description
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            {job.description}
                        </p>
                    </div>

                    {/* Status Section */}
                    <div className=" ">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">
                            Update Job Status
                        </h2>

                        <select
                            value={job.status}
                            onChange={(e) =>
                                updateStatus(e.target.value)
                            }
                            className="w-full md:w-64 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Closed</option>
                        </select>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* name */}
                        <div className="bg-gray-50 p-4 rounded  shadow-sm">
                            <p className="text-sm text-gray-500">
                                Contact Name
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                                {job.contactName}
                            </p>
                        </div>

                        {/* email */}
                        <div className="bg-gray-50 p-4 rounded  shadow-sm">
                            <p className="text-sm text-gray-500">
                                Contact Email
                            </p>

                            <p className="font-semibold text-blue-600 mt-1 break-all">
                                {job.contactEmail}
                            </p>
                        </div>

                        {/* location */}
                        <div className="bg-gray-50 p-4 rounded  shadow-sm">
                            <p className="text-sm text-gray-500">
                                Location
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                                {job.location}
                            </p>
                        </div>

                        {/* date */}
                        <div className="bg-gray-50 p-4 rounded  shadow-sm">
                            <p className="text-sm text-gray-500">
                                Created At
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                                {new Date(job.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">

                        <button
                            onClick={() => router.push("/")}
                            className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded transition"
                        >
                            Back
                        </button>

                        <button
                            onClick={deleteJob}
                            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded transition"
                        >
                            Delete Job
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}