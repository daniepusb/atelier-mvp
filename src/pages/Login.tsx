import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { AppUser } from "../types/UserRole";

export const LoginForm = ({ onLogin }: { onLogin: (user: AppUser) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const docRef = doc(db, "users", uid);
      const userSnap = await getDoc(docRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as AppUser;
        const fullUser = { ...data, uid };
        onLogin(fullUser);
        alert("Login exitoso ✅");
      } else {
        alert("No se encontró información del usuario.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales incorrectas.");
    }
  };

  return (
    <div className="space-y-4 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center">Iniciar sesión</h2>
      <input
        className="border p-2 w-full rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full rounded"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-green-600 text-white px-4 py-2 w-full rounded"
      >
        Ingresar
      </button>
    </div>
  );
};