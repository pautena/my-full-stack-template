import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { SubmitButton, TextField } from "./form-components";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField },
  formComponents: { SubmitButton },
});
