import { useState, useEffect } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import { writeClipboardText } from "./CopyToClipboard.jsx";

export default function Color({ color, onDeleteColor, onEditColor }) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [copyMode, setCopyMode] = useState(false);
  const [contrastCheck, setContrastCheck] = useState()

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

  function handleCopy() {
    setCopyMode(true);
    writeClipboardText(color.hex);
  }

  useEffect(() => {
    let timeoutId;
    if (copyMode) {
      timeoutId = setTimeout(() => {
        setCopyMode(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [copyMode]);

  useEffect (()=>{
    async function contrastCheckStatus() {
      const response = await fetch(
        "https://www.aremycolorsaccessible.com/api/are-they",
        {
          method: "POST",
          body: JSON.stringify({ colors:[color.hex, color.contrastText]}),
          type: "application/json",
        }
      );
      const result = await response.json();
      console.log(result.overall);
      setContrastCheck(result.overall);
    }
    contrastCheckStatus();
  }, [color.hex, color.contrastText]);



  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <button onClick={handleCopy}>
        {copyMode ? "SUCCESSFULLY COPIED!" : "COPY"}
      </button>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p><span
        className="contrastCheck"
        style={{
          backgroundColor:
            contrastCheck === "Yup"
              ? "green"
              : contrastCheck === "Kinda"
              ? "orange"
              : "red",
        }}
      >
        Overall Contrast Score: {contrastCheck}
      </span><br/>
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
