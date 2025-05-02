import { useEffect, useState } from "react";
import { AppUser } from "../types/UserRole";
import { Header } from "../components/layout/Header";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ItemDoc } from "../types/firestoreSchemas";

import { HomeSection } from "./dashboard/HomeSection";
import { StatsSection } from "./dashboard/StatsSection";
import { DressSection } from "./dashboard/DressSection";
import { ClientsSection } from "./dashboard/ClientsSection";
import { StaffSection } from "./dashboard/StaffSection";
import { StoresSection } from "./dashboard/StoresSection";

export const Dashboard = ({
  user,
  onLogout,
}: {
  user: AppUser;
  onLogout: () => void;
}) => {
  const [activeSection, setActiveSection] = useState<string>(window.location.hash || "#home");

  const [items, setItems] = useState<{ id: string; data: ItemDoc }[]>([]);
  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, `brands/${user.brandId}/items`));
    const itemsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as ItemDoc,
    }));
    setItems(itemsData);
  };

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash || "#home");
    };
    window.addEventListener("hashchange", handleHashChange);
    fetchItems();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "#stats":
        return <StatsSection />;
      case "#dress":
        return (
          <DressSection
            brandId={user.brandId}
            userId={user.uid}
            items={items}
            refreshItems={fetchItems}
          />
        );
      case "#clients":
        return <ClientsSection brandId={user.brandId} userId={user.uid} role={user.role}/>;
      case "#staff":
        return <StaffSection brandId={user.brandId} />;
      case "#stores":
        return <StoresSection />;
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
