import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./sidebar-link-group";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside>
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-50 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block w-[40px]">
            <img alt="logo" src="/logo.png" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-900 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
            </h3>
            <ul className="mt-3" onClick={() => setSidebarExpanded(true)}>
              <SidebarLinkGroup active={pathname === "/" || pathname.includes("dashboard")}>
                {(active) => (
                  <NavLink
                    end
                    to="/"
                    className="flex items-center px-3 py-2 text-slate-900 transition duration-150 truncate"
                  >
                    <svg
                      className="shrink-0 h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        stroke={active ? "#6366f1" : "#9CA3AF"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 10L3 8M3 8L10 1L17 8M3 8V18C3 18.5523 3.44772 19 4 19H7M17 8L19 10M17 8V18C17 18.5523 16.5523 19 16 19H13M7 19C7.55228 19 8 18.5523 8 18V14C8 13.4477 8.44772 13 9 13H11C11.5523 13 12 13.4477 12 14V18C12 18.5523 12.4477 19 13 19M7 19H13" />
                      </g>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </NavLink>
                )}
              </SidebarLinkGroup>

              <SidebarLinkGroup active={pathname.includes("assignment")}>
                {(active) => (
                  <NavLink
                    end
                    to="/assignment"
                    className="flex items-center px-3 py-2 text-slate-900 transition duration-150 truncate "
                  >
                    <svg
                      className="shrink-0 h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        stroke={active ? "#6366f1" : "#9CA3AF"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 5V1M14 5V1M5 9H15M3 19H17C18.1046 19 19 18.1046 19 17V5C19 3.89543 18.1046 3 17 3H3C1.89543 3 1 3.89543 1 5V17C1 18.1046 1.89543 19 3 19Z" />
                      </g>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Assignment
                    </span>
                  </NavLink>
                )}
              </SidebarLinkGroup>

              <SidebarLinkGroup active={pathname.includes("chat")}>
                {(active) => (
                  <NavLink
                    end
                    to="/chat"
                    className="flex items-center px-3 py-2 text-slate-900 transition duration-150 truncate "
                  >
                    <svg
                      className="shrink-0 h-6 w-6"
                      viewBox="0 0 22 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        stroke={active ? "#6366f1" : "#9CA3AF"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 17H21V15C21 13.3431 19.6569 12 18 12C17.0444 12 16.1931 12.4468 15.6438 13.1429M16 17H6M16 17V15C16 14.3438 15.8736 13.717 15.6438 13.1429M6 17H1V15C1 13.3431 2.34315 12 4 12C4.95561 12 5.80686 12.4468 6.35625 13.1429M6 17V15C6 14.3438 6.12642 13.717 6.35625 13.1429M6.35625 13.1429C7.0935 11.301 8.89482 10 11 10C13.1052 10 14.9065 11.301 15.6438 13.1429M14 4C14 5.65685 12.6569 7 11 7C9.34315 7 8 5.65685 8 4C8 2.34315 9.34315 1 11 1C12.6569 1 14 2.34315 14 4ZM20 7C20 8.10457 19.1046 9 18 9C16.8954 9 16 8.10457 16 7C16 5.89543 16.8954 5 18 5C19.1046 5 20 5.89543 20 7ZM6 7C6 8.10457 5.10457 9 4 9C2.89543 9 2 8.10457 2 7C2 5.89543 2.89543 5 4 5C5.10457 5 6 5.89543 6 7Z" />
                      </g>
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Chat
                    </span>
                  </NavLink>
                )}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                active={pathname.includes("activity/overview") || pathname.includes("activity/create")}
              >
                {(active) => (
                  <NavLink
                    end
                    to="/activity/overview"
                    className="flex items-center px-3 py-2 text-slate-900 transition duration-150 truncate "
                  >
                    <svg
                      className="shrink-0 h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        stroke={active ? "#6366f1" : "#9CA3AF"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 5V1M14 5V1M5 9H15M3 19H17C18.1046 19 19 18.1046 19 17V5C19 3.89543 18.1046 3 17 3H3C1.89543 3 1 3.89543 1 5V17C1 18.1046 1.89543 19 3 19Z" />
                      </g>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Manage activity
                    </span>
                  </NavLink>
                )}
              </SidebarLinkGroup>

              <SidebarLinkGroup active={pathname.includes("configuration")}>
                {(active) => (
                  <NavLink
                    end
                    to="/configuration"
                    className="flex items-center px-3 py-2 text-slate-900 transition duration-150 truncate "
                  >
                    <svg
                      className="shrink-0 h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        stroke={active ? "#6366f1" : "#9CA3AF"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 5V1M14 5V1M5 9H15M3 19H17C18.1046 19 19 18.1046 19 17V5C19 3.89543 18.1046 3 17 3H3C1.89543 3 1 3.89543 1 5V17C1 18.1046 1.89543 19 3 19Z" />
                      </g>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Configuration
                    </span>
                  </NavLink>
                )}
              </SidebarLinkGroup>

              <SidebarLinkGroup active={pathname.includes("activity/performance")}>
                {(active) => (
                  <NavLink
                    end
                    to="/activity/performance"
                    className="flex items-center px-3 py-2 text-slate-900 transition duration-150 truncate "
                  >
                    <svg
                      className="shrink-0 h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill={active ? "#6366f1" : "#9CA3AF"}>
                        <path d="M5.29289 13.2929C4.90237 13.6834 4.90237 14.3166 5.29289 14.7071C5.68342 15.0976 6.31658 15.0976 6.70711 14.7071L5.29289 13.2929ZM13 9C13 10.1046 12.1046 11 11 11V13C13.2091 13 15 11.2091 15 9H13ZM9 9C9 7.89543 9.89543 7 11 7V5C8.79086 5 7 6.79086 7 9H9ZM11 7C12.1046 7 13 7.89543 13 9H15C15 6.79086 13.2091 5 11 5V7ZM8.17157 10.4142L5.29289 13.2929L6.70711 14.7071L9.58579 11.8284L8.17157 10.4142ZM11 11C10.4474 11 9.94881 10.7772 9.58579 10.4142L8.17157 11.8284C8.89434 12.5512 9.89571 13 11 13V11ZM9.58579 10.4142C9.22276 10.0512 9 9.55256 9 9H7C7 10.1043 7.44881 11.1057 8.17157 11.8284L9.58579 10.4142ZM18 10C18 14.4183 14.4183 18 10 18V20C15.5228 20 20 15.5228 20 10H18ZM10 18C5.58172 18 2 14.4183 2 10H0C0 15.5228 4.47715 20 10 20V18ZM2 10C2 5.58172 5.58172 2 10 2V0C4.47715 0 0 4.47715 0 10H2ZM10 2C14.4183 2 18 5.58172 18 10H20C20 4.47715 15.5228 0 10 0V2Z" />
                      </g>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Activity performance
                    </span>
                  </NavLink>
                )}
              </SidebarLinkGroup>

              <SidebarLinkGroup active={pathname.includes("notifications")}>
                {(active) => (
                  <NavLink
                    end
                    to="/notifications"
                    className="flex items-center px-3 py-2 text-slate-900 transition duration-150 truncate "
                  >
                    <svg
                      className="shrink-0 h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        stroke={active ? "#6366f1" : "#9CA3AF"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 3.88218V17.2402C9 18.2121 8.2121 19 7.24018 19C6.49646 19 5.83302 18.5325 5.58288 17.8321L3.43647 11.6829M16 11C17.6569 11 19 9.65685 19 8C19 6.34315 17.6569 5 16 5M3.43647 11.6829C2.0043 11.0741 1 9.65433 1 8C1 5.79086 2.79086 4 4.99999 4H6.83208C10.9327 4 14.4569 2.7659 16 1L16 15C14.4569 13.2341 10.9327 12 6.83208 12L4.99998 12C4.44518 12 3.91677 11.887 3.43647 11.6829Z" />
                      </g>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Notifications
                    </span>
                  </NavLink>
                )}
              </SidebarLinkGroup>

              <SidebarLinkGroup active={pathname.includes("approval")}>
                {(active) => (
                  <NavLink
                    end
                    to="/approval"
                    className="flex items-center px-3 py-2 text-slate-900 transition duration-150 truncate "
                  >
                    <svg
                      className="shrink-0 h-6 w-6"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        stroke={active ? "#6366f1" : "#9CA3AF"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L1.55279 14.2764C1.214 14.107 1 13.7607 1 13.382V2.61803C1 1.87465 1.78231 1.39116 2.44721 1.72361L7 4M7 17L13 14M7 17V4M13 14L17.5528 16.2764C18.2177 16.6088 19 16.1253 19 15.382V4.61803C19 4.23926 18.786 3.893 18.4472 3.72361L13 1M13 14V1M13 1L7 4" />
                      </g>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Approval
                    </span>
                  </NavLink>
                )}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path
                  className="text-slate-900"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
