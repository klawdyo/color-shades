import { Rgb } from "./rgb";
import { toJson } from "./utils";

export class Hsl {
  hue: number;
  saturation: number;
  lightness: number;

  constructor(color: Partial<Hsl>) {
    this.hue = color.hue || 0;
    this.saturation = color.saturation || 0;
    this.lightness = color.lightness || 0;
  }

  /**
   * Cria um objeto de cor Hsl a partir de uma string de cor css no padão hsl
   * @example
   * Hsl.fromString('hsl(110, 80%, 80%)')
   * Mais exemplos em: https://regexr.com/7m267
   * 
   * @param color string
   * @returns Hsl
   */
  static fromString(color: string): Hsl {
    // https://regexr.com/7m267
    const rgx = /^hsl\s?\(([0-9]{1,2}|[1-2][0-9]{2}|3[0-5][0-9]|360)(?:[^0-9]*)?([0-9]{1,2}|100)(?:[^0-9]*)?([0-9]{1,2}|100)\s?%?\s?\)/i
    const matches = rgx.exec(color)

    if (!matches) throw new Error('Não é um HSL válido')

    return new Hsl({
      hue: +matches[1],
      saturation: +matches[2],
      lightness: +matches[3]
    })
  }

  /**
   * Cria um objeto de cor Hsl a partir de um objeto Rgb
   */
  static fromRgb(color: Rgb) {
    let { red, green, blue } = color;
    red /= 255, green /= 255, blue /= 255;
    var max = Math.max(red, green, blue), min = Math.min(red, green, blue);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case red: h = (green - blue) / d + (green < blue ? 6 : 0); break;
        case green: h = (blue - red) / d + 2; break;
        case blue: h = (red - green) / d + 4; break;
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

  // 
  // 
  // SETTERS
  // 
  // 

  /**
   * Define o lightness de uma cor
   */
  setLightness(lightness: number) {
    const self = toJson<Hsl>(this)
    self.lightness = lightness
    return new Hsl(self)
  }

  /**
   * Define o saturation de uma cor
   */
  setSaturation(saturation: number) {
    const self = toJson<Hsl>(this)
    self.saturation = saturation
    return new Hsl(self)
  }

  /**
   * Define o hue de uma cor
   */
  setHue(hue: number) {
    const self = toJson<Hsl>(this)
    self.hue = hue
    return new Hsl(self)
  }

  // 
  // 
  // GETTERS
  // 
  // 

  /**
   * Converte o objeto atual para Rgb
   * @returns Rgb
   */
  toRgb(): Rgb {
    // let { hue: h, saturation: s, lightness: l } = hsl
    let h = this.hue;
    let s = this.saturation;
    let l = this.lightness;

    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    return new Rgb({
      red: Math.floor(255 * f(0)),
      green: Math.floor(255 * f(8)),
      blue: Math.floor(255 * f(4))
    } as Rgb)
  }

  /**
   * Converte o objeto atual para uma string no padrão usado pelo css
   * @returns string
   */
  toString() {
    return `hsl(${this.hue},${this.saturation}%,${this.lightness}%)`
  }

}