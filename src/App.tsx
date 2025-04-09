import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "./firebaseConfig";

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      console.log("Usuario actual:", user);
    });

    return () => unsubscribe(); // Limpieza del observer
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Atelier MVP</h1>
      <p className="text-gray-500">Firebase está conectado ✅</p>
    </div>
  );
}

export default App;
