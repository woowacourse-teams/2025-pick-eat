export const colorCreator = {
  uniquePastel: (id: number): string => {
    let r = (id * 37) % 256;
    let g = (id * 59) % 256;
    let b = (id * 83) % 256;

    r = Math.floor(r * 0.7 + 255 * 0.3);
    g = Math.floor(g * 0.7 + 255 * 0.3);
    b = Math.floor(b * 0.7 + 255 * 0.3);

    const toHex = (v: number): string => v.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  },
};
