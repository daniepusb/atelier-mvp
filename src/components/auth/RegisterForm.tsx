import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

interface Props {
  brandId: string;
}

export const RegisterForm  = ({brandId}: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "trabajador";

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        brandId,
        email,
        role,
        name
      });
      setName("");
      setEmail("");
      setPassword("");
      
      alert("Usuario registrado correctamente");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Hubo un error.");
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Registrar nuevo STAFF</h2>
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded">
        Registrar
      </button>
    </div>
  );
};
