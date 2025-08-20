export const getObjetWorlds = (cadena) => {
  if (!cadena) {
    return {};
  }

  const palabras = cadena.trim().split(/\s+/);

  if (palabras.length === 1) {
    return { 1: palabras[0] };
  }
  const resultado = {};
  palabras.forEach((palabra, indice) => {
    resultado[indice + 1] = palabra;
  });

  return resultado;
};

