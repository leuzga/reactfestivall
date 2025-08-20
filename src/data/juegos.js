
/* export const obtenerProductos = async () => {
  try {
    // Simular un retraso para imitar una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Obtener juegos desde localStorage
    const juegos = JSON.parse(localStorage.getItem('juegos')) || [];
    return juegos;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

export const agregarProducto = async (juegoData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const juegos = JSON.parse(localStorage.getItem('juegos')) || [];

    const nombreExists = juegos.some(juego => juego.nombre === juegoData.nombre);
    if (nombreExists) {
      return { success: false, message: 'El nombre del juego ya está en uso' };
    }

    const newJuego = { ...juegoData, id: (juegos.length + 1).toString() };
    juegos.push(newJuego);
    localStorage.setItem('juegos', JSON.stringify(juegos));
    return { success: true, juego: newJuego };
  } catch (error) {
    console.error('Error al crear juego:', error);
    return { success: false, message: 'Error al crear juego' };
  }
};

export const actualizarProducto = async (juegoId, juegoData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const juegos = JSON.parse(localStorage.getItem('juegos')) || [];
    const index = juegos.findIndex(juego => juego.id === juegoId);
    if (index === -1) {
      throw new Error('Juego no encontrado');
    }
    juegos[index] = { ...juegos[index], ...juegoData };
    localStorage.setItem('juegos', JSON.stringify(juegos));
    return juegos[index];
  } catch (error) {
    console.error('Error al actualizar juego:', error);
    throw error;
  }
};

export const eliminarProducto = async (juegoId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const juegos = JSON.parse(localStorage.getItem('juegos')) || [];
    const index = juegos.findIndex(juego => juego.id === juegoId);
    if (index === -1) {
      throw new Error('Juego no encontrado');
    }
    juegos.splice(index, 1);
    localStorage.setItem('juegos', JSON.stringify(juegos));
  } catch (error) {
    console.error('Error al eliminar juego:', error);
    throw error;
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const juegos = JSON.parse(localStorage.getItem('juegos')) || [];
    const juego = juegos.find(juego => juego.id === id);
    if (!juego) {
      throw new Error('Juego no encontrado');
    }
    return juego;
  } catch (error) {
    console.error('Error al obtener juego por ID:', error);
    throw error;
  }
};

export const verificarDisponibilidad = async (datosReserva) => {
  console.log('Datos de reserva recibidos:', datosReserva);

  try {
    // Simula un retraso para el proceso
    await new Promise(resolve => setTimeout(resolve, 500));

    // Obtiene los juegos desde localStorage
    const juegos = JSON.parse(localStorage.getItem('juegos')) || [];

    // Busca el juego por ID
    const juego = juegos.find(j => j.id === datosReserva.juegoId);

    // Si el juego existe y tiene suficiente stock disponible
    if (juego && juego.cantidad > 0) {
      return new Promise(resolve => {
        setTimeout(() => resolve({ disponible: true, cantidadDisponible: juego.cantidad }), 1000); // Simula un retraso de 1 segundo
      });
    } else {
      return new Promise(resolve => {
        setTimeout(() => resolve({ disponible: false, cantidadDisponible: juego ? juego.cantidad : 0 }), 1000); // Simula un retraso de 1 segundo
      });
    }
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    throw error;
  }
};

export const fetchSuggestions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([]), 1000); // Simula un retraso de 1 segundo
  });
}; */




//SERVICIO  SIN EL LOCAL STORAGE 

import juegosData from './juegos.json';

// Obtener todos los juegos
const obtenerProductos = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(juegosData), 1000); // Simula un retraso de 1 segundo
  });
};

// Agregar un nuevo juego
const agregarProducto = async (nuevoProducto) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      nuevoProducto.id = juegosData.length + 1; // Simula un ID autogenerado
      juegosData.push(nuevoProducto);
      resolve(nuevoProducto);
    }, 1000); // Simula un retraso de 1 segundo
  });
};

// Actualizar un juego
const actualizarProducto = async (actualizadoProducto) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = juegosData.findIndex(p => p.id === actualizadoProducto.id);
      if (index !== -1) {
        juegosData[index] = actualizadoProducto;
        resolve(actualizadoProducto);
      } else {
        throw new Error('Producto no encontrado');
      }
    }, 1000); // Simula un retraso de 1 segundo
  });
};

// Obtener un juego por ID
const obtenerProductoPorId = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const producto = juegosData.find(p => p.id === id);
      resolve(producto);
    }, 1000); // Simula un retraso de 1 segundo
  });
};

// Eliminar un juego
const eliminarProducto = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = juegosData.findIndex(p => p.id === id);
      if (index !== -1) {
        juegosData.splice(index, 1);
        resolve(id);
      } else {
        throw new Error('Producto no encontrado');
      }
    }, 1000); // Simula un retraso de 1 segundo
  });
};

// Función simulada para obtener sugerencias
const fetchSuggestions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([]), 1000); // Simula un retraso de 1 segundo
  });
};



// Función simulada para enviar valoraciones
const enviarValoracion = async (juegoId, valoracionData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(valoracionData), 1000); // Simula un retraso de 1 segundo
  });
};

// Verificar disponibilidad de reserva
const verificarDisponibilidad = async (datosReserva) => {
  console.log('Datos de reserva recibidos:', datosReserva);
  // Simula la verificación de disponibilidad
  const juego = juegosData.find(j => j.id === datosReserva.juegoId);
  if (juego && juego.cantidad > 0) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ disponible: true }), 1000); // Simula un retraso de 1 segundo
    });
  } else {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ disponible: false }), 1000); // Simula un retraso de 1 segundo
    });
  }
};

// Hacer una reserva
const postReservation = async (reservationData) => {
  console.log('Datos de reserva enviados al servidor:', reservationData);
  return new Promise((resolve) => {
    setTimeout(() => resolve(reservationData), 1000); // Simula un retraso de 1 segundo
  });
};


export {
  obtenerProductos,
  agregarProducto,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
  fetchSuggestions,
  
  enviarValoracion,
  verificarDisponibilidad,
  postReservation
};