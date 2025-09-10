// Script para crear el usuario administrador inicial
// Este script debe ejecutarse una sola vez para crear el usuario root

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { dashboardAuth as auth, dashboardDb as db } from '../config/firebaseInstances';

export const createAdminUser = async () => {
  try {
    const email = 'admin@myworkin.com';
    const password = 'admin123';

    console.log('🔐 Creando usuario administrador...');

    // Crear usuario en Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('✅ Usuario creado en Authentication:', user.uid);

    // Crear documento en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: email,
      role: 'admin',
      status: 'active',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      isRoot: true, // Marcar como usuario root
      permissions: {
        canCreateUsers: true,
        canDeleteUsers: true,
        canManageSettings: true,
        canViewAllData: true
      }
    });

    console.log('✅ Usuario administrador creado exitosamente');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer login');

    return userCredential;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️  El usuario administrador ya existe');
      return null;
    } else {
      console.error('❌ Error creando usuario administrador:', error);
      throw error;
    }
  }
};

// Función para verificar si el usuario administrador existe
export const checkAdminUserExists = async () => {
  try {
    const { collection, query, where, getDocs } = await import('firebase/firestore');
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('isRoot', '==', true));
    const snapshot = await getDocs(q);
    
    return !snapshot.empty;
  } catch (error) {
    console.error('❌ Error verificando usuario administrador:', error);
    return false;
  }
};
