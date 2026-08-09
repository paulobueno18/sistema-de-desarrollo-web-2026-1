import { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { loginUser, logoutUser } from '../service/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    try {
      if (auth) {
        unsubscribe = onAuthStateChanged(
          auth,
          (currentUser) => {
            setUser(currentUser);
            setLoading(false);
          },
          (error) => {
            console.warn('Error en Firebase Auth:', error);
            setLoading(false);
          }
        );
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.warn('Firebase no configurado aún:', error);
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const login = (email, password) => loginUser(email, password);
  const logout = () => logoutUser();

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading ? children : (
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
          <p className="text-amber-900 font-bold animate-pulse">Cargando La Estancia...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};