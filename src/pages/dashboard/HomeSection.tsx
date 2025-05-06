import { useState } from "react";
import { ProgressBar } from "../../components/layout/ProgressBar";
import { AppUser } from "../../types/UserRole";

import { BudgetForm } from "../../components/budget/BudgetForm";

interface Props {
  user: AppUser;
}
  
export const HomeSection = ({ user }: Props) => {
  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<string>("");

  return (
    <>
      <ProgressBar currentStep={step} onStepClick={setStep} />
      <BudgetForm
        step={step}
        setStep={setStep}
        user={user}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </>
  );
};

  