"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import api from "@/utils/axios";
import { setEncryptedCookie } from "@/utils/cookieWithCrypto";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("demoaccount@example.com");
  const [password, setPassword] = useState("demoaccount123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          email,
          password_hash: password,
        }
      );

      const { token, user } = response.data;

      setEncryptedCookie(
        `${process.env.NEXT_PUBLIC_SESSION_TOKEN_COOKIE}`,
        token
      );
      setEncryptedCookie(`${process.env.NEXT_PUBLIC_USER_COOKIE}`, user);
      setEncryptedCookie(
        `${process.env.NEXT_PUBLIC_IS_AUTHENTICATED_COOKIE}`,
        "auth_true"
      );

      await fetch("/api/set-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: `${process.env.NEXT_PUBLIC_IS_AUTHENTICATED_COOKIE_SERVER}`,
          value: "auth_true",
        }),
      });

      await fetch("/api/set-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: `${process.env.NEXT_PUBLIC_SESSION_TOKEN_COOKIE_SERVER}`,
          value: token,
        }),
      });

      router.push("/profile");

      toast.success("Login Successful!");

      // console.log(token);
      // console.log(user);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      const msg =
        error.response?.data?.error || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login spad">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-6">
            <div className="login__content">
              <h2 className="my-4 fw-bold calc-text-1">
                Login to Your Account
              </h2>
              <form className="text-left" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <div className="alert alert-danger mb-3">{error}</div>
                )}
                <button
                  type="submit"
                  className="primary-btn w-100 border-0"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "LOGIN"}
                </button>
              </form>
              <p className="mt-4">
                Don’t have an account?{" "}
                <Link href="/register" className="user-a">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
