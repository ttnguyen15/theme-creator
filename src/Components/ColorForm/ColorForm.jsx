import ColorInput from "../ColorInput/ColorInput.jsx";
import "../ColorForm/ColorForm.css";

export default function ColorForm({
  onSubmitColor,
  initialData,
  onCancel,
  editMode,
  onExitEditMode,
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (editMode) {
      data.id = initialData.id;
    }

    onSubmitColor(data);
    /*  event.target.reset();
    event.target.elements.role.focus();*/

    if (editMode) {
      onExitEditMode();
    }
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label htmlFor="role">
        Role
        <br />
        <input
          type="text"
          id="role"
          name="role"
          defaultValue={initialData ? initialData.role : "Color Role"}
        />
      </label>
      <br />
      <label htmlFor="hex">
        Hex
        <br />
        <ColorInput
          id="hex"
          defaultValue={initialData ? initialData.hex : "#rrggbb"}
        />
      </label>
      <br />
      <label htmlFor="contrastText">
        Contrast Text
        <br />
        <ColorInput
          id="contrastText"
          defaultValue={initialData ? initialData.contrastText : "#rrggbb"}
        />
      </label>
      <br />
      <button type="submit">{editMode ? "UPDATE COLOR" : "ADD COLOR"}</button>
      {editMode && <button onClick={onCancel}>CANCEL</button>}
    </form>
  );
}
