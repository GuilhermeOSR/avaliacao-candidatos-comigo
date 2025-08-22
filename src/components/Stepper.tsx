type StepperProps = {
  steps: string[];
  currentStep: number;
};

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex border-b border-gray-200  ">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`flex-1 text-center pb-2 cursor-pointer   ${
            index === currentStep
              ? "text-[#1169B0] font-semibold border-b-2 border-[#1169B0]"
              : "text-gray-700"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default Stepper;