import caracteristicasData from './caracteristicas.json';

// Obtener todas las características
export const obtenerCaracteristicas = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(caracteristicasData), 1000); // Simula un retraso de 1 segundo
  });
};

// Agregar una nueva característica
export const crearCaracteristica = async (nuevaCaracteristica) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      nuevaCaracteristica.id = caracteristicasData.length + 1; // Simula un ID autogenerado
      caracteristicasData.push(nuevaCaracteristica);
      resolve(nuevaCaracteristica);
    }, 1000); // Simula un retraso de 1 segundo
  });
};

// Actualizar una característica existente
export const actualizarCaracteristica = async (caracteristicaActualizada) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = caracteristicasData.findIndex(c => c.id === caracteristicaActualizada.id);
      if (index !== -1) {
        caracteristicasData[index] = caracteristicaActualizada;
        resolve(caracteristicaActualizada);
      } else {
        reject(new Error('Característica no encontrada'));
      }
    }, 1000);
  });
};

// Obtener una característica por ID
export const obtenerCaracteristicaPorId = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const caracteristica = caracteristicasData.find(c => c.id === id);
      resolve(caracteristica);
    }, 1000); // Simula un retraso de 1 segundo
  });
};

// Eliminar una característica
export const eliminarCaracteristica = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = caracteristicasData.findIndex(c => c.id === id);
      if (index !== -1) {
        caracteristicasData.splice(index, 1);
        resolve(id);
      } else {
        reject(new Error('Característica no encontrada'));
      }
    }, 1000); // Simula un retraso de 1 segundo
  });
};
