"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';

export default function Dashboardform() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    profilePic: "",
    coverPic: "",
    phoneNo: "",
    razorpayKeyId: "",
    razorpaySecret: "",
  });

  const [razorpaySecret, setRazorpaySecret] = useState(false);

  useEffect(() => {
    const dashInfo = async () => {
      const info = await fetch(`http://localhost:3000/api/userinfo?email=${email}`)
      const parsedInfo = await info.json();
      setFormData({
        name: parsedInfo?.name ?? "",
        email: parsedInfo?.email ?? "",
        username: parsedInfo?.username ?? "",
        profilePic: parsedInfo?.profilePic ?? "",
        coverPic: parsedInfo?.coverPic ?? "",
        phoneNo: parsedInfo?.phoneNo ?? "",
        razorpayKeyId: parsedInfo?.razorpayKeyId ?? "",
        razorpaySecret: parsedInfo?.razorpaySecret ?? "",
      });
    }
    dashInfo();
  }, [session])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      const updatedUser = await fetch("http://localhost:3000/api/updateuser", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await updatedUser.json();

      if (!updatedUser.ok) {
        toast.error('Invalid Email!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        return;
      }
      toast.success('Updated Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setFormData({
        name: "",
        email: "",
        username: "",
        profilePic: "",
        coverPic: "",
        phoneNo: "",
      })
    } catch (error) {
      console.error(error, "appeared");
    }
  };

  return (
    <div className=" flex items-center justify-center w-full py-4">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="w-[87%] mx-auto px-12 md:px-8 bg-gray-900 shadow rounded-lg">
        <h2 className="text-2xl font-semibold my-4">User Dashboardform</h2>
        <form action={handleSubmit} className="space-y-2">
          <div>
            <label className="block font-sm mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-full py-1 px-4 text-[14px] bg-gray-900 text-white"
            />
          </div>
          <div>
            <label className="block font-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-full py-1 px-4 text-[14px] bg-gray-900 text-white"
            />
          </div>
          <div>
            <label className="block font-sm mb-1">Username</label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-full py-1 px-4 text-[14px] bg-gray-900 text-white"
            />
          </div>
          <div>
            <label className="block font-sm mb-1">ProfilePic</label>
            <input
              name="profilePic"
              type="text"
              value={formData.profilePic}
              onChange={handleChange}
              className="w-full border rounded-full py-1 px-4 text-[14px] bg-gray-900 text-white"
            />
          </div>
          <div>
            <label className="block font-sm mb-1">CoverPic</label>
            <input
              name="coverPic"
              type="text"
              value={formData.coverPic}
              onChange={handleChange}
              className="w-full border rounded-full py-1 px-4 text-[14px] bg-gray-900 text-white"
            />
          </div>
          <div>
            <label className="block font-sm mb-1">PhoneNo</label>
            <input
              name="phoneNo"
              type="text"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full border rounded-full py-1 px-4 text-[14px] bg-gray-900 text-white"
            />
          </div>
          <div>
            <label className="block font-sm mb-1">Razorpay Key ID</label>
            <input
              name="razorpayKeyId"
              type="text"
              value={formData.razorpayKeyId}
              onChange={handleChange}
              className="w-full border rounded-full py-1 px-4 text-[14px] bg-gray-900 text-white"
            />
          </div>
          <div>
            <label className="block font-sm mb-1">Razorpay Secret</label>
            <div className="flex items-center justify-center gap-2">
            <input
              name="razorpaySecret"
              type={razorpaySecret ? "text" : "password"} // Toggle visibility
              value={formData.razorpaySecret}
              onChange={handleChange}
              className="w-full border rounded-full py-1 px-4 text-[14px] bg-gray-900 text-white"
            />
            <p className="text-xs mt-1 text-blue-500 cursor-pointer" onClick={() => setRazorpaySecret(!razorpaySecret)}> {razorpaySecret ? "Hide" : "Show"} </p>
          </div>
          </div>

          <div className="pb-6 pt-2">
            <button
              className="w-full relative inline-flex h-9 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-150"
              onClick={(e) => e.currentTarget.blur()}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl">
                Update Profile
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
