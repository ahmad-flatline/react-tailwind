// import logo from './logo.svg'; // <img src={logo} className="App-logo" alt="logo" />
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TransitionContainer from "./component/transition-container";
import AuthLayout from "./component/layout/auth-layout";
import Loader from "./component/layout/loader";
import TodoList from "./page/todo-list";
import Home from "./page/home";
import Signup from "./page/signup";
import "./app.css";

function App() {
  const [loading, serLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    const user = { id: "id-2343", name: "Mister Admin Tester", type: "ROOT" };
    setUser(user);

    serLoading(false);
  };

  useEffect(() => {
    fetchUser();
    setTimeout(() => window.changeThemeMode(), 2000);
  }, []);

  if (loading) return <Loader fontSize="100px" full />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup user={user} />} />
        <Route path="/login" element={"<Login user={user} setUser={setUser} />"} />
        <Route path="/reset-psw" element={"<ResetPassword user={user} setUser={setUser} />"} />
        <Route path="/success" element={"<Success />"} />

        {authenticatedComponents.map((Component, i) => (
          <Route
            key={i}
            path={Component.auth.path}
            element={<AuthLayout user={user} Component={Component} />}
          />
        ))}

        <Route path="/*" element={"<NotFound />"} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const authenticatedComponents = [Home, TodoList];
