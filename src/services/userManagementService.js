// Servicio para gestión de usuarios
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  setDoc,
  query, 
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  updatePassword, 
  deleteUser as deleteAuthUser,
  getAuth
} from 'firebase/auth';
import { dashboardDb as db, dashboardAuth as auth } from '../config/firebaseInstances';

// Función simple para encriptar contraseña temporal
const encryptPassword = (password) => {
  // Encriptación simple usando btoa (base64) - solo para contraseñas temporales
  return btoa(password + 'temp_salt_2024');
};

// Función para desencriptar contraseña temporal
export const decryptPassword = (encryptedPassword) => {
  try {
    const decoded = atob(encryptedPassword);
    return decoded.replace('temp_salt_2024', '');
  } catch (error) {
    return null;
  }
};

// Función de prueba para verificar encriptación
export const testEncryption = () => {
  const testPassword = 'test123';
  const encrypted = encryptPassword(testPassword);
  const decrypted = decryptPassword(encrypted);
  
  console.log('🧪 Prueba de encriptación:');
  console.log('Original:', testPassword);
  console.log('Encriptado:', encrypted);
  console.log('Desencriptado:', decrypted);
  console.log('¿Coinciden?', testPassword === decrypted);
  
  return testPassword === decrypted;
};

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const users = [];
    snapshot.forEach(doc => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return users;
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    throw error;
  }
};

// Crear nuevo usuario (solo en Firestore por ahora)
export const createUser = async (userData, currentUser, userDataFromContext) => {
  try {
    // Verificar que el usuario actual sea admin o root
    const userRole = userDataFromContext?.role || currentUser?.role;
    const isRoot = userDataFromContext?.isRoot || false;
    if (userRole !== 'admin' && !isRoot) {
      throw new Error('No tienes permisos para crear usuarios');
    }

    // Verificar si el email ya existe en Firestore
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', userData.email));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      throw new Error('Ya existe un usuario con este correo electrónico');
    }

    // Crear documento en Firestore
    const userDoc = {
      email: userData.email,
      nombre: userData.nombre,
      empresa: userData.empresa || '—',
      role: userData.role || 'user',
      temporaryPassword: encryptPassword(userData.password), // Contraseña temporal encriptada
      createdAt: serverTimestamp(),
      lastLogin: null,
      createdBy: currentUser.uid,
      needsAuthSetup: true // Marcar que necesita configuración en Auth
    };

    // Crear documento en Firestore
    const docRef = await addDoc(collection(db, 'users'), userDoc);
    const userId = docRef.id;

    return { success: true, userId: userId };
  } catch (error) {
    console.error('Error creando usuario:', error);
    throw error;
  }
};

// Actualizar usuario
export const updateUser = async (userId, userData, currentUser, userDataFromContext) => {
  try {
    // Verificar permisos
    const userRole = userDataFromContext?.role || currentUser?.role;
    const isRoot = userDataFromContext?.isRoot || false;
    const isEditingSelf = userId === currentUser?.uid;
    
    // Permitir edición si es admin, root, o si está editando su propia información
    if (userRole !== 'admin' && !isRoot && !isEditingSelf) {
      throw new Error('No tienes permisos para editar usuarios');
    }

    // Verificar si el usuario a editar es root
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists() && userDoc.data().isRoot) {
      throw new Error('No se puede editar un usuario root');
    }

    // Preparar datos de actualización
    const updateData = {
      updatedAt: serverTimestamp(),
      updatedBy: currentUser.uid
    };

    // Si está editando a otro usuario (admin/root), permitir todos los campos
    if (!isEditingSelf) {
      updateData.nombre = userData.nombre;
      updateData.empresa = userData.empresa;
      updateData.role = userData.role;
    } else {
      // Si está editándose a sí mismo, solo permitir ciertos campos
      if (userData.nombre) updateData.nombre = userData.nombre;
      if (userData.empresa) updateData.empresa = userData.empresa;
      // No permitir cambiar el rol cuando se edita a sí mismo
    }

    await updateDoc(userRef, updateData);
    return { success: true };
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    throw error;
  }
};

// Eliminar usuario
export const deleteUser = async (userId, currentUser, userDataFromContext) => {
  try {
    // Verificar permisos
    const userRole = userDataFromContext?.role || currentUser?.role;
    const isRoot = userDataFromContext?.isRoot || false;
    if (userRole !== 'admin' && !isRoot) {
      throw new Error('No tienes permisos para eliminar usuarios');
    }

    // No permitir eliminar usuarios root
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists() && userDoc.data().isRoot) {
      throw new Error('No se puede eliminar un usuario root');
    }

    // Obtener el email del usuario antes de eliminarlo
    const userEmail = userDoc.exists() ? userDoc.data().email : null;

    // Eliminar de Firestore
    await deleteDoc(userRef);
    
    // Nota: No podemos eliminar de Authentication desde el cliente
    // porque requiere autenticación del usuario a eliminar
    // Esto es una limitación de seguridad de Firebase
    console.warn(`Usuario eliminado de Firestore. Para eliminar completamente de Authentication, 
                  el usuario ${userEmail} debe hacer login y eliminar su cuenta manualmente.`);
    
    return { success: true };
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    throw error;
  }
};

// Cambiar contraseña de usuario
export const changeUserPassword = async (userId, newPassword, currentUser) => {
  try {
    // Verificar permisos
    if (currentUser.role !== 'admin') {
      throw new Error('No tienes permisos para cambiar contraseñas');
    }

    // Esta función requeriría implementación adicional
    // ya que necesitarías autenticarte como el usuario para cambiar su contraseña
    throw new Error('Función no implementada - requiere autenticación del usuario');
  } catch (error) {
    console.error('Error cambiando contraseña:', error);
    throw error;
  }
};

// Función para cambiar el estado de root de un usuario
export const toggleUserRootStatus = async (userId, currentUser, userDataFromContext) => {
  try {
    // Verificar permisos
    const userRole = userDataFromContext?.role || currentUser?.role;
    if (userRole !== 'admin') {
      throw new Error('No tienes permisos para modificar usuarios');
    }

    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('Usuario no encontrado');
    }

    const currentData = userDoc.data();
    const newIsRoot = !currentData.isRoot;

    await updateDoc(userRef, {
      isRoot: newIsRoot,
      updatedAt: serverTimestamp(),
      updatedBy: currentUser.uid
    });

    return { success: true, isRoot: newIsRoot };
  } catch (error) {
    console.error('Error cambiando estado root:', error);
    throw error;
  }
};

// Función para limpiar usuarios huérfanos (solo para desarrollo)
export const cleanupOrphanedUsers = async () => {
  try {
    console.log('🧹 Limpiando usuarios huérfanos...');
    
    // Obtener todos los usuarios de Firestore
    const users = await getUsers();
    console.log(`📊 Encontrados ${users.length} usuarios en Firestore`);
    
    // Mostrar usuarios que necesitan reset de auth
    const orphanedUsers = users.filter(user => user.needsAuthReset);
    if (orphanedUsers.length > 0) {
      console.log('⚠️ Usuarios que necesitan reset de autenticación:', orphanedUsers.map(u => u.email));
    }
    
    return { success: true, orphanedCount: orphanedUsers.length };
  } catch (error) {
    console.error('Error limpiando usuarios huérfanos:', error);
    throw error;
  }
};
