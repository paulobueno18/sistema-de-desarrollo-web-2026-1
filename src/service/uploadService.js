import { storage } from '../config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImage = async (file) => {
  if (!file) return null;
  
  try {
    const fileRef = ref(storage, `churrasqueria/productos/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error;
  }
};