import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleAddToCart() {
    const updatedItem = { ...item, isInCart: !item.isInCart };
    onUpdateItem(updatedItem);
  }

  function handleDelete() {
    onDeleteItem(item.id);
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCart}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
