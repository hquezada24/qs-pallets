"use client";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", form);

    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    if (res?.error) {
      console.log("Login failed");
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
        
        .login-logo{
            padding: 28px 24px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(255,255,255,0.12);
            position: relative;
            z-index: 1;
        }
        .login-logo-img{
            margin: 0;
        }
            
        .login-logo-txt{
            font-family: "Lexend", ui-sans-serif, system-ui;
            font-weight: 800;
            font-size: 1.2rem;
            color: white;
            letter-spacing: -0.02em;
            line-height: 1;
            margin: 0;
        }
      `}</style>
      <div className="min-h-screen flex">
        {/* LEFT SIDE - Branding */}
        <div className="hidden md:flex w-1/2 bg-green-700 text-white flex-col justify-center items-center p-12">
          <div className="max-w-md">
            <div className="login-logo flex">
              <Image
                src="/qspallets.png"
                alt=""
                width={100}
                height={100}
                sizes="100vw"
                className="login-logo-img m-0"
              />
              <h1 className="login-logo-txt">QS Pallets</h1>
            </div>
            <p className="text-green-100 text-lg py-7">
              Manage inventory, quotes, and orders from one central dashboard.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - Login Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50 p-8">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500 mb-6">Sign in to your dashboard</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
                  placeholder="admin@qspallets.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
                  placeholder="••••••••"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} QS Pallets
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
