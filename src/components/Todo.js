import { useState } from "react";
import useStorage from "../hooks/storage";
import { getKey } from "../lib/util";
import Filter from "./Filter";
import Input from "./Input";
import TodoItem from "./TodoItem";

function Todo() {
  const [items, addItem, updateItem, clearItems] = useStorage();
  const [filter, setFilter] = useState("ALL");

  const displayItems = items.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "TODO") return !item.done;
    return item.done;
  });

  const handleCheck = (checked) => {
    updateItem(checked);
  };

  const handleAdd = (text) => {
    addItem({ text, done: false });
  };

  const handleFilterChange = (value) => setFilter(value);

  return (
    <article className="panel is-primary">
      <div className="panel-heading">
        <span className="icon-text">
          <span> ITSS Todoアプリ</span>
        </span>
      </div>
      <Input onAdd={handleAdd} />
      <Filter onChange={handleFilterChange} value={filter} />
      {displayItems.map((item) => (
        <TodoItem key={getKey()} item={item} onCheck={handleCheck} />
      ))}
      <div className="panel-block">{displayItems.length} items</div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={clearItems}>
          全てのToDoを削除
        </button>
      </div>
    </article>
  );
}

export default Todo;
