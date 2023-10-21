export function useColor(hex: string): string[] {

  const [r, g, b] = hexToRgb(hex);

  console.log(hex, { r, g, b })

  // Converte o hexadecimal para números



  // Calcula a diferença entre o valor atual e o máximo

  const rDif = Math.floor(255 - r);
  const gDif = Math.floor(255 - g);
  const bDif = Math.floor(255 - b);
  console.log({ rDif, gDif, bDif });

  // Cria um array de cores mais claras

  const coresMaisClaras: string[] = [];
  for (let i = 1; i <= 5; i++) {
    coresMaisClaras.push(
      `#${Math.floor(r + (i * rDif / 5)).toString(16).padStart(2, "0")
      }${Math.floor(g + (i * gDif / 5)).toString(16).padStart(2, "0")
      }${Math.floor(b + (i * bDif / 5)).toString(16).padStart(2, "0")
      }`
    );
  }

  // Cria um array de cores mais escuras

  const coresMaisEscuras: string[] = [];
  for (let i = 1; i <= 5; i++) {
    coresMaisEscuras.push(
      `#${Math.floor(r - (i * rDif / 5)).toString(16).padStart(2, "0")
      }${Math.floor(g - (i * gDif / 5)).toString(16).padStart(2, "0")
      }${Math.floor(b - (i * bDif / 5)).toString(16).padStart(2, "0")
      }`
    );
  }

  // Retorna a concatenação dos dois arrays

  return coresMaisClaras.concat(coresMaisEscuras);
}

function hexToRgb(hex: string): [number, number, number] {
  const hexWithoutHash = hex.substr(1);
  const r = parseInt(hexWithoutHash.substr(0, 2), 16);
  const g = parseInt(hexWithoutHash.substr(2, 2), 16);
  const b = parseInt(hexWithoutHash.substr(4, 2), 16);

  return [r, g, b];
}


