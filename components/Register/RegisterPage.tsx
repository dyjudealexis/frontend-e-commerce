// components/RegisterPage.tsx

"use client";

import React from "react";
import Link from "next/link";

const RegisterPage: React.FC = () => {
  return (
    <section className="register spad">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-6">
            <div className="register__content">
              <h2 className="my-4 fw-bold">Create a New Account</h2>
              <form className="text-left">
                <div className="form-group mb-3">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" className="form-control" id="name" required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control" id="email" required />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" required />
                </div>
                <button type="submit" className="primary-btn w-100 border-0">REGISTER</button>
              </form>
              <p className="mt-4">
                Already have an account? <Link href="/login" className="text-primary">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
