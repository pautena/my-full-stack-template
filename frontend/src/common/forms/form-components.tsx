import {
  Button,
  type ButtonProps as MuiButtonProps,
  TextField as MuiTextField,
  type TextFieldProps,
} from "@mui/material";
import { useFieldContext, useFormContext } from "./use-app-form";

export function TextField(props: TextFieldProps) {
  const field = useFieldContext();

  return (
    <MuiTextField
      fullWidth
      defaultValue={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      error={field.state.meta.errors.length > 0}
      helperText={field.state.meta.errors.map((e) => e.message).join(", ")}
      {...props}
    />
  );
}

export interface SubmitButtonProps extends MuiButtonProps {
  label: string;
}

export function SubmitButton({ label, ...rest }: SubmitButtonProps) {
  const { Subscribe } = useFormContext();

  return (
    <Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => (
        <Button
          type="submit"
          disabled={!canSubmit}
          loading={isSubmitting}
          {...rest}
        >
          {label}
        </Button>
      )}
    />
  );
}
