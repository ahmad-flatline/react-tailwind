import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Banner from "../component/alert/banner";

const Signup = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const disabledCss = "disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed";

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target.subscribed.checked);

    const data = {
      name: e.target.company.value,
      email: e.target.email.value,
      password: e.target.psw.value,
      application_name: e.target.application.value,
    };

    setLoading(true);
    try {
      const url = `/success?h=Welcome!&p=We have sent you a confirmation Email, please check your inbox and confirm you Email address, You will be redirected to the login page in a few second...&=ms=2000`;
      navigate(url, { replace: true });
    } catch (error) {
      setError(error.message || error || "Something went wrong, please try again!");
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Signup";
  }, []);

  if (user?.id) return <Navigate to="/" replace />;
  return (
    <main className="">
      {error && (
        <Banner type="error" onClose={() => setError(null)}>
          {error}.
        </Banner>
      )}

      <div className="min-h-screen h-full flex flex-col after:flex-1 relative md:flex">
        <div className="max-w-sm mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-1 mb-5">
            <div className="flex items-center">
              {/* Logo */}
              <Link className="block" to="/">
                <img alt="Logo" src="/logo192.png" />
              </Link>
            </div>
          </div>

          <h1 className="text-3xl text-slate-800 font-bold mb-6">Create your Account ✨</h1>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Full name <span className="text-rose-500">*</span>
                </label>
                <input name="fullName" id="name" className="form-input w-full" type="text" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="role">
                  Your Role <span className="text-rose-500">*</span>
                </label>
                <select name="role" id="role" className="form-select w-full">
                  <option>Company</option>
                  <option>Admin</option>
                  <option>Member</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input name="email" id="email" className="form-input w-full" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">
                  Password <span className="text-rose-500">*</span>
                </label>
                <input
                  name="psw"
                  id="password"
                  className="form-input w-full"
                  type="password"
                  autoComplete="on"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <input
                  name="psw"
                  id="password"
                  className="form-input w-full"
                  type="password"
                  autoComplete="on"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="mr-1">
                <label className="flex items-center">
                  <input name="subscribed" type="checkbox" className="form-checkbox" />
                  <span className="text-sm ml-2">Email me about product news.</span>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={
                  "flex items-center flex-initial min-w-[100px] btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap " +
                  (!loading ? "" : disabledCss)
                }
              >
                Sign Up
                {loading && (
                  <span className="ml-2">
                    <svg className="animate-spin w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                      <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>
          {/* Footer */}
          <div className="pt-5 mt-6 border-t border-slate-200">
            <div className="text-sm">
              Have an account?{" "}
              <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/login">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
