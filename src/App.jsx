import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColor] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  function handleAddColor(color) {
    setColor([{ ...color, id: uid() }, ...colors]);
  }

  function handleDeleteColor(id) {
    setColor(colors.filter((color) => color.id !== id));
  }

  const handleEditColor = (editedColor) => {
    const updatedColors = colors.map((color) =>
      color.id === editedColor.id ? editedColor : color
    );

    setColor(updatedColors);
  };

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={handleAddColor} initialData={initialColors} />
      {colors.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
            onEditColor={handleEditColor}
          />
        );
      })}
    </>
  );
}

export default App;
