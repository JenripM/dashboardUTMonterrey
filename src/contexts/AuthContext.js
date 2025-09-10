import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  deleteField
} from 'firebase/firestore';
import { dashboardAuth as auth, dashboardDb as db } from '../config/firebaseInstances';
import { decryptPassword, testEncryption } from '../services/userManagementService';

// Función para mostrar popup de nueva contraseña
const showNewPasswordDialog = (email, nombre, temporaryPassword) => {
  return new Promise((resolve, reject) => {
    // Crear modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 90%;
    `;
    
    modalContent.innerHTML = `
      <h2 style="margin-top: 0; color: #1f2937;">Configurar nueva contraseña</h2>
      <p style="color: #6b7280; margin-bottom: 1.5rem;">
        Hola <strong>${nombre}</strong>, es tu primer inicio de sesión. 
        Por favor, configura una nueva contraseña para tu cuenta.
      </p>
      
      <div style="margin-bottom: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">
          Nueva contraseña:
        </label>
        <input 
          type="password" 
          id="newPassword" 
          style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 1rem;"
          placeholder="Ingresa tu nueva contraseña"
          minlength="6"
          required
        />
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">
          Confirmar contraseña:
        </label>
        <input 
          type="password" 
          id="confirmPassword" 
          style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 1rem;"
          placeholder="Confirma tu nueva contraseña"
          minlength="6"
          required
        />
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button 
          id="cancelBtn" 
          style="padding: 0.75rem 1.5rem; border: 1px solid #d1d5db; background: white; border-radius: 4px; cursor: pointer;"
        >
          Cancelar
        </button>
        <button 
          id="confirmBtn" 
          style="padding: 0.75rem 1.5rem; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Configurar
        </button>
      </div>
      
      <div id="errorMsg" style="color: #ef4444; margin-top: 1rem; display: none;"></div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Focus en el primer input
    const newPasswordInput = modalContent.querySelector('#newPassword');
    newPasswordInput.focus();
    
    // Event listeners
    const confirmBtn = modalContent.querySelector('#confirmBtn');
    const cancelBtn = modalContent.querySelector('#cancelBtn');
    const errorMsg = modalContent.querySelector('#errorMsg');
    
    const handleConfirm = () => {
      console.log('🔘 Botón confirmar presionado');
      const newPassword = newPasswordInput.value;
      const confirmPassword = modalContent.querySelector('#confirmPassword').value;
      
      console.log('🔍 Validando contraseñas:', {
        newPassword: newPassword ? '***' : 'vacía',
        confirmPassword: confirmPassword ? '***' : 'vacía',
        match: newPassword === confirmPassword
      });
      
      if (!newPassword || !confirmPassword) {
        errorMsg.textContent = 'Por favor, completa ambos campos';
        errorMsg.style.display = 'block';
        return;
      }
      
      if (newPassword.length < 6) {
        errorMsg.textContent = 'La contraseña debe tener al menos 6 caracteres';
        errorMsg.style.display = 'block';
        return;
      }
      
      if (newPassword !== confirmPassword) {
        errorMsg.textContent = 'Las contraseñas no coinciden';
        errorMsg.style.display = 'block';
        return;
      }
      
      // Verificar que no sea la misma contraseña temporal
      console.log('🔍 Comparando contraseñas:', {
        newPassword: newPassword ? '***' : 'vacía',
        temporaryPassword: temporaryPassword ? '***' : 'vacía',
        areEqual: newPassword === temporaryPassword
      });
      
      if (newPassword === temporaryPassword) {
        console.log('❌ Usuario intentó usar la misma contraseña temporal');
        errorMsg.textContent = 'La nueva contraseña debe ser diferente a la contraseña temporal';
        errorMsg.style.display = 'block';
        return;
      }
      
      console.log('✅ Contraseñas válidas, cerrando popup...');
      document.body.removeChild(modal);
      resolve(newPassword);
    };
    
    const handleCancel = () => {
      console.log('❌ Usuario canceló la configuración');
      document.body.removeChild(modal);
      reject(new Error('Usuario canceló la configuración de contraseña'));
    };
    
    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
    
    // Enter key para confirmar
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleConfirm();
      }
    };
    
    newPasswordInput.addEventListener('keypress', handleKeyPress);
    modalContent.querySelector('#confirmPassword').addEventListener('keypress', handleKeyPress);
    
    // Click fuera del modal para cancelar (deshabilitado temporalmente)
    // modal.addEventListener('click', (e) => {
    //   if (e.target === modal) {
    //     handleCancel();
    //   }
    // });
  });
};

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // No más credenciales hardcodeadas - todo se maneja con Firebase

  async function signup(email, password) {
    try {
      // Crear usuario en Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      try {
        // Guardar datos adicionales en Firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          role: 'admin', // Por defecto para el primer usuario
          status: 'active',
          passwordLastChanged: serverTimestamp(), // Fecha del último cambio de contraseña
          passwordHistory: {
            lastChanged: serverTimestamp(),
            timesChanged: 0
          }
        });
        return userCredential;
      } catch (firestoreError) {
        // Si falla la creación en Firestore, eliminamos el usuario de Authentication
        await user.delete();
        console.error('Error al crear documento en Firestore:', firestoreError);
        throw new Error('Error al crear el perfil de usuario. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error en signup:', error);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Este correo electrónico ya está registrado.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('El correo electrónico no es válido.');
      } else {
        throw new Error('Error al crear la cuenta. Por favor, intenta nuevamente.');
      }
    }
  }

  async function login(email, password) {
    try {
      // Intentar login normal primero
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.log('🔍 Error en login:', {
        code: error.code,
        message: error.message,
        email: email
      });
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        // Si no existe en Auth o credenciales inválidas, verificar si existe en Firestore
        console.log('🔍 Usuario no existe en Auth, verificando en Firestore...');
        try {
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('email', '==', email));
          const snapshot = await getDocs(q);
          
          if (!snapshot.empty) {
            // Usuario existe en Firestore pero no en Auth
            const userData = snapshot.docs[0].data();
            console.log('🔍 Usuario encontrado en Firestore:', {
              email: userData.email,
              hasTemporaryPassword: !!userData.temporaryPassword,
              needsAuthSetup: userData.needsAuthSetup
            });
            
            // Verificar que el usuario aún necesita configuración inicial
            if (!userData.needsAuthSetup && !userData.temporaryPassword) {
              throw new Error('Esta cuenta ya ha sido configurada. Usa tu contraseña personal.');
            }
            
            // Verificar que la contraseña temporal coincida
            const decryptedPassword = decryptPassword(userData.temporaryPassword);
            console.log('🔍 Verificando contraseña temporal:', {
              provided: password,
              decrypted: decryptedPassword,
              hasTemporaryPassword: !!userData.temporaryPassword,
              match: decryptedPassword === password
            });
            
            if (decryptedPassword !== password) {
              console.log('❌ Contraseña no coincide');
              throw new Error('La contraseña es incorrecta.');
            }
            
            console.log('✅ Contraseña temporal correcta, mostrando popup...');
            
            // Es el primer login - mostrar popup para nueva contraseña
            try {
              const newPassword = await showNewPasswordDialog(email, userData.nombre, decryptedPassword);
              console.log('✅ Usuario configuró nueva contraseña');
              
              // Crear en Auth con la nueva contraseña
              console.log('🔐 Creando usuario en Firebase Auth...');
              const newUserCredential = await createUserWithEmailAndPassword(auth, email, newPassword);
              console.log('✅ Usuario creado en Auth:', newUserCredential.user.uid);
            
            // Actualizar el documento en Firestore con el UID real
            console.log('📝 Actualizando documento en Firestore...');
            
            // Crear objeto de actualización sin temporaryPassword
            const { temporaryPassword, ...userDataWithoutTempPassword } = userData;
            
            await setDoc(doc(db, 'users', newUserCredential.user.uid), {
              ...userDataWithoutTempPassword,
              uid: newUserCredential.user.uid,
              lastLogin: serverTimestamp(),
              needsAuthSetup: false
              // temporaryPassword ya no está incluido, por lo que se elimina automáticamente
            }, { merge: true });
            console.log('✅ Documento actualizado en Firestore - temporaryPassword eliminado');
            
            // Verificar que el temporaryPassword se eliminó correctamente
            const updatedDoc = await getDoc(doc(db, 'users', newUserCredential.user.uid));
            const updatedData = updatedDoc.data();
            console.log('🔍 Verificación post-actualización:', {
              hasTemporaryPassword: !!updatedData.temporaryPassword,
              needsAuthSetup: updatedData.needsAuthSetup,
              uid: updatedData.uid
            });
            
              // Eliminar el documento viejo si tiene ID diferente
              if (snapshot.docs[0].id !== newUserCredential.user.uid) {
                console.log('🗑️ Eliminando documento viejo...');
                await deleteDoc(doc(db, 'users', snapshot.docs[0].id));
                console.log('✅ Documento viejo eliminado');
              }
              
              console.log('🎉 Login exitoso - usuario completamente configurado');
              return newUserCredential;
            } catch (passwordError) {
              console.log('❌ Error en configuración de contraseña:', passwordError);
              if (passwordError.message.includes('canceló')) {
                throw new Error('Configuración de contraseña cancelada');
              }
              throw passwordError;
            }
          } else {
            throw new Error('No existe una cuenta con este correo electrónico.');
          }
        } catch (firestoreError) {
          console.error('❌ Error verificando usuario en Firestore:', firestoreError);
          throw new Error('No existe una cuenta con este correo electrónico.');
        }
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('La contraseña es incorrecta.');
      } else {
        throw new Error('Error al iniciar sesión.');
      }
    }
  }

  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function logout() {
    return signOut(auth);
  }

  async function fetchUserData(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserData(userData);
      } else {
        // Crear usuario admin simple - solo datos básicos
        const userData = {
          email: currentUser?.email || '',
          role: 'admin',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        };
        
        await setDoc(doc(db, 'users', uid), userData);
        setUserData(userData);
      }
    } catch (error) {
      console.error('Error:', error);
      setUserData({
        email: currentUser?.email || '',
        role: 'admin'
      });
    }
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔄 Estado de autenticación cambió:', user ? 'Usuario logueado' : 'Usuario no logueado');
      setCurrentUser(user);
      if (user) {
        console.log('👤 Usuario autenticado:', user.uid, user.email);
        await fetchUserData(user.uid);
      } else {
        console.log('🚪 Usuario no autenticado, limpiando datos');
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 