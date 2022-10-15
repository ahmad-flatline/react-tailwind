import { useState } from "react";
import Loader from "../component/layout/loader";
import TransitionContainer from "../component/transition-container";

function TodoList() {
  const [items, setItems] = useState([
    { id: "id-1", content: "Some content 1" },
    { id: "id-2", content: "Some content 2" },
  ]);

  const addItem = (content) => setItems([...items, { id: "id-" + Math.random(), content }]);
  const removeItem = (id) => setItems(items.filter((item) => item.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(e.target.content.value);
  };

  return (
    <div className="max-w-[600px] m-auto px-6 py-8 rounded-lg ring-1 ring-slate-900/5 shadow-xl dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm">
      <form onSubmit={handleSubmit} className="">
        <div className="flex ">
          <input
            type="text"
            name="content"
            className="input flex-auto border border-indigo-600 rounded-l-md"
          />
          <button className="bg-indigo-500 text-white py-1 px-2 rounded-r-md">Add</button>
        </div>
      </form>
      <TransitionContainer
        tag="ul"
        className=""
        base="mt-3 p-2 bg-slate-900 text-white rounded-md transition duration-500 ease-in-out"
        enter="translate-y-12 rotate-12 opacity-0"
        update=""
        exit="translate-y-12 rotate-12 opacity-0"
        time={500}
      >
        {items.map((item, i) => (
          <li key={i} onClick={() => removeItem(item.id)} className="">
            {item.content}
          </li>
        ))}
      </TransitionContainer>
    </div>
  );
}
TodoList.auth = { path: "/todo-list", role: "ROOT" };
export default TodoList;
