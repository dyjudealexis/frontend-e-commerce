// components/RegisterPage.tsx

"use client";

import React, { useState } from "react";
import { AxiosError } from "axios";
import Link from "next/link";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        form
      );
      // setMessage("Registration successful! You can now log in.");
      setForm({ full_name: "", email: "", password: "" });
      console.log(response.data);

      toast.success("Registration successful! You can now log in.");
      router.push("/login");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.response?.data?.message) {
        setMessage(`Error: ${axiosError.response.data.message}`);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register spad">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-6">
            <div className="register__content">
              <h2 className="my-4 fw-bold calc-text-1">Create a New Account</h2>
              {message && <div className="alert alert-info">{message}</div>}
              <form className="text-left" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="full_name">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="primary-btn d-flex align-items-center justify-content-center w-100 border-0"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Registering...
                    </>
                  ) : (
                    "REGISTER"
                  )}
                </button>
              </form>
              <p className="mt-4">
                Already have an account?{" "}
                <Link href="/login" className="user-a">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
