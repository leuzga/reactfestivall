
// user.js
export const getUsers = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = users.some(user => user.email === userData.email);
    if (emailExists) {
      return { success: false, message: 'El correo electrónico ya está en uso' };
    }

    const newUser = { ...userData, id: (users.length + 1).toString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return { success: false, message: 'Error al crear usuario' };
  }
};





export const updateUser = async (userId, userData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }
    users[index] = { ...users[index], ...userData };
    localStorage.setItem('users', JSON.stringify(users));
    return users[index];
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.id === id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    throw error;
  }
};

export const getUserIdByEmail = async (email) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user.id;
  } catch (error) {
    console.error('Error al obtener el ID del usuario por email:', error);
    throw error;
  }
};

export const validateUser = async (email, password) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.contraseña === password);
    if (user) {
      // Guardar el tipo de cuenta en el localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'Credenciales incorrectas' };
  } catch (error) {
    console.error('Error al validar usuario:', error);
    return { success: false, message: 'Error al validar usuario' };
  }
};


