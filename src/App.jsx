import { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(()=>{
    const localValue = localStorage.getItem("ITEMS");
    if(localValue == null) return[]
    return JSON.parse(localValue)
  });
  useEffect(()=>{
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  },[todos])

   function handleSubmit(e) {
    e.preventDefault();
    
    // Prevent adding empty items or only spaces
    if (newItem.trim() === "") {
      alert("Please enter a valid to-do item!");
      return;
    }
  
    setTodos(currentTodos => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false }
    ]);
  
    setNewItem(""); // Clear the input field after adding
  }

  function toggleTodos(id, completed) {
    setTodos(currentTodos =>
      currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      })
    )
  }
  function deletetodo(id) {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor='item'>New Item</label>
          <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id='item' />
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>To-Do List</h1>
      <ul className='list'>
        {todos.length ===0 && "No Todos"}
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.completed} onChange={e => toggleTodos(todo.id, e.target.checked)} />
              {todo.title}
            </label>
            <button onClick={() => deletetodo(todo.id)}
            className='btn btn-danger'>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
