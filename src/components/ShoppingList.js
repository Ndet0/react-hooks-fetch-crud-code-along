import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((data) => setItems(data));
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function addItem(newItem) {
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((r) => r.json())
      .then((item) => setItems([...items, item]));
  }

  function updateItem(updatedItem) {
    fetch(`http://localhost:4000/items/${updatedItem.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then((r) => r.json())
      .then((item) => {
        const updatedItems = items.map((i) => (i.id === item.id ? item : i));
        setItems(updatedItems);
      });
  }

  function deleteItem(id) {
    fetch(`http://localhost:4000/items/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedItems = items.filter((i) => i.id !== id);
      setItems(updatedItems);
    });
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={addItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={updateItem}
            onDeleteItem={deleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
