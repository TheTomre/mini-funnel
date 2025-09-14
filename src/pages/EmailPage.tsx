import { useNavigate } from "react-router-dom";
import { emailSchema, type EmailFormData } from "../schemas";
import { useUserData } from "../hooks/useUserData";
import { FormPage } from "../components/FormPage";

export function EmailPage() {
  const navigate = useNavigate();
  const { setEmail } = useUserData();

  const onSubmit = (data: EmailFormData) => {
    setEmail(data.email);
    navigate("/name");
  };

  const privacyNote = (
    <div className="privacy-note">
      <img
        src="/src/assets/icons/Lock.png"
        alt="Lock"
        style={{ width: "16px", height: "18px" }}
      />
      <span>
        We respect your privacy and are committed to protecting your personal
        data. We'll email you a copy of your results for convenient access.
      </span>
    </div>
  );

  return (
    <FormPage
      title="Enter your email to get your personalized Calisthenics Workout Plan"
      schema={emailSchema}
      fieldName="email"
      fieldType="email"
      fieldPlaceholder="name@domain.com"
      fieldAutoComplete="email"
      showBack={false}
      onSubmit={(data: Record<string, unknown>) => {
        if (typeof data.email === "string") {
          onSubmit({ email: data.email });
        }
      }}
      privacyNote={privacyNote}
    />
  );
}
