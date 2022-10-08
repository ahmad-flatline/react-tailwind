// import logo from './logo.svg'; // <img src={logo} className="App-logo" alt="logo" />
import { useEffect, useState } from "react";
// import TransitionContainer from "./component/transition-container";
import TodoList from "./page/todo-list";
import "./app.css";

function App() {
  const [show, serShow] = useState(true);

  useEffect(() => {
    serShow(false);
  }, []);

  return (
    <div className="">
      <header className="">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        {show && <div>Hello</div>}
      </header>
      <TodoList />
    </div>
  );
}

export default App;
