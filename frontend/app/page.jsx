"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");

  const fetchJobs = async () => {
    const url = category ? `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?category=${category}` : `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`;
    const res = await axios.get(url);
    setJobs(res.data);
  };

  useEffect(()=>{
    fetchJobs();
  },[category]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Service Requests</h1>
        <Link href="/new_job" className="bg-orange-400 hover:bg-orange-500 rounded px-5 py-2 text-white shadow">New Job</Link>
      </div>

      {/* filter section */}
      <div className="mb-6">
        <select className="border border-gray-300 p-2 rounded w-full md:w-64" onChange={(e)=>setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Painting">Painting</option>
        </select>
      </div>

      {/* job table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">category</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              jobs.length == 0 ? 
                (
                  <tr>
                    <td colSpan="5" className="text-center p-6 text-gray-500">No Jobs Flound</td>
                  </tr>
                ) 

                :

                (
                  jobs.map((job)=>(
                    <tr key={job._id} className="border-t hover:bg-gray-50">
                      <td className="p-4 font-medium">{job.title}</td>
                      <td className="p-4">{job.category}</td>
                      <td className="p-4">{job.location}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded  text-sm ${
                            job.status === "Open"
                              ? "text-green-600"
                              : job.status === "In Progress"
                              ? "text-yellow-600"
                              : "text-red-500"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link
                          href={`/jobs/${job._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
