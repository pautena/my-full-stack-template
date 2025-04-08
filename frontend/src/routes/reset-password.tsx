import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { useNotificationCenter } from "@pautena/react-design-system";
import type { NewPassword } from "../client";
import { resetPasswordMutation } from "../client/@tanstack/react-query.gen";
import { isLoggedIn } from "../hooks/useAuth";
import { confirmPasswordRules, handleError, passwordRules } from "../utils";

interface NewPasswordForm extends NewPassword {
	confirm_password: string;
}

export const Route = createFileRoute("/reset-password")({
	component: ResetPassword,
	beforeLoad: async () => {
		if (isLoggedIn()) {
			throw redirect({
				to: "/",
			});
		}
	},
});

function ResetPassword() {
	const {
		register,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm<NewPasswordForm>({
		mode: "onBlur",
		criteriaMode: "all",
		defaultValues: {
			new_password: "",
		},
	});
	const navigate = useNavigate();
	const { show } = useNotificationCenter();

	const resetPassword = useMutation({
		...resetPasswordMutation(),
		onSuccess: () => {
			show({
				severity: "success",
				message: "Password updated successfully",
			});
			reset();
			navigate({ to: "/login" });
		},
		onError: (err) => {
			handleError(err, show);
		},
	});

	const onSubmit: SubmitHandler<NewPasswordForm> = async (data) => {
		const token = new URLSearchParams(window.location.search).get("token");
		if (!token) return;
		resetPassword.mutate({
			body: { new_password: data.new_password, token: token },
		});
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			height="100vh"
			alignItems="center"
			justifyContent="center"
			display="flex"
		>
			<Grid2 container spacing={2} maxWidth={400}>
				<Grid2 size={12}>
					<Typography variant="h4" textAlign="center">
						Reset Password
					</Typography>
				</Grid2>
				<Grid2 size={12}>
					<Typography textAlign="center">
						Please enter your new password and confirm it to reset your password
					</Typography>
				</Grid2>
				<Grid2 size={12}>
					<TextField
						label="Set Password"
						{...register("new_password", passwordRules())}
						type="password"
						required
						fullWidth
						error={!!errors.new_password}
						helperText={errors.new_password?.message}
					/>
				</Grid2>
				<Grid2 size={12}>
					<TextField
						label="Confirm Password"
						{...register("confirm_password", confirmPasswordRules(getValues))}
						type="password"
						required
						fullWidth
						error={!!errors.confirm_password}
						helperText={errors.confirm_password?.message}
					/>
				</Grid2>
				<Grid2 size={12}>
					<Button fullWidth variant="contained" color="primary" type="submit">
						Reset Password
					</Button>
				</Grid2>
			</Grid2>
		</Box>
	);
}
