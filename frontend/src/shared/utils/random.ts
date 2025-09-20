export const random = {
  getPastelColor,
};

function getPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 50 + Math.random() * 10;
  const lightness = 60 + Math.random() * 10;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
