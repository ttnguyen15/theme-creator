export async function writeClipboardText(hexCode) {
  try {
    await navigator.clipboard.writeText(hexCode);
  } catch (error) {
    console.error(error.message);
  }
}
    try {
      await navigator.clipboard.writeText(hexCode);
    } catch (error) {
      console.error(error.message);
    }
  }
