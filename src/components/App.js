import { useState } from "react";

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ OnHandleItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false
    };

    OnHandleItem(newItem);

    // Clear the entry for description and quantity
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>

      <input
        value={description}
        type="text"
        placeholder="Item..."
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

function Item({ itemProp }) {
  return (
    <li>
      <span
        style={
          itemProp.packed
            ? { textDecoration: "line-through" }
            : {}
        }
      >
        {itemProp.description} {itemProp.quantity}
      </span>
    </li>
  );
}

function PackingList({ itemProp }) {
  return (
    <div className="list">
      <ul>
        {itemProp.map((item) => (
          <Item key={item.id} itemProp={item} />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        You have X items in the list. You already packed Y (Z%).
      </em>
    </footer>
  );
}

function App() {
  // Lift the state up to the parent App component
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form OnHandleItem={handleAddItems} />
      <PackingList itemProp={items} />
      <Stats />
    </div>
  );
}

export default App;
