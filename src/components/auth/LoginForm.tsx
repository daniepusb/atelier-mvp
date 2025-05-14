import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, PROJECT_PREFIX } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { AppUser } from "../../types/UserRole";

export const LoginForm = ({ onLogin }: { onLogin: (user: AppUser) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const docRef = doc(db, PROJECT_PREFIX+"users", uid);
      const userSnap = await getDoc(docRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as AppUser;

        const docRef_AppUser    = doc(db, PROJECT_PREFIX+`brands/${data.brandId}/staff`, uid);
        const userSnap_AppUser  = await getDoc(docRef_AppUser);
        if (userSnap_AppUser.exists()) {
          const data_AppUser = userSnap_AppUser.data() as AppUser;
          onLogin({ ...data_AppUser, uid });
        }
       
      } else {
        alert("No se encontró el rol del usuario.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales incorrectas.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Iniciar sesión
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
            Correo electrónico
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-2">
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
            Contraseña
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleLogin} 
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ingresar
          </button>
        </div>
        <div className="flex justify-center text-sm mt-8">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              ¿Olvidaste contraseña?
            </a>
          </div>

        <p className="mt-2 text-center text-sm/6 text-gray-500">
          ¿No eres miembro?{' '}
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Prueba por 14 días, gratis
          </a>
        </p>
      </div>
    </div>
  );
};
