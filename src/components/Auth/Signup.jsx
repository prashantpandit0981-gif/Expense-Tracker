import { useState } from "react";

export default function Signup({ setCurrentView }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(form));

    alert("Signup successful!");
    setCurrentView("login");
  };

  return (
    <div className="d-flex justify-content-center text-light">
      <div className="card p-4 bg-dark text-light" style={{ width: "380px" }}>
        <h2 className="mb-3">Create Account</h2>

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary w-100">Sign Up</button>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <span
              role="button"
              className="text-info"
              onClick={() => setCurrentView("login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
