interface Props {
  currentStep: number;
  onStepClick?: (step: number) => void;
  disabledSteps?: number[];
}

const steps = [
  { label: "Seleccionar cliente",   step: 1 },
  { label: "Verificar medidas",     step: 2 },
  { label: "Seleccionar prenda",    step: 3 },
  { label: "Generar Presupuesto",   step: 4 },
];

export const ProgressBar = ({ currentStep, onStepClick, disabledSteps = [] }: Props) => {
  return (
    <div className="flex justify-between w-full items-start bg-white rounded-md shadow-sm p-4">
      {steps.map(({ label, step }) => {
        const isDisabled = disabledSteps.includes(step);
        const isActive = currentStep >= step;

        return (
          <div
            key={step}
            className={`flex-1 text-left ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            onClick={() => !isDisabled && onStepClick?.(step)}
          >
            <div className={`h-1 mb-2 ${isActive ? "bg-indigo-500" : "bg-gray-200"}`}></div>
            <div className="text-sm">
              <span className={`text-indigo-600 ${isActive ? "" : "opacity-50"}`}>Paso {step}</span>
              <div className={`font-semibold ${isActive ? "" : "opacity-50"}`}>{label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
