import { useState } from "react";

// Initial packing items
// const initialItems = [
//   { id: 1, description: "Shirt", quantity: 5, packed: false },
//   { id: 2, description: "Pants", quantity: 2, packed: false },
// ];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({OnHandleItem}) {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [items, setItems] = useState([]);


  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id:Date.now(),
      description:description,
      quantity :quantity,
      packed: false
    }
  }

  handleAddItems(newItem);

  // clear the entry for description and qty 
  setDescription('');
  setQuantity(1);

  function handleAddItems(item){
    setItems((prevItems) => [...prevItems, item]);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      <input value={description} type="text" placeholder="Item..." onChange={(e) => setDescription(e.target.value)} />
      <button type="submit"> Add </button>

    </form>
  );
}

function Item ({ itemProp }) {
  return (
    <li>{itemProp.description} {itemProp.quantity}</li>
  );
}


function PackingList({itemProp}) {
  
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
         <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          <li key={item.id}><Item itemProp={item}/></li>
         </span>
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in the list. You already packed Y (Z%).</em>
    </footer>
  );
}

function App() {

  //life the state up to the parent <App /> component
  const [items,setItems]=useState([]);
  function handleAddItems(item){
    setItems((prevItems) => [...prevItems, item]);
  }
  return (
    <div className="app">
      <Logo />
      <Form OnHandleItem={handleAddItems}/>
      <PackingList itemProp={items}/>
      <Stats />
    </div>
  );
}

export default App;
