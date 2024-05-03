import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { useState } from "react";
import { uid } from "uid";

function App() {
  const [colors, setColor] = useState(initialColors);

  function handleAddColor(color) {
    setColor([{ ...color, id: uid() }, ...colors]);
  }

  function handleDeleteColor(id) {
    const afterDeletion = colors.filter((color) => color.id !== id);
    setColor(afterDeletion);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={handleAddColor} />
      {colors.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
          />
        );
      })}
    </>
  );
}

export default App;
