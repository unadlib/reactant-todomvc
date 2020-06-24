import React, { useState, FC } from "react";
import { Todo } from "src/todo.service";

interface ItemProps {
  todo: Todo;
  onEdit(id: string, text: string): void;
  onToggle(id: string): void;
  onDelete(id: string): void;
}

export const Item: FC<ItemProps> = ({ todo, onEdit, onToggle, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  return (
    <li
      onDoubleClick={() => !editing && setEditing(true)}
      className={`${editing ? "editing" : ""} ${
        todo.completed ? "completed" : ""
      }`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          autoFocus={true}
        />
        <label>{todo.text}</label>
        <button className="destroy" onClick={() => onDelete(todo.id)} />
      </div>
      {editing && (
        <input
          className="edit"
          value={todo.text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.which === 13) {
              onEdit(todo.id, text.trim());
              setText(todo.text);
            }
          }}
        />
      )}
    </li>
  );
};
