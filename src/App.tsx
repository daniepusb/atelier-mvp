import { useEffect, useState } from "react";
import { AppUser } from "./types/UserRole";
import { LoginForm2 } from "./components/auth/LoginForm";
import { Dashboard } from "./pages/Dashboard";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

function App() {
  const [user, setUser] = useState<AppUser | null>(null);

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
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  if (!user) {
    return (
      <div >
        <LoginForm2 onLogin={setUser} />
      </div>
    );
  }

  return <Dashboard user={user} onLogout={handleLogout}/>;
}

export default App;