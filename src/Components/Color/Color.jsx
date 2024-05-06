import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onDeleteColor, onEditColor }) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function handleDelete() {
    if (deleteMode) {
      onDeleteColor(color.id);
    } else {
      setDeleteMode(true);
    }
  }

  function handleEditMode() {
    setEditMode(!editMode);
  }

  function handleExitEditMode() {
    setEditMode(false);
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      {editMode ? (
        <ColorForm
          editMode={editMode}
          initialData={color}
          onSubmitColor={onEditColor}
          onCancel={handleEditMode}
          onExitEditMode={handleExitEditMode}
        />
      ) : deleteMode ? (
        <>
          <p className="color-card-highlight">
            Really delete?
            <button
              type="button"
              onClick={() => {
                setDeleteMode(false);
              }}
            >
              CANCEL
            </button>
            <button type="button" onClick={handleDelete}>
              DELETE
            </button>
          </p>
        </>
      ) : (
        <>
          <button type="button" onClick={handleEditMode}>
            EDIT
          </button>
          <button type="button" onClick={handleDelete}>
            DELETE
          </button>
        </>
      )}
    </div>
  );
}
