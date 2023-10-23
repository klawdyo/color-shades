import { toJson } from "./utils";

export class Rgb {
  red: number;
  green: number;
  blue: number;

  constructor(color: Partial<Rgb>) {
    this.red = color.red || 0;
    this.green = color.green || 0;
    this.blue = color.blue || 0;
  }

  /**
   * Cria uma cor Rgb a partir de um hexadecimal
   * @param hex string
   * @returns Rgb
   */
  static fromHex(hex: string): Rgb {
    const hexWithoutHash = hex.substr(1);
    const red = parseInt(hexWithoutHash.substr(0, 2), 16);
    const green = parseInt(hexWithoutHash.substr(2, 2), 16);
    const blue = parseInt(hexWithoutHash.substr(4, 2), 16);

    return new Rgb({
      red,
      green,
      blue,
    })
  }

  /**
   * Cria uma cor Rgb a partir de ums string no padrão css
   * 
   * @example
   * Rgb.fromString('rgb(100, 105, 87)')
   * Mais exemplos em formatos suportados em: https://regexr.com/7m2ho
   * 
   * @param color string
   * @returns Rgb
   */
  static fromString(color: string): Rgb {
    // https://regexr.com/7m2ho
    const rgx = /^rgb\s?\(\s?([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[\,\s]*([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[\,\s]*([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\s?\)/i
    const matches = rgx.exec(color)

    if (!matches) throw new Error('Não é um Rgb válido')

    return new Rgb({
      red: +matches[1],
      green: +matches[2],
      blue: +matches[3]
    })
  }


  // 
  // 
  // SETTERS
  // 
  // 

  /**
   * 
   * @param red 
   * @returns 
   */
  setRed(red: number): Rgb {
    const self = toJson<Rgb>(this)
    self.red = red;
    return new Rgb(self)
  }

  /**
   * 
   * @param green 
   * @returns 
   */
  setGreen(green: number): Rgb {
    const self = toJson<Rgb>(this)
    self.green = green;
    return new Rgb(self)
  }

  /**
   * 
   * @param blue 
   * @returns 
   */
  setBlue(blue: number): Rgb {
    const self = toJson<Rgb>(this)
    self.blue = blue;
    return new Rgb(self)
  }




  // 
  // 
  // GETTERS
  // 
  // 


  /**
   * Converte o objeto atual em hexadecimal
   * @param showHash boolean Mostra ou não mostra o hash no início
   * @returns string
   */
  toHex(showHash = true): string {
    return (showHash ? '#' : '') + this.red.toString(16).padStart(2, '0') +
      this.green.toString(16).padStart(2, '0') +
      this.blue.toString(16).padStart(2, '0');
  }

  /**
   * Converte o objeto atual em uma string no padrão css
   * @returns string
   */
  toString() {
    return `rgb(${this.red},${this.green}%,${this.blue}%)`
  }

}