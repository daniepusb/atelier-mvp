import { useState } from "react";
import { BudgetForm } from "../../components/budget/BudgetForm";
import { ProgressBar } from "../../components/layout/ProgressBar";
import { AppUser } from "../../types/UserRole";

interface Props {
  user: AppUser;
}
  
export const HomeSection = ({ user }: Props) => {
  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const disabledSteps: number[] = [];

  if (!selectedClient) {
    disabledSteps.push(2);
    disabledSteps.push(3);
    disabledSteps.push(4);
  }

  if (!selectedItem) {
    disabledSteps.push(4);
  }

  return (
    <>
      <ProgressBar currentStep={step} onStepClick={setStep} disabledSteps={disabledSteps} />
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

  