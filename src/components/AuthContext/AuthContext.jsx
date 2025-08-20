import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);

        // Cargar favoritos y reservas del usuario
        const storedFavorites = localStorage.getItem(`favorites_${parsedUser.id}`);
        const storedReservations = localStorage.getItem(`reservations_${parsedUser.id}`);
        
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }

        if (storedReservations) {
          setReservations(JSON.parse(storedReservations));
        }
      } catch (e) {
        console.error("Error parsing stored user data:", e);
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));

    // Cargar favoritos y reservas al iniciar sesión
    const storedFavorites = localStorage.getItem(`favorites_${userData.id}`);
    const storedReservations = localStorage.getItem(`reservations_${userData.id}`);

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setFavorites([]);
    setReservations([]);
    localStorage.removeItem("user");
    // Mantener favoritos y reservas en localStorage para futuras sesiones
  };

  const addFavorite = (favorite) => {
    const updatedFavorites = [...favorites, favorite];
    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (favorite) => {
    const updatedFavorites = favorites.filter((fav) => fav !== favorite);
    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updatedFavorites));
  };

  const addReservation = (reservation) => {
    const updatedReservations = [...reservations, reservation];
    setReservations(updatedReservations);
    localStorage.setItem(`reservations_${user.id}`, JSON.stringify(updatedReservations));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        favorites,
        addFavorite,
        removeFavorite,
        reservations,
        addReservation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
