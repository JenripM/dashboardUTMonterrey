// Script para limpiar y consolidar usuarios duplicados
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { dashboardDb as db } from '../config/firebaseInstances';

export const cleanupDuplicateUsers = async () => {
  try {
    console.log('🧹 Iniciando limpieza de usuarios duplicados...');
    
    // Obtener todos los usuarios
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    const users = [];
    snapshot.forEach(doc => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`📊 Total de usuarios encontrados: ${users.length}`);
    
    // Agrupar por email
    const usersByEmail = {};
    users.forEach(user => {
      if (user.email) {
        if (!usersByEmail[user.email]) {
          usersByEmail[user.email] = [];
        }
        usersByEmail[user.email].push(user);
      }
    });
    
    // Encontrar duplicados
    const duplicates = Object.entries(usersByEmail).filter(([email, userList]) => userList.length > 1);
    
    console.log(`🔍 Emails con duplicados: ${duplicates.length}`);
    
    for (const [email, userList] of duplicates) {
      console.log(`\n📧 Email: ${email}`);
      console.log(`👥 Usuarios duplicados: ${userList.length}`);
      
      // Mostrar información de cada duplicado
      userList.forEach((user, index) => {
        console.log(`  ${index + 1}. ID: ${user.id}`);
        console.log(`     Status: ${user.status}`);
        console.log(`     Role: ${user.role}`);
        console.log(`     IsRoot: ${user.isRoot}`);
        console.log(`     CreatedAt: ${user.createdAt?.toDate?.() || user.createdAt}`);
      });
      
      // Mantener el más reciente o el que tenga isRoot: true
      const keepUser = userList.find(user => user.isRoot) || 
                      userList.sort((a, b) => {
                        const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
                        const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
                        return dateB - dateA;
                      })[0];
      
      console.log(`✅ Manteniendo usuario: ${keepUser.id}`);
      
      // Eliminar los demás
      const toDelete = userList.filter(user => user.id !== keepUser.id);
      for (const userToDelete of toDelete) {
        console.log(`🗑️ Eliminando duplicado: ${userToDelete.id}`);
        await deleteDoc(doc(db, 'users', userToDelete.id));
      }
    }
    
    console.log('\n✅ Limpieza completada');
    return { success: true, duplicatesFound: duplicates.length };
    
  } catch (error) {
    console.error('❌ Error en limpieza:', error);
    throw error;
  }
};

// Función para mostrar todos los usuarios
export const showAllUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    const users = [];
    snapshot.forEach(doc => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log('👥 Todos los usuarios en Firestore:');
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Status: ${user.status}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   IsRoot: ${user.isRoot}`);
      console.log(`   CreatedAt: ${user.createdAt?.toDate?.() || user.createdAt}`);
    });
    
    return users;
  } catch (error) {
    console.error('❌ Error mostrando usuarios:', error);
    throw error;
  }
};
