import { useState } from "react";
import { AppUser } from "./types/UserRole";
import { LoginForm } from "./components/auth/LoginForm";
import { Dashboard } from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState<AppUser | null>(null);

  if (!user) {
    return (
      <div className="container bg-[#FDFAD3] h-screen w-screen flex items-center">
        <LoginForm onLogin={setUser} />
      </div>
    );
  }

  return <Dashboard user={user} />;
}

export default App;