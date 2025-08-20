// dataService.js
import categoriasData from './categorias.json';

// Obtener todas las categorías
export const LeerCategorias = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(categoriasData), 1000); // Simula un retraso de 1 segundo
  });
};

// Agregar una nueva categoría
export const agregarCategoria = async (nuevaCategoria) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      nuevaCategoria.id = categoriasData.length + 1; // Simula un ID autogenerado
      categoriasData.push(nuevaCategoria);
      resolve(nuevaCategoria);
    }, 1000); // Simula un retraso de 1 segundo
  });
};

export const actualizarCategoria = async (categoriaActualizada) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = categoriasData.findIndex(c => c.id === categoriaActualizada.id);
      if (index !== -1) {
        categoriasData[index] = categoriaActualizada;
        resolve(categoriaActualizada);
      } else {
        reject(new Error('Categoría no encontrada'));
      }
    }, 1000);
  });
};



// Obtener una categoría por ID
export const obtenerCategoriaPorId = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categoria = categoriasData.find(c => c.id === id);
      resolve(categoria);
    }, 1000); // Simula un retraso de 1 segundo
  });
};

// Eliminar una categoría
export const eliminarCategoriaPorNombre = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = categoriasData.findIndex(c => c.id === id);
      if (index !== -1) {
        categoriasData.splice(index, 1);
        resolve(id);
      } else {
        throw new Error('Categoría no encontrada');
      }
    }, 1000); // Simula un retraso de 1 segundo
  });
};






