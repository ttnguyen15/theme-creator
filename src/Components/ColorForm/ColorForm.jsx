import ColorInput from "../ColorInput/ColorInput.jsx";
import "../ColorForm/ColorForm.css";

export default function ColorForm({
  onSubmitColor,
  initialData = { role: "some color", hex: "#123456", contrastText: "#ffffff" },
  onCancel,
  editMode
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (editMode) {
      data.id = initialData.id;
    }

    onSubmitColor(data);
    event.target.reset();
    event.target.elements.role.focus();
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
          defaultValue={initialData.role}
        />
      </label>
      <br />
      <label htmlFor="hex">
        Hex
        <br />
        <ColorInput id="hex" defaultValue={initialData.hex} />
      </label>
      <br />
      <label htmlFor="contrastText">
        Contrast Text
        <br />
        <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
      </label>
      <br />
      <button type="submit">
        {initialData.id ? "UPDATE COLOR" : "ADD COLOR"}
      </button>
      {initialData.id && <button onClick={onCancel}>CANCEL</button>}
    </form>
  );
}
