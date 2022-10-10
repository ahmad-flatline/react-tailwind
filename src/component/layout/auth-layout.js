import React, { useState } from "react";
import { Navigate } from "react-router-dom";
// import Header from "./header";
// import Sidebar from "./sidebar";

const AuthLayout = ({ children, Component, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user?.id) return <Navigate to="/login" replace />;
  else if (!new RegExp(user.type, "gim").test(Component.auth.role)) return <Navigate to="/" replace />;

  // overflow-y-auto  pb-[100px] pt-4 py-8 sm:px-6 lg:px-8 >> mb-[100px] mt-4 sm:mx-6 lg:mx-8
  return (
    <div className="flex max-h-screen overflow-hidden h-screen bg-white dark:bg-black">
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      <div className="w-full">
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} /> */}
        <main className="h-screen w-full pb-[64px]">
          <Component user={user} />
          {typeof children == "function" ? children(user) : children}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
