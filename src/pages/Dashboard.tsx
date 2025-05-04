import { useEffect, useState } from "react";
import { AppUser } from "../types/UserRole";
import { Header } from "../components/layout/Header";
import { HomeSection } from "./dashboard/HomeSection";
import { StatsSection } from "./dashboard/StatsSection";
import { DressSection } from "./dashboard/DressSection";
import { ClientsSection } from "./dashboard/ClientsSection";
import { StaffSection } from "./dashboard/StaffSection";
import { StoresSection } from "./dashboard/StoresSection";
import { Profile } from "./Profile";

export const Dashboard = ({
  user,
  onLogout,
}: {
  user: AppUser;
  onLogout: () => void;
}) => {
  const [activeSection, setActiveSection] = useState<string>(window.location.hash || "#home");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash || "#home");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "#stats":
        return <StatsSection />;
      case "#dress":
        return (
          <DressSection user={user} />
        );
      case "#clients":
        return <ClientsSection brandId={user.brandId} role={user.role}/>;
      case "#staff":
        return <StaffSection user={user} />;
      case "#stores":
        return <StoresSection brandId={user.brandId} role={user.role} />;
      case "#profile":
        return <Profile user={user} />;
      case "#home":
      default:
        return <HomeSection name={user.name} />;
    }
  };

  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <div className="p-6 flex flex-col items-center w-full">
        {renderSection()}
      </div>
    </>
  );
};
