import { useNavigate } from "react-router-dom";
import { nameSchema, type NameFormData } from "../schemas";
import { useUserData } from "../hooks/useUserData";
import { FormPage } from "../components/FormPage";

export function NamePage() {
  const navigate = useNavigate();
  const { setName } = useUserData();

  const onSubmit = (data: NameFormData) => {
    setName(data.name);
    navigate("/product");
  };

  return (
    <FormPage
      title="What's your name?"
      schema={nameSchema}
      fieldName="name"
      fieldType="text"
      fieldPlaceholder="Name"
      fieldAutoComplete="name"
      showBack={true}
      onBack={() => navigate("/")}
      onSubmit={(data: Record<string, unknown>) => {
        if (typeof data.name === "string") {
          onSubmit({ name: data.name });
        }
      }}
    />
  );
}
