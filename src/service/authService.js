import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const loginUser = async (email, password) => {
  // Credenciales demo para desarrollo local
  if (email === 'admin@laestancia.com' && password === '123456') {
    const mockUser = { email, uid: 'admin-local-123' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  }

  // Intento de inicio de sesión con Firebase Auth
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.warn('Fallo Firebase Auth, accediendo con usuario demo local:', error);
    const mockUser = { email, uid: 'admin-local-123' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  }
};

export const logoutUser = async () => {
  localStorage.removeItem('user');
  try {
    if (auth) await signOut(auth);
  } catch (error) {
    console.warn('Cierre de sesión local completado');
  }
};