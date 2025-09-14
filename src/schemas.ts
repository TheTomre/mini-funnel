import * as yup from "yup";

export const emailSchema = yup.object({
  email: yup
    .string()
    .required("Please enter a valid email")
    .email("Please enter a valid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    )
    .trim(),
});

export const nameSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .matches(/^[a-zA-Z]+$/, "Name can only contain English letters")
    .trim(),
});

export type EmailFormData = yup.InferType<typeof emailSchema>;
export type NameFormData = yup.InferType<typeof nameSchema>;
