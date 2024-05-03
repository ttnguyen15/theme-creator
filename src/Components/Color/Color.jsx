import { useState } from "react";
import "./Color.css";

export default function Color({ color, onDeleteColor }) {
  const [approveDelete, setApproveDelete] = useState(false);

  function handleDelete() {
    if (approveDelete === false) {
      setApproveDelete(true);
    } else {
      onDeleteColor(color.id);
      setApproveDelete(false);
    }
  }

  function handleCancel() {
    setApproveDelete(false);
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-highlight">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      {approveDelete ? (
        <>
          <p>
            Really delete?
            <button type="button" onClick={handleCancel}>
              CANCEL
            </button>
            <button type="button" onClick={handleDelete}>
              DELETE
            </button>
          </p>
        </>
      ) : (
        <>
          <button type="button" onClick={handleDelete}>
            DELETE
          </button>
        </>
      )}
    </div>
  );
}
