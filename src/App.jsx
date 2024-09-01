import React, { useState, useEffect } from "react";

const App = () => {
  // State to hold input value, list of items, and edit mode
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Track if editing mode is enabled
  const [editIndex, setEditIndex] = useState(null); // Track which item is being edited

  // Load items from localStorage when component mounts
  useEffect(() => {
    const savedItems = localStorage.getItem("tasks");
    if (savedItems) {
      setItems(JSON.parse(savedItems)); // Load items from localStorage
    }
  }, []);

  // Save items to localStorage whenever `items` state changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(items));
    }
  }, [items]);

  // Function to handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value
  };

  // Function to add a new item
  const addItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue]); // Add input value to items array
      setInputValue(""); // Clear input after adding
    }
  };

  // Function to update an existing item by removing the original and adding the edited one
  const updateItem = () => {
    if (inputValue.trim()) {
      const updatedItems = items.filter((_, i) => i !== editIndex); // Remove the original item
      setItems([...updatedItems, inputValue]); // Add the updated item at the end of the array
      setInputValue(""); // Clear the input after updating
      setIsEditing(false); // Exit edit mode
      setEditIndex(null); // Reset the index being edited
    }
  };

  // Function to delete an item
  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index); // Remove item by index
    setItems(updatedItems); // Update items array
  };

  // Function to handle edit action
  const editItem = (index) => {
    setInputValue(items[index]); // Pre-fill input with selected item
    setIsEditing(true); // Enable edit mode
    setEditIndex(index); // Store the index of the item being edited
  };

  return (
    <div className=" p-8 m-44 bg-green-300 ">
      <input
        className="h-8 w-1/2 ml-10 bg-green-200 mr-8"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter item"
      />
      {/* Conditionally render Add or Update button based on edit mode */}
      <button onClick={isEditing ? updateItem : addItem}>
        {isEditing ? "Update" : "Add"}
      </button>

      <ul >
      {items.map((item, index) => (
   <li className="border m-10 p-4" key={index}>
            {item} 
            <div className=" pl-[69rem]">
            <button className="" onClick={() => editItem(index)}>
              <lord-icon
                src="https://cdn.lordicon.com/wuvorxbv.json"
                trigger="hover"
                colors="primary:#121331,secondary:#08a88a"
                style={{ width: "40px", height: "40px" }}
              ></lord-icon>{" "}
            </button>

            <button className="pl-8 " onClick={() => deleteItem(index)}>
              {" "}
              <lord-icon
                src="https://cdn.lordicon.com/drxwpfop.json"
                trigger="hover"
                colors="primary:#121331,secondary:#08a88a"
                style={{ width: "40px", height: "40px" }}
              ></lord-icon>
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
