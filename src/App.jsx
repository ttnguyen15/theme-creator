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

  return (
    <>
      <h1>Theme Creator</h1>
      <br></br>
      <ColorForm onSubmitColor={handleAddColor} />
      <br></br>

      {colors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;
