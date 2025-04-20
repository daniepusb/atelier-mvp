import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { UserRole } from "../../types/UserRole";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("trabajador");
  const brandId = "M1";

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        brandId,
        email,
        role,
      });

      alert("Usuario registrado correctamente");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Hubo un error.");
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Registro</h2>
      <input
        className="border p-2 w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        className="border p-2 w-full"
        value={role}
        onChange={(e) => setRole(e.target.value as UserRole)}
      >
        <option value="trabajador">Trabajador</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded">
        Registrar
      </button>
    </div>
  );
};
