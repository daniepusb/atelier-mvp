import { useState } from "react";
import { AppUser } from "./types/UserRole";
import { LoginForm } from "./components/Auth/LoginForm";
import { RegisterForm } from "./components/Auth/RegisterForm";
import { Dashboard } from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState<AppUser | null>(null);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <RegisterForm />
        <hr className="my-6" />
        <LoginForm onLogin={setUser} />
      </div>
    );
  }

  return <Dashboard user={user} />;
}

export default App;