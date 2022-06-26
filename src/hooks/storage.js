import { useEffect, useState } from "react";
import {
  addFirebaseItem,
  clearFirebaseItem,
  getFirebaseItems,
  updateFirebaseItem,
} from "../lib/firebase";

function useStorage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const data = await getFirebaseItems();
    setItems(data);
  };

  const addItem = async (item) => {
    const newItem = { text: item.text, done: item.done };
    await addFirebaseItem(newItem);
    setItems([...items, newItem]);
    getItems();
  };

  const updateItem = async (checked) => {
    const changes = { done: !checked.done };
    await updateFirebaseItem(changes, checked.id);
    const newItems = items.map((item) => {
      if (item.id === checked.id) {
        item = { ...item, changes };
      }
      return item;
    });
    setItems(newItems);
    getItems();
  };

  const clearItems = () => {
    items.map((item) => clearFirebaseItem(item));
    setItems([]);
    getItems();
  };

  return [items, addItem, updateItem, clearItems];
}

export default useStorage;
