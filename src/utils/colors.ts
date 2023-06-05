
// Check if a color is a valid hex (without the #)
export function isValidHex(color: string) {
  return color.match(/^([0-9A-F]{3}){1,2}$/i)?.[0] || null;
}

export function parseHexColor(color: string | undefined) {
  if (!color) return null;
  const valid_hex = isValidHex(color);
  if (valid_hex) {
    return `#${valid_hex}`;
  }
  return null;
}
