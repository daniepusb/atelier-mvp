import { useEffect, useState } from "react";
import { AppUser } from "./types/UserRole";
import { LoginForm2 } from "./components/auth/LoginForm";
import { Dashboard } from "./pages/Dashboard";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { Toast } from "./components/ui/Toast";

function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Error al parsear usuario guardado:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setToastMessage("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setToastMessage("Error al cerrar sesión");
    }
  };

  return (
    <div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage(null)}
        />
      )}

      {!user ? (
        <LoginForm2 onLogin={setUser} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
