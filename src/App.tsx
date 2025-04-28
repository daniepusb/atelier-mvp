import { useState } from "react";
import { AppUser } from "./types/UserRole";
import { LoginForm2 } from "./components/auth/LoginForm";
import { Dashboard } from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState<AppUser | null>(null);

  if (!user) {
    return (
      <div >
        <LoginForm2 onLogin={setUser} />
      </div>
    );
  }

  return <Dashboard user={user} />;
}

export default App;