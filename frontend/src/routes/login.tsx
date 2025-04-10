import { createFileRoute, redirect } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
	Box,
	Button,
	Grid2,
	IconButton,
	InputAdornment,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import type { BodyLoginLoginAccessToken } from "../client";
import useAuth, { isLoggedIn } from "../hooks/useAuth";
import { emailPattern } from "../utils";

export const Route = createFileRoute("/login")({
	component: Login,
	beforeLoad: async () => {
		if (isLoggedIn()) {
			throw redirect({
				to: "/",
			});
		}
	},
});

function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const { loginMutation, error, resetError } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<BodyLoginLoginAccessToken>({
		mode: "onBlur",
		criteriaMode: "all",
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<BodyLoginLoginAccessToken> = async (data) => {
		if (isSubmitting) return;

		resetError();

		try {
			await loginMutation.mutateAsync(data);
		} catch {
			// error is handled by useAuth hook
		}
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
						label="Email"
						{...register("username", {
							required: "Username is required",
							pattern: emailPattern,
						})}
						type="email"
						required
						fullWidth
						error={!!errors.username || !!error}
						helperText={errors.username?.message || error}
					/>
				</Grid2>
				<Grid2 size={12}>
					<TextField
						label="Password"
						{...register("password", {
							required: "Password is required",
						})}
						type={showPassword ? "text" : "password"}
						required
						fullWidth
						error={!!errors.password}
						helperText={errors.password?.message}
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label={
												showPassword
													? "hide the password"
													: "display the password"
											}
											onClick={(s) => setShowPassword(!s)}
											onMouseDown={(e) => e.preventDefault()}
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
					/>
				</Grid2>
				<Grid2 size={12}>
					<Link href="/recover-password" color="secondary">
						Forgot password?
					</Link>
				</Grid2>
				<Grid2 size={12}>
					<Button type="submit" loading={isSubmitting} fullWidth>
						Log In
					</Button>
				</Grid2>
				<Grid2 size={12}>
					<Typography>
						Don't have an account?{" "}
						<Link href="/signup" color="secondary">
							Sign up
						</Link>
					</Typography>
				</Grid2>
			</Grid2>
		</Box>
	);
}
