import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./Input";
import { Button } from "./Button";
import { Header } from "./Header";
import type { ObjectSchema } from "yup";

interface FormPageProps {
  title: string;
  schema: ObjectSchema<Record<string, unknown>>;
  fieldName: string;
  fieldType: string;
  fieldPlaceholder: string;
  fieldAutoComplete: string;
  showBack: boolean;
  onBack?: () => void;
  onSubmit: (data: Record<string, unknown>) => void;
  privacyNote?: React.ReactNode;
}

export function FormPage({
  title,
  schema,
  fieldName,
  fieldType,
  fieldPlaceholder,
  fieldAutoComplete,
  showBack,
  onBack,
  onSubmit,
  privacyNote,
}: FormPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const fieldValue = watch(fieldName);

  // Safely extract error message
  const getErrorMessage = (): string | undefined => {
    const error = errors[fieldName];
    return error?.message as string | undefined;
  };

  const handleFormSubmit = (data: Record<string, unknown>) => {
    onSubmit(data);
  };

  return (
    <div className="page">
      <Header showBack={showBack} onBack={onBack} />
      <div className="page__container">
        <div className="page__content">
          <h1 className="page__title">{title}</h1>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
            <Input
              {...register(fieldName)}
              type={fieldType}
              placeholder={fieldPlaceholder}
              error={getErrorMessage()}
              autoComplete={fieldAutoComplete}
            />

            {privacyNote}
          </form>
        </div>

        <div className="page__pinned-button">
          <Button
            type="submit"
            disabled={!isValid || !fieldValue}
            className="form__submit"
            onClick={handleSubmit(handleFormSubmit)}
          >
            Continue
            <img
              src="/icons/arrow-right.png"
              alt=""
              className="btn__icon"
              style={{ width: "24px", height: "24px" }}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
