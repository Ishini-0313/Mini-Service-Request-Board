"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");

  const fetchJobs = async () => {
    const url = category ? `http://localhost:5000/api/jobs?category=${category}` : `http://localhost:5000/api/jobs`;
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
        
      </div>
    </div>
  );
}
