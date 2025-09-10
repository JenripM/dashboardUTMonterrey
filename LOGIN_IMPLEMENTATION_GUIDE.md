# 🔐 Guía para Implementar Login Real con Firebase

Este documento explica cómo quitar las credenciales hardcodeadas y conectar el dashboard a Firebase Firestore correctamente.

## 📋 Estado Actual

Actualmente el proyecto tiene credenciales hardcodeadas (`admin@myworkin.com` / `admin123`) que permiten acceder sin Firestore. Esto es útil para desarrollo, pero para producción necesitas conectar a una base de datos real.

## 🚀 Pasos para Implementar Login Real

### 1. **Configurar Firebase Project**

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o usa uno existente
3. Habilita **Authentication** y **Firestore Database**
4. En Authentication > Sign-in method, habilita "Email/Password"

### 2. **Actualizar Credenciales de Firebase**

Reemplaza las credenciales en `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT.firebasestorage.app",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};
```

### 3. **Crear la Colección 'users' en Firestore**

En Firestore Console, crea una colección llamada `users` con la siguiente estructura:

```javascript
// Documento ejemplo: users/{userId}
{
  email: "usuario@ejemplo.com",
  createdAt: timestamp,
  lastLogin: timestamp,
  role: "admin" | "user",
  status: "active" | "inactive",
  passwordLastChanged: timestamp,
  passwordHistory: {
    lastChanged: timestamp,
    timesChanged: number
  }
}
```

### 4. **Configurar Reglas de Firestore**

El archivo `firestore.rules` ya está configurado correctamente, pero asegúrate de deployarlo:

```bash
firebase deploy --only firestore:rules
```

### 5. **Modificar AuthContext.js**

#### **Opción A: Quitar Completamente las Credenciales Hardcodeadas**

Elimina estas secciones del `src/contexts/AuthContext.js`:

1. **Quitar las credenciales hardcodeadas (líneas 28-39):**
```javascript
// ELIMINAR ESTE BLOQUE
const HARDCODED_CREDENTIALS = {
  email: 'admin@myworkin.com',
  password: 'admin123',
  userData: { ... }
};
```

2. **Simplificar la función login (líneas 82-118):**
```javascript
// REEMPLAZAR CON:
async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Actualizar último login en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      lastLogin: serverTimestamp()
    }, { merge: true });

    return userCredential;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
}
```

3. **Simplificar la función logout (líneas 124-134):**
```javascript
// REEMPLAZAR CON:
function logout() {
  return signOut(auth);
}
```

4. **Simplificar el useEffect (líneas 165-183):**
```javascript
// REEMPLAZAR CON:
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    setCurrentUser(user);
    if (user) {
      await fetchUserData(user.uid);
    } else {
      setUserData(null);
    }
    setLoading(false);
  });

  return unsubscribe;
}, []);
```

#### **Opción B: Mantener Credenciales Hardcodeadas Solo para Desarrollo**

Si quieres mantener la funcionalidad de desarrollo, agrega una variable de entorno:

1. **Crear archivo `.env` en la raíz del proyecto:**
```env
REACT_APP_ENABLE_HARDCODED_LOGIN=true
```

2. **Modificar el AuthContext para usar la variable:**
```javascript
// En el login, cambiar:
if (email === HARDCODED_CREDENTIALS.email && password === HARDCODED_CREDENTIALS.password) {
// POR:
if (process.env.REACT_APP_ENABLE_HARDCODED_LOGIN === 'true' && 
    email === HARDCODED_CREDENTIALS.email && 
    password === HARDCODED_CREDENTIALS.password) {
```

3. **Para producción, configurar `.env.production`:**
```env
REACT_APP_ENABLE_HARDCODED_LOGIN=false
```

### 6. **Crear Usuario Administrador**

Una vez configurado, necesitas crear el primer usuario:

1. **Opción A - Desde el código (registro):**
   - Ve a la página de registro (si existe)
   - Crea una cuenta con rol "admin"

2. **Opción B - Desde Firebase Console:**
   - Ve a Authentication > Users
   - Agrega un usuario manualmente
   - Luego crea el documento correspondiente en Firestore/users

3. **Opción C - Script de inicialización:**
```javascript
// scripts/createAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function createAdmin() {
  const userRecord = await admin.auth().createUser({
    email: 'admin@tuempresa.com',
    password: 'tu_password_seguro',
    emailVerified: true
  });

  await db.collection('users').doc(userRecord.uid).set({
    email: 'admin@tuempresa.com',
    role: 'admin',
    status: 'active',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    passwordLastChanged: admin.firestore.FieldValue.serverTimestamp(),
    passwordHistory: {
      lastChanged: admin.firestore.FieldValue.serverTimestamp(),
      timesChanged: 0
    }
  });

  console.log('Usuario admin creado:', userRecord.uid);
}

createAdmin().catch(console.error);
```

### 7. **Variables de Entorno para Seguridad**

Mueve las credenciales de Firebase a variables de entorno:

**.env:**
```env
REACT_APP_FIREBASE_API_KEY=tu_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=tu_proyecto
REACT_APP_FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

**firebase.js:**
```javascript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
```

### 8. **Implementar Otras Colecciones (Opcional)**

Para hacer el dashboard completamente funcional, considera implementar:

```javascript
// Colecciones sugeridas:
- universities (universidades)
- students (estudiantes)  
- chats (conversaciones del bot)
- interviews (entrevistas simuladas)
- cvs (currículums analizados)
- performance_metrics (métricas de rendimiento)
```

## ✅ Checklist de Implementación

- [ ] Configurar proyecto en Firebase Console
- [ ] Habilitar Authentication y Firestore
- [ ] Actualizar credenciales en firebase.js
- [ ] Crear colección 'users' en Firestore
- [ ] Deployar reglas de Firestore
- [ ] Modificar AuthContext.js (quitar hardcoded)
- [ ] Crear usuario administrador
- [ ] Configurar variables de entorno
- [ ] Probar login/logout completo
- [ ] Implementar colecciones adicionales (opcional)

## 🚨 Notas Importantes

1. **Nunca subas credenciales a Git:** Usa `.env` y agrégalo a `.gitignore`
2. **Backups:** Configura backups automáticos en Firestore
3. **Seguridad:** Revisa y ajusta las reglas de Firestore según tus necesidades
4. **Testing:** Prueba thoroughly antes de desplegar a producción

## 🆘 Troubleshooting

**Error: "auth/user-not-found"**
- El usuario no existe en Authentication
- Crea el usuario o verifica el email

**Error: "permission-denied"**
- Revisa las reglas de Firestore
- Verifica que el documento del usuario exista

**Error: "auth/wrong-password"**
- Password incorrecto
- Usa la función de reset password

---

Una vez implementado correctamente, el dashboard tendrá un sistema de autenticación robusto y escalable con Firebase.
