// Convert hex color (#RRGGBB) to RGB array
const hexToRgb = (hex) => {
  // Remove the leading '#' if present
  hex = hex.replace("#", "");

  // Parse R, G, B values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
};

// Determine the text color based on background luminance
export const getTextColor = (bgColor) => {
  const [r, g, b] = hexToRgb(bgColor);

  // Calculate relative luminance
  const [rLin, gLin, bLin] = [r, g, b].map((c) => {
    const cNorm = c / 255;
    return cNorm <= 0.03928
      ? cNorm / 12.92
      : Math.pow((cNorm + 0.055) / 1.055, 2.4);
  });

  const luminance = 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;

  // Return black for light backgrounds, white for dark backgrounds
  return luminance > 0.179 ? "black" : "white";
};
