export interface Hsl {
  hue: number;
  saturation: number;
  lightness: number;
}

export interface Rgb {
  red: number;
  green: number;
  blue: number;
}

export function hexToHsl(hex: string): Hsl {
  let { red: r, green: g, blue: b } = hexToRgb(hex);

  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return {
    hue: h,
    saturation: s,
    lightness: l
  }
}

const { abs, min, max, round } = Math;

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from https://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
export function hslToRgb(hsl: Hsl): Rgb {
  let { hue: h, saturation: s, lightness: l } = hsl
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return {
    red: Math.floor(255 * f(0)),
    green: Math.floor(255 * f(8)),
    blue: Math.floor(255 * f(4))
  }
}

export function rgbToString(rgb: Rgb): string {
  return `rgb(${rgb.red},${rgb.green},${rgb.blue})`
}

export function rgbToHex(rgb: Rgb, showHash = true): string {
  return (showHash ? '#' : '') + rgb.red.toString(16).padStart(2, '0') +
    rgb.green.toString(16).padStart(2, '0') +
    rgb.blue.toString(16).padStart(2, '0');
}

export function hslToString(hsl: Hsl): string {
  return `hsl(${hsl.hue},${hsl.saturation}%,${hsl.lightness}%)`
}

export function setLightness(hsl: Hsl, lightness: number): Hsl {
  const newHsl = JSON.parse(JSON.stringify(hsl))
  newHsl.lightness = lightness
  return newHsl
}

export function hexToRgb(hex: string): Rgb {
  const hexWithoutHash = hex.substr(1);
  const red = parseInt(hexWithoutHash.substr(0, 2), 16);
  const green = parseInt(hexWithoutHash.substr(2, 2), 16);
  const blue = parseInt(hexWithoutHash.substr(4, 2), 16);

  return { red, green, blue }
}