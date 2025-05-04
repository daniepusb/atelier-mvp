import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { AppUser } from "../../types/UserRole";

interface Props {
  user: AppUser;
}

export const RegisterForm  = ({user}: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const _brandId = user.brandId;
  const _email = email;
  const _isAdmin = false;
  const _lastName = "";
  const _name = name;
  const _role = "trabajador";
  const _storeId = user.storeId;
  const _createdBy = user.uid;
  const _createdByName = user.name;

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        brandId:  _brandId,
        email:    _email,
      });
      await setDoc(doc(db, `brands/${_brandId}/staff`, uid), {
        brandId:  _brandId,
        email:    _email,
        isAdmin:  _isAdmin,
        lastName: _lastName,
        name:     _name,
        role:     _role,
        storeId:  _storeId,
        createdAt: new Date(),
        createdBy:      _createdBy,
        createdByName:  _createdByName, 
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
