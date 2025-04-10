import { createFileRoute, redirect } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Box, Button, Grid2, Link, TextField, Typography } from "@mui/material";
import type { UserRegister } from "../client";
import useAuth, { isLoggedIn } from "../hooks/useAuth";
import { confirmPasswordRules, emailPattern, passwordRules } from "../utils";

export const Route = createFileRoute("/signup")({
	component: SignUp,
	beforeLoad: async () => {
		if (isLoggedIn()) {
			throw redirect({
				to: "/",
			});
		}
	},
});

interface UserRegisterForm extends UserRegister {
	confirm_password: string;
}

function SignUp() {
	const { signUpMutation } = useAuth();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<UserRegisterForm>({
		mode: "onBlur",
		criteriaMode: "all",
		defaultValues: {
			email: "",
			full_name: "",
			password: "",
			confirm_password: "",
		},
	});

	const onSubmit: SubmitHandler<UserRegisterForm> = (data) => {
		signUpMutation.mutate(data);
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
					<TextField
						label="Full Name"
						{...register("full_name", { required: "Full Name is required" })}
						required
						fullWidth
						error={!!errors.full_name}
						helperText={errors.full_name?.message}
					/>
				</Grid2>
				<Grid2 size={12}>
					<TextField
						label="Email"
						{...register("email", {
							required: "Email is required",
							pattern: emailPattern,
						})}
						type="email"
						required
						fullWidth
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
				</Grid2>
				<Grid2 size={12}>
					<TextField
						label="Password"
						{...register(
							"password",
							passwordRules<UserRegisterForm, "password">(),
						)}
						type="password"
						required
						fullWidth
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
				</Grid2>
				<Grid2 size={12}>
					<TextField
						label="Repeat Password"
						{...register(
							"confirm_password",
							confirmPasswordRules<UserRegisterForm, "confirm_password">(
								getValues,
							),
						)}
						type="password"
						required
						fullWidth
						error={!!errors.confirm_password}
						helperText={errors.confirm_password?.message}
					/>
				</Grid2>
				<Grid2 size={12}>
					<Button
						variant="contained"
						fullWidth
						color="primary"
						type="submit"
						loading={isSubmitting}
					>
						Sign Up
					</Button>
				</Grid2>
				<Grid2 size={12}>
					<Typography>
						Already have an account?{" "}
						<Link href="/login" color="secondary">
							Log In
						</Link>
					</Typography>
				</Grid2>
			</Grid2>
		</Box>
	);
}

export default SignUp;
