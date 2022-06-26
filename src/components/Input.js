import { useState } from "react";

function Input({ onAdd }) {
  const [text, setText] = useState("");

  const handleChange = (e) => setText(e.target.value);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <div className="panel-block">
      <input
        className="input"
        type="text"
        placeholder="Todoを入力してください"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Input;
