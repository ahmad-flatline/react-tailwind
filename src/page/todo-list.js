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
    <div>
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

export default TodoList;
