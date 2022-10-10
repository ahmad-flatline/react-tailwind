import React from "react";
import TodoList from "./todo-list";
// import RootUserDashboard from "../component/home/root-user-dashboard";
// import CompanyDashboard from "../component/home/company-dashboard";
// import MemberDashboard from "../component/home/member-dashboard";

const Home = (props) => {
  if (props.user.type === "ROOT") return <TodoList />; // "<RootUserDashboard {...props} />";
  else if (props.user.type === "COMPANY") return "<CompanyDashboard {...props} />";
  return "<MemberDashboard {...props} />";
};

// ROOT means the software owner.
// COMPANY means the company account owner who owens the subscription
// ADMIN means the administrator that company assigned to manage specific roles
// MEMBER means the the employee
Home.auth = { path: "/", role: "ROOT" };
export default Home;
