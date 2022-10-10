import { useState } from "react";
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
      <form onSubmit={handleSubmit}>
        <input type="text" name="content" />
        <button>Add</button>
      </form>
      <TransitionContainer tag="ul" base="" enter="" update="" exit="" time={500}>
        {items.map((item, i) => (
          <li key={i} onClick={() => removeItem(item.id)}>
            {item.content}
          </li>
        ))}
      </TransitionContainer>
    </div>
  );
}
TodoList.auth = { path: "/todo-list", role: "ROOT" };
export default TodoList;
