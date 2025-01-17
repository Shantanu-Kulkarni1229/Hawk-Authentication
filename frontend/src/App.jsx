import { useState } from "react";
import InitiateRegistration from "./pages/InitiateRegistration";
import VerifyOTP from "./pages/VerifyOTP";
import CompleteRegistration from "./pages/CompleteRegistration";
import InitiateAdmin from "./pages/InitiateAdmin";
import VerifyAdminOTP from "./pages/VerifyAdminOTP";
import CompleteAdminRegistration from "./pages/CompleteAdminRegistration";

const App = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleNextStep = (email = "") => {
    if (email) setEmail(email); // Save email for the next steps
    setStep((prev) => prev + 1); // Move to the next step
  };

  return (
    <div>
      {step === 1 && <InitiateRegistration onNext={handleNextStep} />}
      {step === 2 && <VerifyOTP email={email} onNext={handleNextStep} />}
      {step === 3 && <CompleteRegistration email={email} onNext={handleNextStep} />}
      {step === 4 && <InitiateAdmin onNext={handleNextStep} />}
      {step === 5 && <VerifyAdminOTP email={email} onNext={handleNextStep} />}
      {step === 6 && <CompleteAdminRegistration email={email} />}
    </div>
  );
};

export default App;
